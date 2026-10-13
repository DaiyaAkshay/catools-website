"""Check rendered SEO, local links/assets, anchors and crawl directives (stdlib only)."""
import json
import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
catalog = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    "import {PAGES} from './scripts/pages.mjs'; console.log(JSON.stringify(PAGES));"
], cwd=ROOT, text=True))

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.tags, self.ids, self.schemas = [], set(), []
        self.schema = None
        self.feed(source)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.tags.append((tag, attrs))
        if attrs.get('id'):
            assert attrs['id'] not in self.ids, f"Duplicate ID: {attrs['id']}"
            self.ids.add(attrs['id'])
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.schema = ''

    def handle_data(self, data):
        if self.schema is not None:
            self.schema += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None

    def select(self, tag, **attrs):
        return [a for t, a in self.tags if t == tag and all(a.get(k) == v for k, v in attrs.items())]

pages = {p['path']: Page((ROOT / p['file']).read_text()) for p in catalog}
titles, descriptions = set(), set()
for entry in catalog:
    path, page = entry['path'], pages[entry['path']]
    source = (ROOT / entry['file']).read_text()
    assert len(page.select('title')) == 1, path
    assert entry['title'] not in titles, path
    titles.add(entry['title'])
    assert entry['description'] not in descriptions, path
    descriptions.add(entry['description'])
    assert len(page.select('meta', name='description')) == 1, path
    assert page.select('meta', name='description')[0]['content'] == entry['description'], path
    assert page.select('link', rel='canonical') == [{'rel': 'canonical', 'href': 'https://catool.co.in' + path}], path
    for prop in ['og:url', 'og:image', 'og:image:alt', 'og:image:width', 'og:image:height']:
        assert len(page.select('meta', property=prop)) == 1, (path, prop)
    assert page.select('meta', property='og:url')[0]['content'] == 'https://catool.co.in' + path, path
    assert page.select('meta', name='twitter:image')[0]['content'] == page.select('meta', property='og:image')[0]['content'], path
    robots = page.select('meta', name='robots')[0]['content']
    assert ('noindex' in robots) == bool(entry.get('noindex')), path
    if not entry.get('noindex'):
        assert len(page.select('h1')) == 1, path
        graph = page.schemas[0]['@graph']
        assert all('@id' in node for node in graph), path
        assert any(node['@type'] == 'WebSite' for node in graph), path
        apps = [node for node in graph if node['@type'] == 'SoftwareApplication']
        assert bool(apps) == bool(entry.get('app')), path
        for app in apps:
            assert app['url'] == 'https://catool.co.in' + path, path
            assert 'aggregateRating' not in app and 'review' not in app, path
    assert source.count('gtag/js?id=G-S4NBSRVDQ0') == 1, path
    for tag, attrs in page.tags:
        if tag == 'img':
            assert attrs.get('alt') and int(attrs['width']) > 0 and int(attrs['height']) > 0, path
        refs = [attrs[k] for k in ['href', 'src'] if k in attrs]
        if tag == 'meta' and attrs.get('property') == 'og:image':
            refs.append(attrs['content'])
        for ref in refs:
            url = urlsplit(ref)
            if url.netloc and url.netloc != 'catool.co.in' or url.scheme not in ['', 'http', 'https']:
                continue
            target = unquote(url.path) or path
            if target in pages:
                if url.fragment:
                    assert unquote(url.fragment) in pages[target].ids, (path, ref)
            else:
                assert (ROOT / target.lstrip('/')).is_file(), (path, ref)

ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
locs = [node.text for node in ET.parse(ROOT / 'sitemap.xml').findall('s:url/s:loc', ns)]
assert len(locs) == len(set(locs))
assert set(locs) == {'https://catool.co.in' + p['path'] for p in catalog if not p.get('noindex')}
robots = (ROOT / 'robots.txt').read_text()
assert 'Sitemap: https://catool.co.in/sitemap.xml' in robots
assert 'Disallow: /api/' in robots
assert not any('Disallow: ' + p in robots for p in ['/assets', '/subscribe', '/success'])
print(f'PASS: {len(catalog)} pages; metadata, JSON-LD, images, internal links/anchors, analytics, sitemap and robots.')
