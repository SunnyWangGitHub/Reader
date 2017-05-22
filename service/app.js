// 	/*
// * @Author: SunnyWangGitHub
// * @Date:   2017-03-29 22:40:00
// * @Last Modified by:   SunnyWangGitHub
// * @Last Modified time: 2017-05-20 11:24:22
// */

// 'use strict';

// var express=require("express");
// var app=express();
// var fs=require("fs");
// var path = require("path");
// var mongoose=require("mongoose");
// var Book=require('./models/Book.js');
// var Info=require('./models/Info.js');
// var url="mongodb://123.206.183.239/ibooktest3"; 

// mongoose.connect(url);

// var mongodb = require('mongodb')
// var MongoClient = require('mongodb').MongoClient;
// var bodyParser=require("body-parser");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/static",express.static("./views/static"));


// app.set("view engine",'ejs')
// app.set("views","./views");

// //=======================================
// app.get("/homepage",function(req,res){
// 	var User_name=req.query.user_name;
// 	Book.fetch(function(err,books){
// 		if(err){
// 			console.log(err);
// 		}
// 	//for service
// 		return res.send({
// 			status:1,
// 			books:books,
// 		})
// 	//for service
// 	})
// });
// app.get("/",function(req,res){
// 	Book.fetch(function(err,books){
// 		if(err){
// 			console.log(err);
// 		}
// 		return res.send({
// 			status:1,
// 			books:books
// 		})

// 	})
// });
// app.get("/login",function(req,res){
// 		res.render("login.ejs",{
// 		})	
// });

// app.get("/register",function(req,res){
// 		res.render("register.ejs",{
// 		})	
// });

// app.post("/login",function(req,res){

// 	var User_name=req.body.username;
// 	var User_password=req.body.password;
// 	console.log(User_name);
// 	MongoClient.connect(url, function(err, db) {
// 		var info_collection = db.collection('infos');
// 		info_collection.findOne({user_name:User_name,user_password:User_password},function(err,item){
// 				if(item!=null){
// 					return res.redirect('/homepage?user_name='+User_name);
// 				}
// 			});
// 		db.close();
// 	});

// });

// app.post("/register",function(req,res){

// 	var User_name=req.body.username;
// 	var User_password=req.body.password;
// 	MongoClient.connect(url, function(err, db) {
// 		var info_collection = db.collection('infos');
// 		info_collection.insert({user_name:User_name,user_password:User_password,alreadyread:[]});
// 		console.log(User_name);
// 		return res.redirect('/homepage?user_name='+User_name);

// 	});

// });

// //=================================
// app.get("/bookshelf",function(req,res){
// 	var User_name=req.query.user_name;
// 	var Info_User;
// 	// Info.findByUsername(function(err,User_name,infos){
// 	// 	console.log(222);
// 	// 	if(err){
// 	// 		console.log(err);
// 	// 	}
// 	// 	console.log(111);
// 	MongoClient.connect(url, function(err, db) {
// 		var info_collection = db.collection('infos');
// 		info_collection.findOne({user_name:User_name},function(err,item){
// 				if(item!=null){
// 					Info_User=item;
					
// 					res.render("bookshelf.ejs",{
// 						user_name:Info_User.user_name,
// 						alreadyread:Info_User.alreadyread
// 					});
// 				}
// 			});
// 		db.close();
// 	});	
// });

// app.get("/details",function(req,res){
// 	var User_name=req.query.user_name;
// 	var book_id=req.query.book_id;
// 	// Book.findByBook_id(function(err,book_id,book){
// 	// 	if(err){
// 	// 		console.log(err);
// 	// 	}
// 	// });
// 	// console.log(book);
// 	var book_chapter=new Array();
// 	var book;
// 	MongoClient.connect(url, function(err, db) {
// 		var book_collection = db.collection('books');
// 		book_collection.findOne({book_id:parseInt(book_id)},function(err,item){
// 			if(item!=null){book=item;}
// 		});
// 		var collection = db.collection('chapters');
// 		var cursor=collection.find({book_id:parseInt(book_id)});
//     	cursor.each(function(err, item) {
//     		if(err)
//     			throw err;
//     		if(item===null){
//     			db.close();
// 				res.render("details.ejs",{
// 					book_chapter:book_chapter,
// 					book_id:book_id,
// 					book_name:book.book_name,
// 					book_author:book.book_author,
// 					user_name:User_name
// 				});

// 				return ;
// 			}
//     		book_chapter.push(item);
//     		//console.log(book_chapter);
//     	});
// 	});
// });



