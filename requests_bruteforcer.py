#!/usr/bin/env python2.7
"""This module brute force a form."""

import requests


# login_url = ("http://192.168.100.1/login.cgi")
login_url = "http://192.168.100.1"

request_header = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "en-US",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": "Cookie=body:Language:arabic:id=-1",
    "DNT": "1",
    "Host": "192.168.100.1",
    "Referer": "http://192.168.100.1/",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0"

}

login_data = {
    "PassWord": "YWRtaW4xMjM0",
    "UserName": "admin",
    "x.X_HW_Token": "2e96fe88189e885c299e6ac50d956e0d"
}

p = requests.post(login_url, data=login_data)

print p.content
