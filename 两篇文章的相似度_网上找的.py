# -*- coding: utf8 -*-
import math
import jieba.analyse
article_a = '我喜欢中国，也喜欢美国。'
article_b = '我喜欢足球，不喜欢篮球。'


def cut_word(article):
    # ->https://github.com/fxsjy/jieba#3-关键词提取
    # jieba.analyse.set_stop_words("./stopwords.txt")
    res = jieba.analyse.extract_tags(
        sentence=article, topK=20, withWeight=True)
    # res使用TF_IDF计算的关键词及其tf_idf值，是在单个文本内计算的，而不是多个文本的集合
    return res


def tf_idf(res1=None, res2=None):
    print('res1', res1)
    print('res2', res2)
    # 向量，可以使用list表示
    vector_1 = []
    vector_2 = []
    # 词频，变成用dict表示
    tf_1 = {i[0]: i[1] for i in res1}
    tf_2 = {i[0]: i[1] for i in res2}
    print('tf_1', tf_1)
    print('tf_2', tf_2)
    res = set(list(tf_1.keys()) + list(tf_2.keys()))
    print('res', res)

    # 填充词频向量
    for word in res:
        if word in tf_1:
            vector_1.append(tf_1[word])
        else:
            vector_1.append(0)
        if word in tf_2:
            vector_2.append(tf_2[word])
        else:
            vector_2.append(0)
    print(vector_1, vector_2)

    return vector_1, vector_2


def numerator(vector1, vector2):
    #分子
    return sum(a * b for a, b in zip(vector1, vector2))


def denominator(vector):
    #分母
    return math.sqrt(sum(a * b for a,b in zip(vector, vector)))


def run(vector1, vector2):
    return numerator(vector1,vector2) / (denominator(vector1) * denominator(vector2))


vectors = tf_idf(res1=cut_word(article=article_a), res2=cut_word(article=article_b))
# 相似度
similarity = run(vector1=vectors[0], vector2=vectors[1])
# 使用arccos计算弧度
rad = math.acos(similarity)
print(similarity, rad)

# 0.2157074518785444 1.353380046633586