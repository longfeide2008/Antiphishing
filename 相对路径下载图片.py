import re
import urllib.request
import urllib.parse
import os
import urllib.error
import re

from make_links_absolutely import make_links_absolutely


def download_images(crawl_images_dir, link):
    if not os.path.isdir(crawl_images_dir):
        os.mkdir(crawl_images_dir)
    pos = link.rindex('/')
    t = os.path.join(crawl_images_dir, link[pos + 1:])
    # print(t)
    return t


def image_similarity(url):
    try:
        crawl_images_dir = 'test'
        html_absolute_link = make_links_absolutely(url)
        with open(html_absolute_link, 'r', encoding='utf-8') as ht_abs:
            content_str = ht_abs.read()

            for link, t in set(re.findall(r'(http://[^\s]*?(jpg|png))', str(content_str))
                                       + re.findall(r'(https://[^\s]*?(jpg|png))', str(content_str))
                                       + re.findall(r'(/[^\s]*?(jpg|png))', str(content_str))):
                try:
                    if link.startswith('http'):
                        urllib.request.urlretrieve(link, download_images(crawl_images_dir, link))
                except Exception as e:
                    print('在for循环内部，如果有异常，应该会再次进入for循环，这样获取的图片会更多', e)

    except Exception as e:
        print('根据链接抓取图片出错', e)
    finally:
        pass
if __name__ == "__main__":
    url = 'http://www.abchina.com/cn/'
    # url = 'http://www.icbc.com.cn/icbc'
    # url = 'http://www.ccb.com/cn/home/indexv3.html'
    image_similarity(url)