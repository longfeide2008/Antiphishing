# coding = 'utf-8'
import math
import config as cfg
import re
import jieba
import urllib.request
from urllib import error
from sklearn.feature_extraction.text import TfidfVectorizer


# 手机
user_agent = r'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293'
user_agent2 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25'



# 模拟电脑  
user_agent_pc = 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0'

# r'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) '
#                   r'Chrome/45.0.2454.85 Safari/537.36 115Browser/6.0.3',

headers = {
    'User-Agent':'Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19',

    # 'Referer': r'http://www.lagou.com/zhaopin/Python/?labelWords=label',
    # 'Connection': 'keep-alive'
}


# url_to_detect = 'http://wap.ibcbo.cc'
# req_to_detect = urllib.request.Request(url_to_detect,headers=headers)
#
# page_to_detect= urllib.request.urlopen(req_to_detect)
# print(page_to_detect.info())
# print(page_to_detect.getcode())
# print(page_to_detect.geturl())
# content_bytes_to_detect = page_to_detect.read()
# print(type(content_bytes_to_detect))
#
# content_str_to_detect = content_bytes_to_detect.decode('gbk')
# # , 'ignore'
# print(type(content_str_to_detect))
# print(content_str_to_detect)
# with open('content_str_to_detect.html','w+') as f:
#  f.write(content_str_to_detect)
#  f.close()
#
import requests
#
# Header = {
#   'User-Agent': 'Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19'}
#
#
waphead = {
#     'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
# 'Accept-Encoding':'gzip, deflate',
# 'Accept-Language':'zh-CN,zh;q=0.8',
# 'Connection':'keep-alive',
'Cookie':'x=y62ke|dEffhGdZXb0Gd00bEhGX6E387E4539',
# 'Host':'wap.ibcbo.cc',
# 'Referer':'http://wap.ibcbo.cc/',
# 'Upgrade-Insecure-Requests':1,
'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'

           }
# R = requests.get('http://112.121.177.250', headers=Header)
R = requests.get('http://wap.ibcbo.cc', headers=waphead)
print(R)
print(R.status_code)

if R.status_code == 200:
    str = R.content.decode('gb2312')
    # print(str)
#     # F = open('1716002wap.html', 'w+')  # F目前是unicode编码，不用再encoding=utf-8
#     # F.write(str)
#     # F.close()
else:
    pass