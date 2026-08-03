from .eml_parser import parse_eml
import re


def analyze_threats(parsed_eml: dict) -> dict:
    """Perform a weighted threat analysis for the upload workflow."""
    content = f"{parsed_eml.get('subject', '')} {parsed_eml.get('body', '')}".lower()
    headers = parsed_eml.get('headers', {}) or {}
    header_text = ' '.join(str(value).lower() for value in headers.values())
    combined_text = f"{content} {header_text}"

    suspicious_keywords = []
    detected_indicators = []
    risk_score = 0

    keyword_weights = {
        'urgent': 10,
        'action required': 8,
        'click here': 8,
        'verify': 6,
        'password': 10,
        'credential': 10,
        'credentials': 10,
        'login': 6,
        'invoice': 6,
        'free': 6,
        'reward': 6,
        'suspended': 10,
        'reset': 6
    }

    for keyword, weight in keyword_weights.items():
        if keyword in combined_text:
            suspicious_keywords.append(keyword)
            detected_indicators.append(f"phishing keyword: {keyword}")
            risk_score += weight

    suspicious_urls = list(dict.fromkeys(re.findall(r'https?://\S+|www\.\S+', combined_text)))
    if suspicious_urls:
        detected_indicators.append(f"suspicious URL(s): {len(suspicious_urls)}")
        risk_score += min(30, len(suspicious_urls) * 12)

    if re.search(r'\bspf\s*[:=]\s*fail\b|\bspf\b.*\b(fail|failed)\b', combined_text):
        detected_indicators.append('SPF failed')
        risk_score += 25

    if re.search(r'\bdkim\s*[:=]\s*fail\b|\bdkim\b.*\b(fail|failed)\b', combined_text):
        detected_indicators.append('DKIM failed')
        risk_score += 20

    if re.search(r'\bdmarc\s*[:=]\s*fail\b|\bdmarc\b.*\b(fail|failed)\b', combined_text):
        detected_indicators.append('DMARC failed')
        risk_score += 25

    if re.search(r'\bspf\s*[:=]\s*pass\b', combined_text):
        detected_indicators.append('SPF passed')
        risk_score -= 15

    if re.search(r'\bdkim\s*[:=]\s*pass\b', combined_text):
        detected_indicators.append('DKIM passed')
        risk_score -= 10

    if re.search(r'\bdmarc\s*[:=]\s*pass\b', combined_text):
        detected_indicators.append('DMARC passed')
        risk_score -= 10

    if re.search(r'\.(zip|exe|scr|js|docm|bat)\b', combined_text):
        detected_indicators.append('suspicious attachment')
        risk_score += 20

    if 'attachment' in combined_text and ('zip' in combined_text or 'exe' in combined_text or 'scr' in combined_text):
        detected_indicators.append('attachment reference')
        risk_score += 8

    risk_score = max(0, min(100, risk_score))

    if risk_score >= 60:
        threat_level = 'High'
        verdict = 'Malicious'
    elif risk_score >= 30:
        threat_level = 'Medium'
        verdict = 'Suspicious'
    else:
        threat_level = 'Low'
        verdict = 'Safe'

    return {
        "suspicious_keywords": suspicious_keywords,
        "suspicious_urls": suspicious_urls,
        "risk_score": risk_score,
        "threat_level": threat_level,
        "verdict": verdict,
        "detected_indicators": detected_indicators
    }
