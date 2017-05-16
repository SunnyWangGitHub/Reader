import requests


class HtmlDownloader(object):

    def download(self, url):
        htmlDoc = requests.get(url)
        htmlDoc.encoding = 'gbk'
        return htmlDoc.text
