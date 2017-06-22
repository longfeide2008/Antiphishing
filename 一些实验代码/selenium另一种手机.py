from selenium import webdriver
from time import sleep
from selenium import webdriver
import time
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import threading

def loadJS(driver, js):
    driver.execute_script(js)

def getScreen(driver, filename):
    driver.get_screenshot_as_file(filename)

url = "http://wap.icubc.cc"
filename = 'screen3.png'

loadjs = "var i=1;window.setInterval(a, 50);function a(){document.getElementsByTagName('body')[0].scrollTop=100*i;i++;}"


UA = 'Mozilla/5.0 (Linux; Android 4.1.1; GT-N7100 Build/JRO03C) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/35.0.1916.138 Mobile Safari/537.36 T7/6.3'

dcap = dict(DesiredCapabilities.PHANTOMJS)  # 设置userAgent
dcap["phantomjs.page.settings.userAgent"] = UA

driver = webdriver.PhantomJS(desired_capabilities=dcap)  # 加载网址

driver.get(url)
loadJS(driver, loadjs)
time.sleep(5)
getScreen(driver, filename)
driver.quit()
#
# WIDTH = 320
# HEIGHT = 640
# PIXEL_RATIO = 3.0
#
# mobileEmulation = {"deviceMetrics": {"width": WIDTH, "height": HEIGHT, "pixelRatio": PIXEL_RATIO}, "userAgent": UA}
# options = webdriver.ChromeOptions()
# options.add_experimental_option('mobileEmulation', mobileEmulation)
#
# driver = webdriver.Chrome(executable_path='chromedriver/chromedriver32.exe', chrome_options=options)
# driver.get('http://wap.icubc.cc')
#
# sleep(10)
# driver.close()