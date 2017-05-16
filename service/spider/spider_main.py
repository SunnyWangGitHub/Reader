import html_downloader
import html_parser
import storager
import html_outputer


class SpiderMain():

    def __init__(self):
        self.parser = html_parser.HtmlParser()
        self.downloader = html_downloader.HtmlDownloader()
        self.storager = storager.Storager()
        self.outputer = html_outputer.HtmlOutputer()

    def craw(self, rootUrl):
        self.storager.getOldUrlsFromJson()

        htmlDoc = self.downloader.download(rootUrl)
        newUrls = self.parser.parseQuanben(rootUrl, htmlDoc)
        self.storager.addNewNovelUrls(newUrls)
        novelCounter = 0
        while self.storager.hasNovelUrl():
            newUrl = self.storager.getNewNovelUrl()
            print("craw book %d:%s" % (novelCounter, newUrl))
            htmlDoc = self.downloader.download(newUrl)
            novelChpaterUrls, novelInfo = self.parser.parseNovelHomePage(
                newUrl, htmlDoc)
            self.storager.addNewChapterUrls(novelChpaterUrls)
            self.storager.addNovelInfo(novelInfo)
            chapterCounter = 1
            while self.storager.hasChapterUrl():
                try:
                    newUrl = self.storager.getNewChapterUrl()
                    print("craw chapter %d:%s" % (chapterCounter, newUrl))
                    htmlDoc = self.downloader.download(newUrl)
                    novelChapter = self.parser.parseNovelChapter(
                        newUrl, htmlDoc)
                    self.storager.addNovelChapter(novelChapter)
#                    if chapterCounter>50:
#                        break
                except:
                    print("craw faild")
                    with open("crawfaild.txt", 'a', encoding='utf-8') as f:
                        f.write(newUrl + '\n')
                finally:
                    chapterCounter = chapterCounter + 1
            novelCounter = novelCounter + 1
            novel = self.storager.getNovel()
            self.outputer.output(novel, novelCounter)
            self.storager.clearNovelData()
            if novelCounter > 1:
                break
        self.storager.setOldUrlsToJson()


if __name__ == "__main__":
    rootUrl = []
    rootUrl.append("http://www.biquge.tw/quanben/")
    spider = SpiderMain()
    for i in rootUrl:
        spider.craw(i)
