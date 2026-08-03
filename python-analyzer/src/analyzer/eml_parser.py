def parse_eml(eml_content: str) -> dict:
    """Parse basic metadata from raw EML content."""
    headers = {}
    body = eml_content

    for line in eml_content.splitlines():
        if ':' in line and not line.startswith(' '):
            key, value = line.split(':', 1)
            headers[key.strip().lower()] = value.strip()

    if '\n\n' in eml_content:
        _, body = eml_content.split('\n\n', 1)

    return {
        "sender": headers.get('from', 'Unknown'),
        "recipient": headers.get('to', 'Unknown'),
        "subject": headers.get('subject', 'No subject'),
        "date": headers.get('date', 'Unknown'),
        "body": body.strip(),
        "headers": headers,
        "line_count": len(eml_content.splitlines())
    }
