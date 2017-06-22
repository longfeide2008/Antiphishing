#coding=utf-8
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
import time
import os
import subprocess
import win32con
import win32api
# autoit实现上传 start
# driver = webdriver.Firefox(executable_path='chromedriver/geckodriver.exe')
# #打开上传功能页面
# file_path = 'file:///' + os.path.abspath('uplad.html')
# # print('uplad.html')
# driver.get(file_path)
# #点击打开上传窗口
# driver.find_element_by_name("file").click()
# #调用upfile.exe上传程序
# os.system("C:\\Users\\liuju\\Desktop\\upfile.exe")
# driver.quit()
# autoit实现上传 end

# autoit实现下载 start
# driver = webdriver.Firefox(executable_path='chromedriver/geckodriver.exe')
# driver.get('http://www.baidu.com.cn')
# saveas = ActionChains(driver).key_down(Keys.CONTROL).send_keys('s').key_up(Keys.CONTROL)  # 在firefox下是可以的，在chrome下不行
# saveas.perform()
# exe_path = "C:\\Users\\liuju\\Desktop\\download.exe"
# file_path = "C:\\Users\\liuju\\Desktop\\download\\a.html"
# cmd = exe_path +" " + file_path
# ps = subprocess.Popen(cmd)
# ps.wait()
# 以下是火狐 start
# prof = webdriver.FirefoxProfile()
# # prof.set_preference("device Name", 'Apple iPhone s')
# driver = webdriver.Firefox(executable_path='chromedriver/geckodriver.exe')
# driver.get('http://wap.icubc.cc')
# saveas = ActionChains(driver).key_down(Keys.CONTROL).send_keys('s').key_up(Keys.CONTROL)  # 在firefox下是可以的，在chrome下不行
# saveas.perform()
# 火狐end

# 谷歌start
mobileEmulation = {'deviceName': 'iPhone 5'}
options = webdriver.ChromeOptions()
options.add_experimental_option('mobileEmulation', mobileEmulation)

driver = webdriver.Chrome('chromedriver/chromedriver32.exe', chrome_options=options)
driver.set_window_size(320, 568)
# driver.maximize_window()
driver.get('http://wap.icubc.cc')
time.sleep(10)
win32api.keybd_event(17,0,0,0)
win32api.keybd_event(83,0,0,0)
win32api.keybd_event(17,0,win32con.KEYEVENTF_KEYUP,0)
win32api.keybd_event(83,0,win32con.KEYEVENTF_KEYUP,0)
# 谷歌end

exe_path = "C:\\Users\\liuju\\Desktop\\download.exe"
file_path = "C:\\Users\\liuju\\Desktop\\download\\b.html"
cmd = exe_path +" " + file_path
ps = subprocess.Popen(cmd)
ps.wait()
driver.save_screenshot('long.jpg')

# os.system("C:\\Users\\liuju\\Desktop\\download.exe")
# driver.quit()
#
# driver = webdriver.Firefox(executable_path='chromedriver/geckodriver.exe')
# driver.get('http://mail.163.com/')
# saveas = ActionChains(driver).key_down(Keys.CONTROL).send_keys('s').key_up(Keys.CONTROL)  # 在firefox下是可以的，在chrome下不行
# saveas.perform()
# os.system("C:\\Users\\liuju\\Desktop\\download.exe")
# driver.close()


# autoit实现下载 end
