from lxml import etree


class HtmlParser(object):

    def parseQuanben(self, url, htmlDoc):
        if url is None or htmlDoc is None:
            return None

        docTree = etree.HTML(htmlDoc)
        newUrls = self._getQuanbenUrls(url, docTree)
        return newUrls

    def _getQuanbenUrls(self, url, docTree):
        return docTree.xpath('//div[@id="main"]//li/a/@href')

    def parseNovelHomePage(self, url, htmlDoc):
        if url is None or htmlDoc is None:
            return None

        docTree = etree.HTML(htmlDoc)
        urls = self._getNovelHomePageUrls(url, docTree)
        data = self._getNovelHomePageData(url, docTree)
        return urls, data

    def _getNovelHomePageUrls(self, url, docTree):
        return docTree.xpath('//div[@id="list"]//dd/a/@href')

    def _getNovelHomePageData(self, url, docTree):
        data = {}
        data['name'] = ''
        data['writer'] = ''
        data['coverUrl'] = ''
        result = docTree.xpath('//div[@id="info"]/h1')
        if len(result) > 0:
            data['name'] = data['name'] + result[0].text
        result = docTree.xpath('//div[@id="fmimg"]/img/@src')
        if len(result) > 0:
            data['coverUrl'] = result[0]
        result = docTree.xpath('//div[@id="info"]/p/text()')
        if len(result) > 0:
            data['writer'] = result[0]
        return data

    def parseNovelChapter(self, url, htmlDoc):
        if url is None or htmlDoc is None:
            return None

        docTree = etree.HTML(htmlDoc)
        data = self._getNovelChapterData(url, docTree)
        return data

    def _getNovelChapterData(self, url, docTree):
        chapter = {}
        chapter['title'] = ''
        chapter['body'] = ''
        result = docTree.xpath('//div[@class="bookname"]/h1')
        if len(result) > 0:
            chapter['title'] = result[0].text
        result = docTree.xpath('//div[@id="content"]/text()')
        if len(result) > 0:
            for i in result:
                chapter['body'] = chapter['body'] + i + "</br>"
        return chapter
