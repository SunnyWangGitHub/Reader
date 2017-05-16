/*
* @Author: SunnyWangGitHub
* @Date:   2017-05-12 18:42:07
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-14 22:24:01
*/

'use strict';

import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';

import Util from './util';
import TWebView from './tWebView';
import ReadingPage from './readingPage';

class detailsPage extends Component{
	constructor(props){
		super(props);
		var book_id=this.props.book_id;
		//=============================================================================
		//=============================================================================
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			isShow:false,
			dataSource:ds.cloneWithRows([]),
			book_id:book_id
		};

	}
	render(){
		return(
			<View style={style.container}>
				{
					this.state.isShow?
					<ListView  
				      dataSource={this.state.dataSource}
				      renderRow={(rowData) =>(
				      	<TouchableOpacity  style={style.item} 
				      	 onPress={this._goToDetailPage.bind(this,this.state.book_id,rowData.chapter_id)}
				      	>
				      		<View style={style.chapter_id}>
				      			<Text>{rowData.chapter_id}</Text>
				      		</View>
				      		<View style={style.test_wraper}>
				      			<Text style={style.chapter_name} numberOfLines={1}>{rowData.chapter_name}</Text>
				      		</View>	
				      	</TouchableOpacity>

				      	)}
				    />
					:null
				}
			</View>
		);
	}
	componentDidMount(){
		var that=this;
		var book_id=that.state.book_id;
		Util.get('http://123.206.183.239:3002/details?book_id='+book_id,function(data){
			if(data.status===1){
				let book_chapter=data.data;
				var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
				that.setState({
					isShow:true,	
					dataSource:ds.cloneWithRows(book_chapter)
				});
			}else{
				alert('数据调取失败！');
			}

		},function(err){
			alert(err);
		});
	}
	_goToDetailPage(book_id,chapter_id){
	  this.props.navigator.push({
	    component:ReadingPage,
	    rightButtonTitle: '加入书架',
	    onRightButtonPress: function(){
	        alert('加入书架成功');
	    },
	    passProps:{
	    	book_id:book_id,
	    	chapter_id:chapter_id,
	    }

	  });
	}

}

var style=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#E0E0E0',
		marginTop:60
	},
	item:{
		flexDirection:'row',
		height:40,
		borderBottomWidth:1,
		borderBottomColor:'#353533',
		backgroundColor:'#EDEDED',
		borderRadius:10,
		margin:3,
		padding:5
		
	},
	chapter_id:{
		height:20,
		width:55,
		borderRadius:3,
		paddingLeft:10,
		paddingTop:5
	},
	test_wraper:{
		marginLeft:10,
		flex:1
	},
	chapter_name:{
		fontSize:17,
		paddingTop:5,
		paddingLeft:25,
	},



});

module.exports=detailsPage;


