from url_similarity import url_similarity
from text_similarity import text_similarity
from image_similarity import image_similarity
import config as cfg


def mode(identity):
    count_dict = {}
    for each in identity:
        if each in count_dict:
            count_dict[each] += 1
        else:
            count_dict[each] = 1
    print(count_dict)
    bank_index = sorted(count_dict, key=lambda x: count_dict[x])[-1]
    if count_dict[bank_index] >= 2:
        # print('in mode bank_index:', bank_index)
        return bank_index
    else:
        print('没有众数，返回INF')
        return float('inf')


def multi_class(url):

    url_identity = url_similarity(url)
    text_identity = text_similarity(url)
    image_identity = image_similarity(url)

    # 三者取众数
    identity = [url_identity, text_identity, image_identity]
    print('in multiclass, identity list', identity)
    bank_index = mode(identity)
    print('in multiclass, bank_index', bank_index)

    for k, bank in cfg.bank.items():
        if bank_index == k:
            print('in multi_class, identity_bank', bank)
            return bank
    print('in multi_class, we can not identify')
    return 'Unknown'


if __name__ == '__main__':
    # multi_class('http://www.icbc.com.cn/icbc')
    # multi_class('http://www.google.com')
    L = [1, 'inf', 0]
    mode(L)

