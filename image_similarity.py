# 1、download
# 2、label_ to recognize

import urllib.request
import urllib.parse
import os
import urllib.error
import re
import config as cfg
import label_image
from PIL import Image
from urllib import error
from make_links_absolutely import make_links_absolutely
from shutil import copyfile

def save_to_jpg(src_dir, target_dir):
    print('save_to_jpg start')

    if not os.path.isdir(target_dir):
        os.mkdir(target_dir)
    for root, dir, files in os.walk(src_dir):
            for f in files:
                try:
                    out_file = os.path.splitext(f)[0] + '.jpg'
                    Image.open(os.path.join(src_dir, f)).convert('RGB').save(os.path.join(target_dir, out_file))
                except OSError as ose:
                    print('save to jpg error', ose)
    print('save_to_jpg end')


def images_file_name(crawl_images_dir, link):
    if not os.path.isdir(crawl_images_dir):
        os.mkdir(crawl_images_dir)
    pos = link.rindex('/')
    t = os.path.join(crawl_images_dir, link[pos + 1:])
    # print(t)
    return t


def recognization(crawl_images_dir, crawl_images_dir_jpg):
    print('recognization start')
    save_to_jpg(crawl_images_dir, crawl_images_dir_jpg)
    # 三个参数：分别返回父目录、所有文件夹名字（不含路径）、所有文件名字
    for root, dir, files in os.walk(crawl_images_dir_jpg):
        print('root')
        for f in files:
            print(f)
            # label_image.py 调用/files
            image_path, max_str, max_score = label_image.label_iamge(os.path.join(crawl_images_dir_jpg, f))
            for k, bank in cfg.bank.items():
                # print('current bank', bank)
                if (max_str == bank) and (max_score >= 0.8):
                    print(image_path, 'is', bank)
                    print('recognization successfully end')
                    return k
    print('recognization failed end，返回INF')
    return float('inf')  # 如果不是inf，则返回None


def save_to_dir(url, crawl_images_dir, crawl_images_dir_jpg):

    try:
        html_absolute_link = make_links_absolutely(url)
        with open(html_absolute_link, 'r', encoding='utf-8') as ht_abs:
            content_str = ht_abs.read()

            for link, t in set(re.findall(r'(http://[^\s]*?(jpg|png))', str(content_str))
                                       + re.findall(r'(https://[^\s]*?(jpg|png))', str(content_str))):
                try:
                    if link.startswith('http'):
                        urllib.request.urlretrieve(link, images_file_name(crawl_images_dir, link))

                except Exception as e:
                    print(link, '在for循环内部，如果有异常，应该会再次进入for循环，这样获取的图片会更多', e)

    except Exception as e:
        print('根据链接抓取图片出错', e)
    finally:
        image_identity = recognization(crawl_images_dir, crawl_images_dir_jpg)
        return image_identity


def image_similarity(url):
    print('In image_similarity, start')

    crawl_images_dir = re.sub('[^a-zA-Z]', '', url)
    crawl_images_dir_jpg = crawl_images_dir + 'jpg'
    try:
        image_identity = save_to_dir(url, crawl_images_dir, crawl_images_dir_jpg)
        print('In image_similarity, successfully end')
        return image_identity
    except error.HTTPError as httpe:
        print('In image_similarity:打不开待查询的网页,http返回错误代码，返回INF', httpe)
        return float('inf')
    except error.URLError as urle:
        print('In image_similarity:打不开待查询的网页,打不开地址，返回INF',  urle)
        return float('inf')


def image_check(url):
    dir_name = re.sub('[^a-zA-Z0-9]', '', url)
    to_check_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "webpages", dir_name, dir_name+'_files')
    print('待检测目录', to_check_dir)
    for root, dir, files in os.walk(to_check_dir):
        for file in files:
            if file.lower().endswith('.png'):

                Image.open(os.path.join(to_check_dir, file)).convert('RGB')\
                    .save(os.path.join(to_check_dir, os.path.splitext(file)[0] + '.jpg'))
    image_score = 0
    image_str = ''
    for root, dir, files in os.walk(to_check_dir):
        for file in files:
            if file.lower().endswith('.jpg') | file.lower().endswith('.jpeg'):
                print(file)
                image_path, max_str, max_score = label_image.label_iamge(os.path.join(to_check_dir, file))

                for k, bank in cfg.bank.items():
                    if (max_str == bank) and (max_score >= 0.95):
                        print('recognization successfully end')
                        return k
    print('recognization inf')
    return float('inf')
                # if max_score >= image_score:
                #     image_score = max_score
                #     image_str = max_str
    # 判断所有图片，但是太耗时间了
    # for k, bank in cfg.bank.items():
    #     # print('current bank', bank)
    #     if (image_str == bank) and (image_score >= 0.8):
    #         print('recognization successfully end')
    #         return k
    # print('recognization inf')
    # return float('inf')


if __name__ == "__main__":
    url = "http://www.icbc.com.cn"
    image_check(url)
    # url = 'http://www.ccb.com/cn/home/indexv3.html'
    # url = 'http://www.baidu.com'
    # iamge_identity = image_similarity(url)
    # print('iamge_identity', iamge_identity)
    # image_check(url)





