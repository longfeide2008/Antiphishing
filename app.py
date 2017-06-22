# -*- coding: utf-8 -*-
import os
from flask import Flask, request, render_template, redirect, url_for, jsonify
from flask import send_from_directory
from werkzeug.utils import secure_filename
import json
import re
import subprocess
from multiclass import multi_class, analyze
import config as cfg
from savewebpage import save_web_page
from shutil import copyfile
app = Flask(__name__)
UPLOAD_FOLDER = 'static/Uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def analyze_1(f_name):
    print('analyze method start:')
    f = open(os.path.join(app.config['UPLOAD_FOLDER'], f_name))
    line_identity_dict = {}
    urls = f.readlines()
    for url in urls:
        # 如果url不是以http开头的，要补全
        if not url.startswith('http'):
            url = 'http://' + url
            print('补全http', url)
    # 保存所有的网页
    print(type(urls))
    print(urls)
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
            copyfile(file_path, 'screen_Unknown/'+dir_name+'.jpg')

        for k, bank in cfg.bank.items():
            if line_identity == bank:
                # cmd = 'phantomjs screen.js %s %s%s' % (line, './screen_', bank)
                # subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()
                # print('In app', line, 'have screened')
                copyfile(file_path, 'screen_' + bank + '/' + dir_name + '.jpg')
                break
    print('In app, line_identity_dict', line_identity_dict)

    # dict_json = json.dumps(line_identity_dict, ensure_ascii=False, indent=2)
    # with open('line_identity_dict.json', 'w', encoding='utf-8') as fwrite:
    #     fwrite.write(dict_json)
    #     fwrite.close()
    return line_identity_dict


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    print('In app /upload, the request is ', request)
    if request.method == 'GET':
        return render_template('upload.html')
    elif request.method == 'POST':
        f = request.files['file']
        f_name = secure_filename(f.filename)  # 获取一个安全的文件名，且仅仅支持ascii字符；
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], f_name))
        analyze_result = analyze()

        return render_template('upload.html', detection_result=analyze_result)


@app.route('/')
def index():
    return redirect(url_for('upload'), 302)


@app.route('/upload/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)