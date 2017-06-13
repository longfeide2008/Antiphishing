# -*- coding: utf-8 -*-
import os
from flask import Flask, request, render_template, redirect, url_for, jsonify
from flask import send_from_directory
from werkzeug.utils import secure_filename
import json
import subprocess
from multiclass import multi_class
import config as cfg

app = Flask(__name__)
UPLOAD_FOLDER = 'static/Uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def analyze(f_name):
    print('analyze method start:')
    f = open(os.path.join(app.config['UPLOAD_FOLDER'], f_name))
    line_identity_dict = {}
    for line in f:
        print(line)
        # 如果url不是以http开头的，要补全
        if not line.startswith('http'):
            line = 'http://' + line
            print('补全http', line)

        line_identity = multi_class(line)
        line_identity_dict[line] = line_identity
        print('in app, line_identity', line_identity)

        if line_identity == 'Unknown':
            cmd = 'phantomjs screen.js %s %s' % (line, './screen_Unknown')
            subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()
            print('In app', line, 'is unknown and have screened')

        for k, bank in cfg.bank.items():
            if line_identity == bank:
                cmd = 'phantomjs screen.js %s %s%s' % (line, './screen_', bank)
                subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()
                print('In app', line, 'have screened')
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
        analyze_result = analyze(f_name)

        return render_template('upload.html', detection_result=analyze_result)


@app.route('/')
def index():
    return redirect(url_for('upload'), 302)


@app.route('/upload/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)