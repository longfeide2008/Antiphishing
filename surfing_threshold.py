from LCS import find_lcseque,find_lcsubstr
import pandas as pd
import urllib.request
from urllib import error
import re
sensitive = ['icbc', '1cbc','lcbc','95588', 'icdc', '1cdc','lcdc','gsyh','gs', 'gh']


def lcsstr(url):
    # print(url)

    cos_one_sen = 0.0
    # cos_one_sen = 0
    # 之前是比较的相对值，现在拿绝对数值比较
    sen_max = ''
    for sen in sensitive:
        # print(url, sen)
        # sstr = find_lcseque(url, sen)
        sstr, lensstr = find_lcsubstr(url, sen)
        # print(sstr, len(sstr))

        # if ((cos_one_sen <= len(sstr)) & (len(sstr) > 2)) | (sstr.isin(['gs', 'gh'])):
        if ((cos_one_sen <= len(sstr) / len(sen))) & (len(sstr) > 2) | ((sstr == 'gs') | (sstr == 'gh')):
            cos_one_sen = len(sstr) / len(sen)
            # cos_one_sen = len(sstr)
            sen_max = sen
    # print('同一个url，遍历所有敏感词的最大结果', url, sen_max, cos_one_sen)
    return cos_one_sen


def lcsstr_sen(url):

    cos_one_sen = 0.0
    # cos_one_sen = 0
    # 之前是比较的相对值，现在拿绝对数值比较
    sen_max = ''
    for sen in sensitive:
        # print(url, sen)
        # sstr = find_lcseque(url, sen)
        sstr, lensstr = find_lcsubstr(url, sen)
        # print(sstr, len(sstr))

        # if ((cos_one_sen <= len(sstr)) & (len(sstr) > 2)) | (sstr.isin(['gs', 'gh'])):
        if ((cos_one_sen <= len(sstr) / len(sen))) & (len(sstr) > 2) | ((sstr == 'gs') | (sstr == 'gh')):
            cos_one_sen = len(sstr) / len(sen)
            # cos_one_sen = len(sstr)
            sen_max = sen
    # print('同一个url，遍历所有敏感词的最大结果', url, sen_max, cos_one_sen)
    return sen_max
icbc_list = pd.read_excel('icbc_list.xlsx',converters={'phishing':str, 'legal': str})

icbc_list['cos'] = icbc_list['phishing'].dropna().map(lcsstr)
icbc_list['sen'] = icbc_list['phishing'].dropna().map(lcsstr_sen)
icbc_list['cos_legal'] = icbc_list['legal'].dropna().map(lcsstr)
icbc_list['sen_legal'] = icbc_list['legal'].dropna().map(lcsstr_sen)
print(icbc_list.head(10))
icbc_list.to_excel('icbc_list_legal.xlsx')


#
# for each in icbc_list['url']:
#     try:
#         req = urllib.request.Request(each)
#         page = urllib.request.urlopen(req).read().decode('utf-8')
#
#     except error.HTTPError as httpe:
#         pass
#         print(each, 'can not open')
#         # print(httpe)
#     except error.URLError as urle:
#         pass
#         # print(urle)
#         print(each, 'can not open')
#     else:
#         print(each, '能打开')
#         print(page)
# print('finish')
    # with open(re.sub('[^a-zA-Z]', '', each)+'.txt', 'w+', encoding='utf-8') as f:
    #     print(page)
    #     f.write(page)
    #     f.close()

    # break


