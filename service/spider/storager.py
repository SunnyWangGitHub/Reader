import requests
import json
import os


class Storager(object):

    def __init__(self):
        self.newNovelUrls = []
        self.oldNovelUrls = []
        self.newChapterUrls = []
        self.oldChapterUrls = []
        self.novel = {}
        self.novel['chapter'] = []
        self.novel['name'] = ''
        self.novel['writer'] = ''
        self.novel['cover'] = None
        self.baseUrl = "http://www.biquge.com.tw"

    def hasNovelUrl(self):
        return len(self.newNovelUrls) > 0

    def getNewNovelUrl(self):
        newUrl = self.newNovelUrls.pop(0)
        self.oldNovelUrls.append(newUrl)
        if self.baseUrl not in newUrl:
            newUrl = self.baseUrl + newUrl
        return newUrl

    def addNewNovelUrl(self, newUrl):
        if newUrl in self.oldNovelUrls or newUrl is None:
            return None
        self.newNovelUrls.append(newUrl)
        return

    def addNewNovelUrls(self, newUrls):
        if newUrls is None or len(newUrls) == 0:
            return None
        for i in newUrls:
            self.addNewNovelUrl(i)
        return

    def hasChapterUrl(self):
        return len(self.newChapterUrls) > 0

    def getNewChapterUrl(self):
        newUrl = self.newChapterUrls.pop(0)
        self.oldChapterUrls.append(newUrl)
        if self.baseUrl not in newUrl:
            newUrl = self.baseUrl + newUrl
        return newUrl

    def addNewChapterUrl(self, newUrl):
        if newUrl in self.oldChapterUrls or newUrl is None:
            return None
        self.newChapterUrls.append(newUrl)
        return

    def addNewChapterUrls(self, newUrls):
        if newUrls is None or len(newUrls) == 0:
            return None
        for i in newUrls:
            self.addNewChapterUrl(i)
        return

    def addNovelInfo(self, info):
        if info is None or len(info) == 0:
            return None
        for key in info:
            '''
            if key == 'coverUrl':
                response = requests.get(self.baseUrl + info[key])
                self.novel['cover'] = response.content
            else:
                self.novel[key] = info[key]
            '''
            if key == 'coverUrl':
                self.novel[key] = self.baseUrl + info[key]
                continue
            self.novel[key] = info[key]
        return

    def addNovelChapter(self, chapter):
        data = {}
        if chapter is None or len(chapter) == 0:
            return None
        for key in chapter:
            data[key] = chapter[key]
        self.novel['chapter'].append(data)
        return

    def getNovel(self):
        return self.novel

    def hasData(self):
        return len(self.novel) > 0

    def clearNovelData(self):
        self.novel['chapter'].clear()
        return

    def getOldUrlsFromJson(self):
        if not os.path.exists('oldNovelUrls.json'):
            f = open('oldNovelUrls.json', 'w', encoding='utf-8')
            f.close()
        if not os.path.exists('oldChapterUrls.json'):
            f = open('oldChapterUrls.json', 'w', encoding='utf-8')
            f.close()
        with open('oldNovelUrls.json', 'r', encoding='utf-8') as f:
            if f.read() is not None and len(f.read()) > 0:
                oldUrls = json.loads(f.read())
                for i in oldUrls:
                    self.oldNovelUrls.append(i)
        with open('oldChapterUrls.json', 'r', encoding='utf-8') as f:
            if f.read() is not None and len(f.read()) > 0:
                oldUrls = json.loads(f.read())
                for i in oldUrls:
                    self.oldChapterUrls.append(i)
        return

    def setOldUrlsToJson(self):
        with open('oldNovelUrls.json', 'w', encoding='utf-8') as f:
            f.write(json.dumps(self.oldNovelUrls))
        with open('oldChapterUrls.json', 'w', encoding='utf-8') as f:
            f.write(json.dumps(self.oldChapterUrls))
        return
