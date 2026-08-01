def parse_eml_basic(eml_content: str) -> dict:
    """Return basic metadata from raw EML content for the initial service foundation."""
    headers = {}
    for line in eml_content.splitlines():
        if ':' in line and not line.startswith(' '):
            key, value = line.split(':', 1)
            headers[key.strip()] = value.strip()

    return {
        "headers": headers,
        "line_count": len(eml_content.splitlines())
    }
