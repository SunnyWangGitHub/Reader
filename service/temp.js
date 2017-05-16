/*
* @Author: SunnyWangGitHub
* @Date:   2017-05-13 20:38:31
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-13 20:38:43
*/

'use strict';

<!-- 	<div id="panel">
		<button><a href="/">返回主页面</a></button>
		<button><a href="/details?user_name=<%=user_name%>&book_id=<%=book_id%>">返回目录</a></button>
		<button onclick="perChapter()">上一章</button>
		<button onclick="nextChapter()">下一章</button>
	</div> -->


		// var str=localStorage.books
	// var arr
	// if(str==null){
	// 	arr=[]
	// }else{
	// 	arr=JSON.parse(str)
	// }
	// var book={
	// 	b_id:<%=book_id%>,
	// 	c_id:<%=chapter_id%>,
	// 	book_name:"<%=book_name%>"
	// }
	// var flag=0
	// for(var i=0;i<arr.length;i++){
	// 	if(arr[i].b_id==book.b_id){
	// 		flag=1;
	// 		arr[i].c_id=book.c_id
	// 	}
	// }
	// if(flag==0){
	// 	arr.push(book)
	// }
	// str=JSON.stringify(arr)
	// localStorage.books=str;