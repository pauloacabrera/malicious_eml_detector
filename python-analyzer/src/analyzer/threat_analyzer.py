from .eml_parser import parse_eml_basic


def analyze_eml(eml_content: str) -> dict:
    """Perform a simple placeholder analysis for the Python service foundation."""
    parsed = parse_eml_basic(eml_content)
    headers = parsed.get('headers', {})

    suspicious_keywords = ['phish', 'urgent', 'verify', 'click']
    detected = [kw for kw in suspicious_keywords if kw.lower() in eml_content.lower()]

    risk_score = min(100, 20 + len(detected) * 15)
    threat_level = 'low'
    if risk_score >= 70:
        threat_level = 'high'
    elif risk_score >= 40:
        threat_level = 'medium'

    return {
        "headers": headers,
        "detected_keywords": detected,
        "risk_score": risk_score,
        "threat_level": threat_level,
        "verdict": 'suspicious' if risk_score >= 40 else 'safe'
    }
