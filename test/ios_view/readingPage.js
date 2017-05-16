/*
* @Author: SunnyWangGitHub
* @Date:   2017-05-06 14:01:19
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-15 17:03:26
*/

'use strict';

import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Util from './util';
import TWebView from './tWebView';


class readingPage extends Component{
	constructor(props){
		super(props);
		var book_id=this.props.book_id;
		var chapter_id=this.props.chapter_id;
		//=============================================================================
		//=============================================================================
		this.state={
			isShow:false,
			book_id:book_id,
			chapter_id:chapter_id,
			chapter_content:'',
		};

	}
	render(){
		return(
			<View style={style.container}>
			{
				this.state.isShow?
				<View style={style.container}>
					<ScrollView style={style.scroll}>
						<Text style={style.content}>{this.state.chapter_content}</Text>
						<View style={style.panel}>
							<TouchableOpacity style={style.pre} onPress={this.prePage.bind(this,this.state.book_id,this.state.chapter_id)}>
								<Text>上一章</Text>
							</TouchableOpacity>
							<TouchableOpacity style={style.list} onPress={this.listPage.bind(this,this.state.book_id,this.state.chapter_id)}>
								<Text>目录</Text>
							</TouchableOpacity>
							<TouchableOpacity style={style.next} onPress={this.nextPage.bind(this,this.state.book_id,this.state.chapter_id)}>
								<Text>下一章</Text>
							</TouchableOpacity>						
						</View>
					</ScrollView>
					</View>
				:null
			}
			</View>
		);
	}
	componentDidMount(){
		var that=this;
		var book_id=that.state.book_id;
		var chapter_id=that.state.chapter_id;
		Util.get('http://123.206.183.239:3002/read?book_id='+book_id+'&chapter_id='+chapter_id,function(data){
			if(data.status===1){
				let book_chapter=data.data;
				that.setState({
					isShow:true,
					chapter_content:book_chapter.chapter_content.replace(/<br \/>/g,'\n'),	
				});
			}else{
				alert('数据调取失败！');
			}

		},function(err){
			alert(err);
		});
	}

	//===============================
	nextPage(book_id,chapter_id){
		chapter_id=chapter_id+1;
		var that=this;
		Util.get('http://123.206.183.239:3002/read?book_id='+book_id+'&chapter_id='+chapter_id,function(data){
			if(data.status===1){
				var book_chapter=data.data;	
				var chapter_content=book_chapter.chapter_content.replace(/<br \/>/g,'\n');
				that.setState({
					book_id:book_id,
					chapter_id:chapter_id,
					chapter_content:chapter_content,			
				});	
			}else{
				alert('数据调取失败！');
			}
		},function(err){
			alert(err);
		});
		this._scrollView.scrollTo(0, 0);		
	}

	prePage(book_id,chapter_id){
		chapter_id=chapter_id-1;
		var that=this;
		Util.get('http://123.206.183.239:3002/read?book_id='+book_id+'&chapter_id='+chapter_id,function(data){
			if(data.status===1){
				var book_chapter=data.data;	
				var chapter_content=book_chapter.chapter_content.replace(/<br \/>/g,'\n');
				that.setState({
					book_id:book_id,
					chapter_id:chapter_id,
					chapter_content:chapter_content,			
				});	
			}else{
				alert('数据调取失败！');
			}
		},function(err){
			alert(err);
		});		
	}

	listPage(book_id,chapter_id){
		this.props.navigator.pop();	
	}

}





var style=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#FFF8DC',
		marginTop:25,
	},
	scroll:{
		flex:1,
	},
	content:{
		flex:1,
		marginTop:3,
		marginBottom:5,
		marginLeft:5,
		marginRight:5,
		padding:2,
		fontSize:15,
		borderRadius:3,
	},
	panel:{		
		flexDirection:'row',
		width:85,
		marginBottom:5,
		marginBottom:80,

	},
	pre:{
		marginLeft:40,
		width:80,
		height:30,
		paddingLeft:15,
		paddingRight:15,
		paddingTop:5,
		borderRadius:10,
		backgroundColor:'#9999CC',
		opacity:0.7,
	},
	list:{
		marginLeft:20,
		width:80,
		height:30,
		paddingLeft:25,
		paddingRight:15,
		paddingTop:5,
		borderRadius:10,
		backgroundColor:'#9999CC',
		opacity:0.7,
	},
	next:{
		marginLeft:20,
		paddingRight:40,
		width:80,
		height:30,
		paddingLeft:15,
		paddingRight:15,
		paddingTop:5,
		borderRadius:10,
		backgroundColor:'#9999CC',
		opacity:0.7,
	},

});

module.exports=readingPage;