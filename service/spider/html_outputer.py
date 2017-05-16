import os
from pymongo import MongoClient


class HtmlOutputer(object):

    def __init__(self):
        self.client = MongoClient()

    def output(self, novel, novelCounter):
        self.client['ibooktest']['books'].insert_one({'book_name': novel['name'], 'book_id': novelCounter, 'book_poster': novel['coverUrl'], 'book_author': novel['writer'], 'chapter_id':1})
        #self.client['ibooktest']['books'].find({'book_id': novelCounter})

        counter = 1
        for i in novel['chapter']:
            self.client['ibooktest']['chapters'].insert_one({'book_id': novelCounter, 'chapter_name': i['title'], 'chapter_id': counter, 'chapter_content': i['body']})
            counter = counter + 1

        with open('book_id.txt', 'w', encoding='utf-8') as f:
            f.write(str(novelCounter))

        '''
        folderPath = 'E:\source_code\python\spider_for_novels\\' + \
            str(novel['name']) + '_' + str(novel['writer']) + '\\'
        if not os.path.exists(folderPath):
            os.mkdir(folderPath)

        filePath = folderPath + str(novel['name']) + '.jpg'
        with open(filePath, 'wb') as f:
            f.write(novel['cover'])

        counter = 1

        for i in novel['chapter']:
            #specialSymbol = set("?、\/*\"'><|+=？！。，., ")
            #fileName=i['title']
            #for j in specialSymbol:
            #    fileName = ''.join(fileName.split(j))
            #filePath = folderPath + fileName + '.txt'
            filePath = folderPath + str(counter) + '.txt'

            with open(filePath, 'w', encoding='utf-8') as f:
            	f.write(i['title'])
            	f.write('<\br><\br>')
                f.write(i['body'])
            counter = counter + 1
        '''
