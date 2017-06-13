# This to detect the text distance between two urls
#
# 1、jieba分词（不用jieba内置的tf_idf计算词频，而用sklearn计算）
# 2、sklearn计算tf-idf


# CountVectorizer是通过fit_transform函数将文本中的词语转换为词频矩阵，
# 矩阵元素a[i][j] 表示j词在第i个文本下的词频。即各个词语出现的次数，
# 通过get_feature_names()可看到所有文本的关键字，通过toarray()可看到词频矩阵的结果
# icbc官网和百度的cos相似度是0.04， icbc官网和ccb官网的相似度是0.19
# http://www.ccb.com/cn/home/indexv3.html

import math
import config as cfg
import re
import jieba
import urllib.request
from urllib import error
from sklearn.feature_extraction.text import TfidfVectorizer


def readstoplist():
    stopwordspath = 'stopwords.txt'
    stwlist = [line.strip()
               for line in open(stopwordspath, 'r', encoding='utf-8').readlines()]
    return stwlist


def numerator(vector1, vector2):
    #分子
    return sum(a * b for a, b in zip(vector1, vector2))


def denominator(vector):
    #分母
    return math.sqrt(sum(a * b for a,b in zip(vector, vector)))


def run(vector1, vector2):
    return numerator(vector1, vector2) / (denominator(vector1) * denominator(vector2))


def get_chinese_content(raw_page_content):
    content_list = re.findall(u"[\u4e00-\u9fa5]+", raw_page_content)
    return "".join(content_list)


def get_seg_list(chinese_content):

    return jieba.cut(chinese_content)


def text_similarity(url_to_detect):
    print('In text_similarity, start')

    # corpus_english = ['The dog ate a sandwich and I ate a sandwich', 'The wizard transfigured a sandwich']
    # corpus_chinese = ['我喜欢中国，也喜欢美国。', '我喜欢足球，不喜欢篮球。']
    # corpus = [' '.join(get_seg_list(each)) for each in corpus_chinese]

    # 以下隐掉是因为事先把icbc和ccb的官方网页保存到txt里了start

    # url_0 = 'http://www.icbc.com.cn/icbc'
    # req_0 = urllib.request.Request(url_0)
    # page_0 = urllib.request.urlopen(req_0)
    # content_bytes_0 = page_0.read()
    # content_str_0 = content_bytes_0.decode('utf-8')
    #
    # url_1 = 'http://www.ccb.com/cn/home/indexv3.html'
    # req_1 = urllib.request.Request(url_1)
    # page_1 = urllib.request.urlopen(req_1)
    # content_bytes_1 = page_1.read()
    # content_str_1= content_bytes_1.decode('utf-8')
    # print(type(content_str_1))
    # end

    with open('icbc_content_str.txt', 'r', encoding='utf-8') as f1:
        content_str_0 = f1.read()
        print('f1 successfully ')
        f1.close()
    with open('ccb_content_str.txt', 'r', encoding='utf-8') as f2:
        content_str_1 = f2.read()
        print('f2 successfully ')
        f2.close()

    try:
        req_to_detect = urllib.request.Request(url_to_detect)
        page_to_detect= urllib.request.urlopen(req_to_detect)
        content_bytes_to_detect = page_to_detect.read()
        content_str_to_detect = content_bytes_to_detect.decode('utf-8')
        print(type(content_str_to_detect))

        corpus = [' '.join(get_seg_list(get_chinese_content(content_str_0))),
                  ' '.join(get_seg_list(get_chinese_content(content_str_1))),
                  ' '.join(get_seg_list(get_chinese_content(content_str_to_detect)))]
        # print('corpus', corpus)

        # icbc官网加上stopwords词库的大小从209到188，如果不加，有的词也会停用，不知是否是内置已经有了部分停用词
        vectorizer = TfidfVectorizer(stop_words=readstoplist())
        tf_idf_matrix = vectorizer.fit_transform(corpus).toarray()
        vocabulary = vectorizer.vocabulary_
        words = vectorizer.get_feature_names()
        # print(tf_idf_matrix)
        print('词库', len(words))

        # 待检测的url分别与icbc，ccb的距离
        # 矩阵的第一行是icbc的tf_idf向量，第二行是ccb的tf_idf向量，最后一行是待检测的文档的tf_idf向量
        max_cos_dis = 0
        max_cos_index = 0

        bank_num = len(cfg.bank)

        for i in range(0, bank_num):
            cos_dis = run(tf_idf_matrix[i], tf_idf_matrix[bank_num])
            if cos_dis >= max_cos_dis:
                max_cos_dis = cos_dis
                max_cos_index = i
        if max_cos_dis >= 0.5:
            text_identity = max_cos_index
            print('最大的余弦相似度:%.4f，判断出来的bank key:%d' % (max_cos_dis, max_cos_index))
            print('In text_similarity, end')
            return text_identity
        else:
            print('余弦相似度小于0.5,返回INF', max_cos_dis)
            return float('inf')
    except error.HTTPError as httpe:
        print('In text_similarity:打不开待查询的网页,http返回错误代码', httpe)
        return float('inf')
    except error.URLError as urle:
        print('In text_similarity:打不开待查询的网页,打不开地址',  urle)
        return float('inf')


if __name__ == '__main__':
    a = text_similarity('http://www.google.com')
    print('a', a)
