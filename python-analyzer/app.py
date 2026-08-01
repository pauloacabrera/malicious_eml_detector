from flask import Flask, jsonify, request

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

    result = {
        "status": "received",
        "message": "Python analyzer foundation is ready",
        "eml_length": len(eml_content)
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
