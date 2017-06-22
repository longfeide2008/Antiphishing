from url_similarity import url_similarity
from text_similarity import text_check
from image_similarity import image_check
import config as cfg
from savewebpage import save_web_page
import re
import os
from shutil import copyfile


def analyze():
    print('analyze method start:')
    f = open('static/Uploads/test.txt')
    line_identity_dict = {}
    urls = f.readlines()
    for url in urls:
        # 如果url不是以http开头的，要补全
        if not url.startswith('http'):
            url = 'http://' + url
            print('补全http', url)
    # 保存所有的网页

    save_web_page(urls)

    for line in urls:
        print(line)
        line_identity = multi_class(line)
        line_identity_dict[line] = line_identity
        print('in app, line_identity', line_identity)

        # 把截图复制到制定的目录
        dir_name = re.sub('[^a-zA-Z0-9]', '', line)
        to_check_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "webpages", dir_name)
        file_path = os.path.join(to_check_dir, dir_name+'.jpg')
        if line_identity == 'Unknown':
            # cmd = 'phantomjs screen.js %s %s' % (line, './screen_Unknown')
            # subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()
            # print('In app', line, 'is unknown and have screened')
            if not os.path.isdir('screen_Unknown'):
                os.makedirs('screen_Unknown')
            copyfile(file_path, 'screen_Unknown/'+dir_name+'.jpg')

        for k, bank in cfg.bank.items():
            if line_identity == bank:
                # cmd = 'phantomjs screen.js %s %s%s' % (line, './screen_', bank)
                # subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()
                # print('In app', line, 'have screened')
                if not os.path.isdir('screen_' + bank):
                    os.makedirs('screen_' + bank)
                copyfile(file_path, 'screen_' + bank + '/' + dir_name + '.jpg')
                break
    print('In app, line_identity_dict', line_identity_dict)

    # dict_json = json.dumps(line_identity_dict, ensure_ascii=False, indent=2)
    # with open('line_identity_dict.json', 'w', encoding='utf-8') as fwrite:
    #     fwrite.write(dict_json)
    #     fwrite.close()
    return line_identity_dict


def mode(identity):
    count_dict = {}
    for each in identity:
        if each in count_dict:
            count_dict[each] += 1
        else:
            count_dict[each] = 1
    # print(count_dict)
    bank_index = sorted(count_dict, key=lambda x: count_dict[x])[-1]
    if count_dict[bank_index] >= 2:
        # print('in mode bank_index:', bank_index)
        return bank_index
    else:
        print('没有众数，返回INF')
        return float('inf')


def multi_class(url):

    url_identity = url_similarity(url)
    text_identity = text_check(url)
    image_identity = image_check(url)

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
    analyze()
    # multi_class('http://www.icbc.com')
    # L = [1, 'inf', 0]
    # mode(L)

