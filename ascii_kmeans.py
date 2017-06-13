# -*- coding: utf-8 -*-
from sklearn.cluster import KMeans
from sklearn.externals import joblib
import numpy
import time
import matplotlib.pyplot as plt
import pandas as pd


def integer_to_char(float_list):
    str = [chr(int(each))for each in float_list]
    return ''.join(str)


def kmeans(dataset):

    k = 10
    clf = KMeans(n_clusters=k) #设定k  ！！！！！！！！！！这里就是调用KMeans算法
    s = clf.fit(dataSet) #加载数据集合
    # print('聚类参数', s)
    # 中心点
    centroids = clf.cluster_centers_
    print('中心点', len(centroids))  # 显示中心点

    # 每个样本所属的簇
    labels = clf.labels_
    # print('每个样本所属的簇', labels)

    # 用来评估簇的个数是否合适，距离越小说明簇分的越好，选取临界点的簇个数
    print('评估', clf.inertia_)  #显示聚类效果

    for i in range(0, k):
        str = integer_to_char(centroids[i])
        print('中心点对应的字符形式', str)

exam = 7000
# 空字符Null：0
urls = pd.read_excel('icbc_kmeans.xlsx', converters={'phishing': str})['phishing'].head(7000)
urls_asc = []
for url in urls:
    temp = []
    for ch in url:
        temp.append(ord(ch))
    urls_asc.append(temp)

print('样本数量', len(urls_asc))

df = pd.DataFrame(urls_asc, index=range(0, exam))
df.fillna(0, inplace=True)

dataSet = []
for i in range(exam):
    dataSet.append(df.ix[i, :].tolist())

kmeans(dataSet)