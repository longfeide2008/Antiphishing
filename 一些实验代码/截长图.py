from selenium import webdriver
import os
import time
from PIL import Image


def capture(base_url, pix_w, pix_h, filename):
    """chrome截屏
    base_url- 要截屏的url
    pix_w- 窗口宽
    pix_h- 窗口高
    filename-生成截图的文件名
    """
    try:
        mobileEmulation = {'deviceName': 'iPhone 5'}
        options = webdriver.ChromeOptions()
        options.add_experimental_option('mobileEmulation', mobileEmulation)
        driver = webdriver.Chrome(executable_path='chromedriver/chromedriver32.exe', chrome_options=options)
        driver.set_window_size(pix_w, pix_h + 89)
        driver.get(base_url)
        time.sleep(10)
        img_list = []
        i = 0
        while i < 20:
            # 滚屏
            js = "var q=document.body.scrollTop=" + str(i * pix_h) + ";"
            driver.execute_script(js)
            js1 = "return document.body.scrollHeight.toString()+','+document.body.scrollTop.toString()"
            js1_result = driver.execute_script(js1)
            real_scroll_h, real_top = js1_result.split(',')[0], js1_result.split(',')[1]
            # real_scroll_h, real_top 是当前滚动条长度和当前滚动条的top，作为是否继续执行的依据，由于存在滚动条向下拉动后会加载新内容的情况，所以需要以下的判断
            # 如果这次设置的top成功，则继续滚屏
            if real_top == str(i * pix_h):
                i += 1
                driver.save_screenshot('wap/' + filename + str(i) + '.png')
                img_list.append('wap/' + filename + str(i) + '.png')
                last_t = real_top
            else:
                # 如果本次设置失败，看这次的top和上一次记录的top值是否相等，相等则说明没有新加载内容，且已到页面底，跳出循环
                if real_top != last_t:
                    last_t = real_top
                else:
                    driver.save_screenshot(filename + str(i + 1) + '.png')
                    img_list.append(filename + str(i + 1) + '.png')
                    break
        # image_merge(img_list, "wap/", filename + '.png')
    except Exception as e:
        print(e)


def image_merge(images, output_dir, output_name='merge.jpg', restriction_max_width=None, restriction_max_height=None):
    """垂直合并多张图片
    images - 要合并的图片路径列表
    ouput_dir - 输出路径
    output_name - 输出文件名
    restriction_max_width - 限制合并后的图片最大宽度，如果超过将等比缩小
    restriction_max_height - 限制合并后的图片最大高度，如果超过将等比缩小
    """

    def image_resize(img, size=(1500, 1100)):
        """调整图片大小
        """
        try:
            if img.mode not in ('L', 'RGB'):
                img = img.convert('RGB')
            img = img.resize(size)
        except Exception as e:
            pass
        return img

    max_width = 0
    total_height = 0
    # 计算合成后图片的宽度（以最宽的为准）和高度
    for img_path in images:
        if os.path.exists(img_path):
            img = Image.open(img_path)
            width, height = img.size
            if width > max_width:
                max_width = width
            total_height += height

            # 产生一张空白图
    new_img = Image.new('RGB', (max_width, total_height), 255)
    # 合并
    x = y = 0
    for img_path in images:
        if os.path.exists(img_path):
            img = Image.open(img_path)
            width, height = img.size
            new_img.paste(img, (x, y))
            y += height

    if restriction_max_width and max_width >= restriction_max_width:
        # 如果宽带超过限制
        # 等比例缩小
        ratio = restriction_max_height / float(max_width)
        max_width = restriction_max_width
        total_height = int(total_height * ratio)
        new_img = image_resize(new_img, size=(max_width, total_height))

    if restriction_max_height and total_height >= restriction_max_height:
        # 如果高度超过限制
        # 等比例缩小
        ratio = restriction_max_height / float(total_height)
        max_width = int(max_width * ratio)
        total_height = restriction_max_height
        new_img = image_resize(new_img, size=(max_width, total_height))

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    save_path = '%s/%s' % (output_dir, output_name)
    new_img.save(save_path)
    for img_path in images:
        os.remove(img_path)
    return save_path

capture('http://wap.icubc.cc', 320, 568, 'jielong')