# coding=utf-8
import time
from selenium import webdriver
from selenium.webdriver import ActionChains
# actionChains在firefox下不工作
from selenium.webdriver.common.keys import Keys
import win32api
import win32con


driver = webdriver.Chrome(executable_path='chromedriver/chromedriver32.exe')
# driver = webdriver.Firefox(executable_path='chromedriver/geckodriver.exe')
# driver.maximize_window()
driver.get('https://www.baidu.com')
win32api.keybd_event(17,0,0,0)
win32api.keybd_event(83,0,0,0)

win32api.keybd_event(17,0,win32con.KEYEVENTF_KEYUP,0)
win32api.keybd_event(83,0,win32con.KEYEVENTF_KEYUP,0)
# ActionChains(driver).key_down(Keys.CONTROL).send_keys('s').key_up(Keys.CONTROL).perform()  # 在firefox下是可以的，在chrome下不行
# ActionChains(driver).send_keys(Keys.CONTROL, 's').perform() # 复制（Ctrl+C）
# ActionChains(driver).key_down(Keys.ENTER).perform()
#

#
# time.sleep(2)

# # element = driver.find_element_by_xpath("//*[@id='lg']/img")
# actionChains = ActionChains(driver)
# actionChains.context_click()
# # actionChains.send_keys(Keys.ENTER)
# # actionChains.send_keys(Keys.ARROW_DOWN)
# actionChains.perform()
# win32api.keybd_event(40,0,0,0)
# win32api.keybd_event(40,0,win32con.KEYEVENTF_KEYUP,0)
# win32api.keybd_event(40,0,0,0)
# win32api.keybd_event(40,0,win32con.KEYEVENTF_KEYUP,0)
# win32api.keybd_event(40,0,0,0)
# win32api.keybd_event(40,0,win32con.KEYEVENTF_KEYUP,0)
# #
# win32api.keybd_event(13,0,0,0)
# win32api.keybd_event(13,win32con.KEYEVENTF_KEYUP,0)
# #actionChains.context_click(element).send_keys('i').perform()
#
# # send_keys(Keys.ARROW_DOWN).send_keys(Keys.ENTER).
