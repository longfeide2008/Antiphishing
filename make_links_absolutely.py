

import urllib.request
import re
from lxml import html
from urllib.parse import urljoin
import functools


def repl(base_url, href):
    if href.endswith(".js"):
       return href
    else:
        return urljoin(base_url, href)


def make_links_absolutely(url):

    html_name = re.sub('[^a-zA-Z]', '', url) +'.html'
    print(html_name)

    # headers = {
    #     'User-Agent': r'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) '
    #                   r'Chrome/45.0.2454.85 Safari/537.36 115Browser/6.0.3',
    #     'Referer': r'http://www.lagou.com/zhaopin/Python/?labelWords=label',
    #     'Connection': 'keep-alive'
    # }

    req = urllib.request.Request(url)
    page = urllib.request.urlopen(req)
    content_bytes = page.read()
    content_str = content_bytes.decode('utf-8')

    with open(html_name, 'w+', encoding='utf-8') as raw:
        raw.write(content_str)
        raw.close()
        with open(html_name, "r", encoding='utf-8') as rf:
            doc = html.parse(rf).getroot()
            base_url = url
            doc.rewrite_links(functools.partial(repl, base_url))
            absolute = html.tostring(doc, pretty_print=True, encoding='utf-8').decode('utf-8')
            # print(absolute)
            html_absolute_link = 'html_absolute_link.html'
            with open(html_absolute_link, 'w+', encoding='utf-8') as b:
                b.write(absolute)
                b.close()
                return html_absolute_link


if __name__ == '__main__':
    url = 'http://www.abchina.com/cn/'
    make_links_absolutely(url)
    # url_1 = 'http://www.ccb.com/cn/home/indexv3.html'
    # req_1 = urllib.request.Request(url_1)
    # page_1 = urllib.request.urlopen(req_1)
    # content_bytes_1 = page_1.read()
    # content_str_1 = content_bytes_1.decode('utf-8')
    # print(type(content_str_1))
    # with open('ccb_content_str.txt', 'w+', encoding='utf-8') as f2:
    #     f2.write(content_str_1)
    #     f2.close()
    # f1 = open('ccb_content_str.txt', 'r', encoding='utf-8')
    # content_str_0 = f1.read()
    # print(content_str_0)
    # f1.close()