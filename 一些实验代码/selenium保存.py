from selenium import webdriver
# 驱动和浏览器都要安装且版本如下
# Firefox:54
# geckodriver:0.17.0
#
# prof = webdriver.FirefoxProfile()
# # 下面几个是核心参数
# prof.set_preference("browser.download.folderList", 2)  # 2表示自定义文件夹 0表示保存到桌面
# prof.set_preference("browser.download.manager.showWhenStarting", False) # 没什么用
# prof.set_preference("browser.download.dir", "selenium/")  # 设置默认的保存文件夹
# # 设置自动保存的文件类型，如果firefox不能自动保存，一定是文件类型不对</span>
# prof.set_preference("browser.helperApps.neverAsk.saveToDisk", 'application/a-gzip,application/x-gzip')
# # 其他可选文件类型"application/x-gzip;application/zip,application/x-gtar,text/plain,application/x-compressed,application/octet-stream,application/pdf")
# # 下面这些参数是从别的地方看到的
# prof.set_preference("browser.helperApps.alwaysAsk.force", False)
# prof.set_preference("browser.download.manager.alertOnEXEOpen", False)
# prof.set_preference("browser.download.manager.focusWhenStarting", False)
# prof.set_preference("browser.download.useDownloadDir", True)
# prof.set_preference("browser.download.manager.alertOnEXEOpen", False)
# prof.set_preference("browser.download.manager.closeWhenDone", True)
# prof.set_preference("browser.download.manager.showAlertOnComplete", False)
# prof.set_preference("browser.download.manager.useWindow", False) #
# #disable Firefox's built-in PDF viewer
# prof.set_preference("pdfjs.disabled", True)

# 给firefox使用
import time
mobileEmulation = {'deviceName': 'iPhone 5'}
options = webdriver.ChromeOptions()
options.add_experimental_option('mobileEmulation', mobileEmulation)

driver = webdriver.Chrome('chromedriver/chromedriver32.exe', chrome_options=options)
# url = 'http://www.taobao.com'
driver.get('http://wap.icubc.cc')
time.sleep(10)
driver.close()
print(driver.desired_capabilities)



from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

dcap = dict(DesiredCapabilities.PHANTOMJS)
dcap["phantomjs.page.settings.userAgent"] = (
    "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
)
dcap["width"] = 360
dcap["height"] = 640
dcap["pixelRatio"] = 3.0

driver2 = webdriver.PhantomJS(desired_capabilities=dcap)
# driver2.get("http://dianping.com/")
cap_dict = driver2.desired_capabilities
for key in cap_dict:
    print('%s: %s' % (key, cap_dict[key]))

# print(driver.current_url,driver.quit)
driver2.get('http://wap.icubc.cc')
time.sleep(10)
driver2.get_screenshot_as_file('screen4.jpg')