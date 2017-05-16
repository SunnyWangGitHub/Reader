/*
* @Author: SunnyWangGitHub
* @Date:   2017-04-27 12:06:20
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-04-27 12:06:59
*/

'use strict';

var mongoose=require('mongoose');
var InfoSchema=require('../schmeas/Info');

var Info=mongoose.model('Info',InfoSchema);

module.exports=Info;