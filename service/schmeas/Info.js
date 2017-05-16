/*
* @Author: SunnyWangGitHub
* @Date:   2017-04-27 11:56:38
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-04-27 12:19:43
*/

'use strict'

var mongoose=require('mongoose');

var InfoSchema=new mongoose.Schema({
	user_name:String,
	user_password:String,
	alreadyread:[{
		book_id:String,
		chapter_id:String
	}],
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

InfoSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}
	else{
		this.meta.updateAt=Date.now();
	}
	next();
});

InfoSchema.statics={
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findByUsername:function(User_name,cb){
		return this.findOne({user_name:User_name}).sort('meta.updateAt').exec(cb);
	}
};

module.exports=InfoSchema;