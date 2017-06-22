from selenium import webdriver
import win32api
import win32con
import subprocess
import time
import re
import os
from shutil import rmtree

def save_web_page(urls):
    # 另外一种配置方式 start
    # UA = 'Mozilla/5.0 (Linux; Android 4.1.1; GT-N7100 Build/JRO03C) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/35.0.1916.138 Mobile Safari/537.36 T7/6.3'
    # WIDTH = 320
    # HEIGHT = 640
    # PIXEL_RATIO = 3.0
    # mobileEmulation = {"deviceMetrics": {"width": WIDTH, "height": HEIGHT, "pixelRatio": PIXEL_RATIO}, "userAgent": UA}
    # end
    # ctrl+s start
    mobileEmulation = {'deviceName': 'iPhone 5'}
    options = webdriver.ChromeOptions()
    options.add_experimental_option('mobileEmulation', mobileEmulation)
    driver = webdriver.Chrome('chromedriver/chromedriver32.exe', chrome_options=options)
    driver.set_window_size(320, 568)  # 和iPhone5的大小一致
    for url in urls:
        driver.get(url)
        time.sleep(10)   # 对于wap.icubc.cc类型的，等待时间必须足够长，否则在跳转页面不能写入保存文件的路径
        win32api.keybd_event(17, 0, 0, 0)
        win32api.keybd_event(83, 0, 0, 0)
        win32api.keybd_event(17, 0, win32con.KEYEVENTF_KEYUP, 0)
        win32api.keybd_event(83, 0, win32con.KEYEVENTF_KEYUP, 0)
        dir_name = re.sub('[^a-zA-Z0-9]', '', url)
        # 绝对路径如下，相对路径不能写./
        # exe_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "autoitexe",  'download.exe')
        exe_path = 'autoitexe/download.exe'
        file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "webpages", dir_name)
        if not os.path.isdir(file_dir):
            os.makedirs(file_dir)
        file_path = os.path.join(file_dir, dir_name + '.html')
        shot_path = os.path.join(file_dir, dir_name + '.jpg')
        driver.save_screenshot(shot_path)
        cmd = exe_path + " " + file_path
        subprocess.Popen(cmd)
        time.sleep(5)  # 为了多个网页打开时，不会出现覆盖的情况，必须等待一段时间，并且不能使用driver.close()  # 关闭当前焦点所在的窗口
    # ctrl+s end

    for url in urls:
        dir_name = re.sub('[^a-zA-Z0-9]', '', url)
        file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "webpages", dir_name)
        file_path = os.path.join(file_dir, dir_name + '.html')

        # print(dir_name, file_dir, file_path)
        for root, dir, files in os.walk(os.path.join(os.path.dirname(os.path.realpath(__file__)), "webpages")):
            for file in files:
                # print(file, dir_name + '.html')
                if file == dir_name + '.html':

                    try:  # 对于那些不是以utf8编码的，需要另存为。原来就是utf8的，在getcontent是要指明encoding
                        with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                            pass

                            # saveutf8 = 'powershell.exe get-content -path %s  -encoding utf8 | out-file %s -encoding utf8' % (
                            #     'C:\Liujuan\Code\multi_class_resolution\webpages\httpwwwbaiducom\httpwwwbaiducom.html',
                            #     'C:\Liujuan\Code\multi_class_resolution\webpages\httpwwwbaiducom\ha.html')
                            # print(saveutf8)
                            # subprocess.Popen(saveutf8)

                    except Exception as e:
                        saveutf8 = 'powershell.exe get-content -path %s | out-file %s -encoding utf8' % (file_path,os.path.join(file_dir, dir_name + 'utf8.html'))
                        print('保存成utf-8', saveutf8)
                        subprocess.Popen(saveutf8)

if __name__ == '__main__':
    urls = ['http://www.baidu.com']
    save_web_page(urls)

