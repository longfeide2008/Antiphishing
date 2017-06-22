import urllib.parse
import config as cfg
from LCS import find_lcsubstr


def url_similarity_1(url):
    # 相似性=包含的字符数/敏感词的长度，但是会有icbc和ccb大小一样的情况，
    # 所以改成绝对数，但是依然存在相似性大小一致的情况
    bank_similarity = {}
    for k, bank in cfg.bank.items():
        # print(k, bank)
        host = urllib.parse.urlparse(url).netloc.lower()
        sensitive = cfg.sensitive[k]
        # print('sensitive', sensitive)
        # print(host)
        for each in sensitive:
            if each in host:
                print(each, '该url有敏感词汇')
                # break
                return each

        sen_count = {}
        dot_split = host.split('.')
        for dot_part in dot_split:
            sen_count[dot_part] = {}
            for sen_part in sensitive:
                temp_count = 0
                for sen_part_ch in sen_part:
                    if sen_part_ch in dot_part:
                        temp_count += 1
                sen_count[dot_part][sen_part] = temp_count/len(sen_part)
                # sen_count[dot_part][sen_part] = temp_count

        # 相似性=包含的字符数/敏感词的长度，但是会有icbc和ccb大小一样的情况，所以改成绝对数，但是依然存在相似性大小一致的情况

        # print(sen_count)
        # 遍历找到最大值
        temp_max = 0
        temp_max_row = ''  # column 名字
        temp_max_col = ''  # index 名字

        # 二维数组最大值对应的行列名
        for row, col in sen_count.items():
            max_col = max(col.items(), key=lambda x: x[1])
            if max_col[1] > temp_max:
                temp_max = max_col[1]
                temp_max_col = max_col[0]
                temp_max_row = row

        print('敏感词', temp_max_col)
        print('敏感域名', temp_max_row)
        print('相似性', temp_max)
        bank_similarity[k] = temp_max
    print('bank_similarity', bank_similarity)
    # 最大相似性对应的key,value,以下max返回（k, v）tuple，所以[0],是k
    url_identity = max(bank_similarity.items(), key=lambda x: x[1])[0]
    return url_identity


def url_similarity(url):
    print('In url_similarity, start')
    bank_similarity = {}
    # bank对应的key：最大敏感词，该敏感词对应的最大子串，最大子串的长度

    lgst_sstr_len_between_bank = 0  # 最终结果找到的子串的长度，该长度实际上是：子串长度/敏感词长度
    lgst_sstr_between_bank = ''  # 最终结果找到的子串
    lgst_sstr_each_between = ''  # 最终结果对应的敏感词
    result_bank_key = ''  # 最终结果的银行key

    host = urllib.parse.urlparse(url).netloc.lower()
    # 把url的http，/之后的子url去掉，只保留主机地址

    for k, bank in cfg.bank.items():

        sensitive = cfg.sensitive[k]
        lgst_sstr_len_one_bank = 0
        lgst_sstr_one_bank = ''
        lgst_sstr_each = ''

        for each in sensitive:
            lgst_substr, sstr_len = find_lcsubstr(each, host)
            if (sstr_len / len(each)) >= lgst_sstr_len_one_bank:
                lgst_sstr_len_one_bank = sstr_len / len(each)
                lgst_sstr_one_bank = lgst_substr
                lgst_sstr_each = each

        bank_similarity[k] = [lgst_sstr_each, lgst_sstr_one_bank, lgst_sstr_len_one_bank]

        if lgst_sstr_len_one_bank >= lgst_sstr_len_between_bank:
            result_bank_key = k
            lgst_sstr_each_between = lgst_sstr_each
            lgst_sstr_between_bank = lgst_sstr_one_bank
            lgst_sstr_len_between_bank = lgst_sstr_len_one_bank

    if (lgst_sstr_len_between_bank >= 0.5) & (len(lgst_sstr_between_bank) >= 2):
        print('判断出的bank key%d，敏感词%s，子串%s，子串长度/敏感词长度%.4f'
              % (result_bank_key, lgst_sstr_each_between, lgst_sstr_between_bank, lgst_sstr_len_between_bank))
        url_identity = result_bank_key
        print('In url_similarity, end')
        return url_identity
    else:
        print('url相似度小于0.5, 返回INF', lgst_sstr_len_between_bank)
        print('In url_similarity, end')
        return float('inf')


def url_check(url):
    cos_all_bank = []
    for k, bank in cfg.bank.items():
        sensitive = cfg.sensitive[0]  # 只看工行
        max_cos = 0.0
        max_sen = ''
        for sen in sensitive:
            # sstr = find_lcseque(url, sen)
            sstr, lensstr = find_lcsubstr(url, sen)

            if (max_cos <= len(sstr) / len(sen)) & (len(sstr) > 2) | ((sstr == 'gs') | (sstr == 'gh')):
                max_cos = len(sstr) / len(sen)
                max_sen = sen
        print('url, bank, max_sen, max_cos：', url, bank, max_sen, max_cos)
        cos_all_bank.append(max_cos)
    if max(cos_all_bank) >= 0.5:
        return 0
    else:
        return float('inf')

    # 以下是多分类
    # url_identity = cos_all_bank.index(max(cos_all_bank))
    # print('最大值所在的位置', url_identity)


if __name__ == '__main__':
    pass
    url = 'http://icbc.com'
    url_identity = url_check(url)
    print('in main', url_identity)
