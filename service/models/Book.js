/*
* @Author: SunnyWangGitHub
* @Date:   2017-04-09 20:06:14
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-04-09 20:27:48
*/

'use strict';

var mongoose=require('mongoose');
var BookSchema=require('../schmeas/Book');

var Book=mongoose.model('Book',BookSchema);

module.exports=Book;