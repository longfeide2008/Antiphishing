
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import os
import time
# set user agent
user_agent = ("Mozilla/5.0 (Linux; Android 4.1.1; GT-N7100 Build/JRO03C) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/35.0.1916.138 Mobile Safari/537.36 T7/6.3")
# user_agent = ("Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A4449d Safari/9537.53")
# user_agent = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36")

dcap = dict(DesiredCapabilities.PHANTOMJS)
dcap["phantomjs.page.settings.userAgent"] = user_agent
# dcap["phantomjs.page.settings.javascriptEnabled"] = True
# dcap["phantomjs.page.settings.loadImages"] = True
dcap["phantomjs.page.settings.viewportSize"] = {
    "width" : 320,
    "height" : 640,
    'pixelRatio':3.0
}

browser = webdriver.PhantomJS(service_args=['--ignore-ssl-errors=true'], desired_capabilities=dcap)
# browser.set_window_size(640, 640)
time.sleep(10)
browser.implicitly_wait(10) #seconds
browser.get('http://www.baidu.com.cn')

# Capture the screenshot
browser.get_screenshot_as_file('screen5.png')

# Close the browser
browser.close()