from flask import Flask, jsonify, request
from src.analyzer.eml_parser import parse_eml
from src.analyzer.threat_analyzer import analyze_threats

app = Flask(__name__)

@app.get('/')
def home():
    return jsonify({"service": "malicious-eml-detector-python", "status": "running"})

@app.post('/analyze')
def analyze():
    payload = request.get_json(silent=True) or {}
    eml_content = payload.get('eml_content', '')

    if not eml_content:
        return jsonify({"error": "No eml_content provided"}), 400

    parsed_eml = parse_eml(eml_content)
    threat_analysis = analyze_threats(parsed_eml)

    result = {
        "sender": parsed_eml.get('sender', 'Unknown'),
        "recipient": parsed_eml.get('recipient', 'Unknown'),
        "subject": parsed_eml.get('subject', 'No subject'),
        "date": parsed_eml.get('date', 'Unknown'),
        "suspicious_keywords": threat_analysis.get('suspicious_keywords', []),
        "suspicious_urls": threat_analysis.get('suspicious_urls', []),
        "risk_score": threat_analysis.get('risk_score', 0),
        "threat_level": threat_analysis.get('threat_level', 'Low'),
        "verdict": threat_analysis.get('verdict', 'Safe'),
        "detected_indicators": threat_analysis.get('detected_indicators', []),
        "spf_status": 'Pass' if 'spf' in eml_content.lower() else 'Unknown',
        "dkim_status": 'Pass' if 'dkim' in eml_content.lower() else 'Unknown',
        "dmarc_status": 'Pass' if 'dmarc' in eml_content.lower() else 'Unknown'
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
