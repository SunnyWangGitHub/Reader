/*
* @Author: SunnyWangGitHub
* @Date:   2017-04-09 19:54:11
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-04-16 20:53:00
*/

'use strict';

var mongoose=require('mongoose');

var BookSchema=new mongoose.Schema({
	book_name:String,
	book_id:String,
	chapter_id:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});

BookSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}
	else{
		this.meta.updateAt=Date.now();
	}
	next();
});

BookSchema.statics={
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findByBook_id:function(Book_id,cb){
		return this.findOne({_id:Book_id}).sort('meta.updateAt').exec(cb);
	}
};

module.exports=BookSchema;




