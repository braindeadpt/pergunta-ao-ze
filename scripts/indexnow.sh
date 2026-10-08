#!/usr/bin/env bash
# Submit all sitemap URLs to IndexNow (Bing + partners) after deploy.
set -euo pipefail

KEY="0b2d3a12ba7014e3a5db07e6a818b1c7"
HOST="perguntaaoze.pt"

python - "$KEY" "$HOST" <<'PY'
import json, re, sys, urllib.request

key, host = sys.argv[1], sys.argv[2]
xml = urllib.request.urlopen(f"https://{host}/sitemap.xml", timeout=30).read().decode()
urls = re.findall(r"<loc>([^<]+)</loc>", xml)
body = json.dumps({
    "host": host,
    "key": key,
    "keyLocation": f"https://{host}/{key}.txt",
    "urlList": urls,
}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow",
    data=body, headers={"Content-Type": "application/json"})
r = urllib.request.urlopen(req, timeout=30)
print(f"{len(urls)} urls -> HTTP {r.status}")
PY
