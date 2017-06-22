from selenium import webdriver
from time import sleep
import time
import re
with open('dianxinurl.txt', 'r', encoding='utf-8') as f:
    urls = f.readlines()
    for url in urls:
        # 说明宽高UA等
        # WIDTH = 320
        # HEIGHT = 640
        # PIXEL_RATIO = 3.0
        # UA = 'Mozilla/5.0 (Linux; Android 4.1.1; GT-N7100 Build/JRO03C) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/35.0.1916.138 Mobile Safari/537.36 T7/6.3'
        #
        # mobileEmulation = {"deviceMetrics": {"width": WIDTH, "height": HEIGHT, "pixelRatio": PIXEL_RATIO},
        #                    "userAgent": UA}
        # options = webdriver.ChromeOptions()
        # options.add_experimental_option('mobileEmulation', mobileEmulation)

        # 直接指定手机型号
        mobileEmulation = {'deviceName': 'iPhone 5'}
        options = webdriver.ChromeOptions()
        options.add_experimental_option('mobileEmulation', mobileEmulation)

        driver = webdriver.Chrome('chromedriver/chromedriver32.exe',chrome_options=options)
        # driver.set_window_size(1200, 900)
        driver.get(url)
        print(driver.title)
        # setTimeout()是设定一个指定等候时间(单位是千分之一秒, millisecond), 时间到了, 浏览器就会执行一个指定的方法
        driver.execute_script("""
                (function () {
                    var y = 0;
                    var step = 100;
                    window.scroll(0, 0);

                    function f() {
                        if (y < document.body.scrollHeight) {
                            y += step;
                            window.scroll(0, y);
                            setTimeout(f, 100);
                        } else {
                            window.scroll(0, 0);
                            document.title += "scroll-done";
                        }
                    }

                    setTimeout(f, 1000);
                })();
            """)

        for i in range(3):
            if "scroll-done" in driver.title:
                print(driver.title)
                break
            time.sleep(10)

        # fname = 'dianxinscreen/{0}.jpg'.format(re.sub('[^a-zA-Z0-9]', '', url))
        # print(fname)
        # time.sleep(10)
        driver.save_screenshot('long.jpg')
        driver.close()



# 以下是giuhub上较为完整的
from selenium import webdriver
import webbrowser
from selenium.webdriver.chrome.options import Options
mobile_emulation = {
    "deviceMetrics": { "width": 360, "height": 640, "pixelRatio": 3.0 },
    "userAgent": "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19" }
chrome_options = Options()
chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)
driver = webdriver.Chrome(chrome_options = chrome_options)