const path = require('path');

async function analyzeEmlContent({ eml_content, filename }) {
  const response = await fetch('http://127.0.0.1:5001/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eml_content, filename })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Analyzer request failed');
  }

  return response.json();
}

module.exports = {
  analyzeEmlContent
};