// // app.get("/details",function(req,res){
// // 	var book_id=req.query.book_id;;
// // 	var book_chapter_name=new Array();
// // 	MongoClient.connect(url, function(err, db) {
// // 		var select=function(callback){
// // 			console.log(book_id);
// // 			var collection = db.collection('chapters_'+book_id);
// // 	 		collection.find(function(err, cursor) {
// // 	    		cursor.each(function(err, item) {
// // 	    			if(item!=null){
// // 	    				book_chapter_name.push(item.chapter_name);
// // 	    				console.log(book_id);
// // 	    			}
// // 	    		});
// // 	    	callback(book_chapter_name);
// // 			});
// // 			
// // 		};
// // 		function callback(data){
// // 			console.log(111);
// // 			console.log(data);
// // 			res.render("details.ejs",{
// // 				book_chapter_name:data
// // 			});

// // 		};

// // 	});
// // });

// app.get("/read",function(req,res){
// 	var Book_id=req.query.book_id;
// 	var Chapter_id=req.query.chapter_id;
// 	var Book_name;
// 	var User_name=req.query.user_name;
// 	MongoClient.connect(url, function(err, db) {
// 		var book_collection=db.collection('books');
// 		book_collection.findOne({book_id:parseInt(Book_id)},function(err,item){
// 			if(item!=null){
// 				Book_name=item.book_name;
// 			}
// 		})
// 		var collection = db.collection('chapters');
// 		var temp_user
// 		var flag=0;
//  		  collection.findOne({book_id:parseInt(Book_id),chapter_id:parseInt(Chapter_id)},function(err, item) {
//     			if(item!=null){

//     				var info_collection = db.collection('infos');
//     				info_collection.findOne({user_name:User_name},function(err,item){
//     					if(item!=null){
//     						temp_user=item;
//     						for(var i=0;i<temp_user.alreadyread.length;i++){
//     							if(temp_user.alreadyread[i].book_id==Book_id){
//     								flag=1;
//     								temp_user.alreadyread[i].chapter_id=Chapter_id;
//     							}
//     						}
//     						if(flag==0){
//     							temp_user.alreadyread.push({ "book_id" : Book_id, "chapter_id" : Chapter_id ,"book_name":Book_name})
//     						}
//     						info_collection.update({"user_name":User_name},{"$set" : {"alreadyread" :temp_user.alreadyread}});
//     					}
//     				});
    
    				

//     				res.render("read.ejs",{
// 						buffer:item.chapter_content,
// 						book_id:Book_id,
// 						chapter_id:Chapter_id,
// 						book_name:Book_name,
// 						user_name:User_name
// 					});
//     			}

//   		});
 		

// 	});

// });

// app.listen(3000);


	/*
* @Author: SunnyWangGitHub
* @Date:   2017-03-29 22:40:00
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-07 22:26:07
*/

'use strict';

var express=require("express");
var app=express();
var fs=require("fs");
var path = require("path");
var mongoose=require("mongoose");
var Book=require('./models/Book.js');
var Info=require('./models/Info.js');
var url="mongodb://123.206.183.239/ibooktest1"; 

mongoose.connect(url);

var mongodb = require('mongodb')
var MongoClient = require('mongodb').MongoClient;
var bodyParser=require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static",express.static("./views/static"));


app.set("view engine",'ejs')
app.set("views","./views");

//=======================================
app.get("/",function(req,res){
	Book.fetch(function(err,books){
		if(err){
			console.log(err);
		}
		return res.send({
			status:1,
			books:books
		})

	})
});


//=================================


app.get("/details",function(req,res){
	var book_id=req.query.book_id;
	var book_chapter=new Array();
	var book;
	MongoClient.connect(url, function(err, db) {
		var collection = db.collection('book_'+book_id);
		collection.find({},{'chapter_id':1,'chapter_name':1}).toArray(function(err,data){
			if(err){
				console.log(err);
			}else{
				res.send({
					status:1,
					data:data,				
				})
			}
		});
	});
});


app.get("/read",function(req,res){
	var Book_id=req.query.book_id;
	var Chapter_id=req.query.chapter_id;
	MongoClient.connect(url, function(err, db) {
	
		var collection = db.collection('book_'+Book_id);
 		collection.findOne({book_id:parseInt(Book_id),chapter_id:parseInt(Chapter_id)},function(err, item) {
    			if(item!=null){
    				return res.render('read.ejs',{
						status:1,
						data:item.chapter_content,				
					});
    			}

  		});
 		

	});

});

//=========================================
app.get("/shelf",function(req,res){
	var Book_id=req.query.book_id;
	MongoClient.connect(url, function(err, db) {
		var collection = db.collection('books');
		collection.find({book_id:parseInt(Book_id)}).toArray(function(err,data){
			if(err){
				console.log(err);
			}else{
				res.send({
					status:1,
					data:data,				
				})
			}
		});
	});
});

app.listen(3001);