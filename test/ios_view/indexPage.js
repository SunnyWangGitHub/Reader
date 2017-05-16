/*
* @Author: SunnyWangGitHub
* @Date:   2017-05-06 13:51:40
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-12 22:57:08
*/

'use strict';

import React, {
  Component,
} from 'react';

import {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS,
} from 'react-native';

import Util from './util';
import Search from './search';
import TWebView from './tWebView';
import DetailsPage from  './detailsPage';




class indexPage extends Component{
	constructor(props){
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			isShow:false,
			dataSource:ds.cloneWithRows([])
		};

	}
	// render(){
	// 	return(
	// 		<View style={style.container}>
	// 			<Search/>
	// 			{
	// 				this.state.isShow?
	// 				<ListView  
	// 			      dataSource={this.state.dataSource}
	// 			      renderRow={(rowData) =>(
	// 			      	<TouchableOpacity  style={style.item} 
	// 			      	onPress={this._showWebPage.bind(this,rowData.book_poster,rowData.book_name)}>
	// 			      		<View>
	// 			      			<Image style={style.img} source={{url:rowData.book_poster}}/>
	// 			      		</View>
	// 			      		<View style={style.test_wraper}>
	// 			      			<Text style={style.title} numberOfLines={1}>{rowData.book_name}</Text>
	// 			      			<Text style={style.author}>{rowData.book_author}</Text>
	// 			      		</View>	
	// 			      	</TouchableOpacity>

	// 			      	)}
	// 			    />
	// 				:null
	// 			}
	// 		</View>
	// 	);
	// }


  	//=================================
	// _showWebPage(url,book_name){
	// 	this.navigator.push({
	// 		component:TWebView,
	// 		title:'book_name',
	// 		passProps:{
	// 			url:url
	// 		}
	// 	});
	// 	alert(url);

	// }

	// //todo:fetch
	// componentDidMount(){
	// 	var that=this;
	// 	Util.get('http://127.0.0.1:3000/',function(data){
	// 		if(data.status===1){
	// 			let books=data.books;
	// 			var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	// 			that.setState({
	// 				isShow:true,	
	// 				dataSource:ds.cloneWithRows(books)
	// 			});
	// 		}else{
	// 			alert('数据调取失败！');
	// 		}

	// 	},function(err){
	// 		alert(err);
	// 	});
	// }
	render() {
	    return (
	      <NavigatorIOS style={{flex:1}} initialRoute={{ component:ListPage,title:'首页'}}/>
	    );
  	}

}
class ListPage extends Component {
	constructor(props){
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			isShow:false,
			dataSource:ds.cloneWithRows([])
		};

	}
	render(){
		return(
			<View style={style.container}>
				<Search/>
				{
					this.state.isShow?
					<ListView  
				      dataSource={this.state.dataSource}
				      renderRow={(rowData) =>(
				      	<TouchableOpacity  style={style.item} 
				      	onPress={this._goToDetailPage.bind(this,rowData.book_name,rowData.book_id)}>
				      		<View>
				      			<Image style={style.img} source={{url:rowData.book_poster}}/>
				      		</View>
				      		<View style={style.test_wraper}>
				      			<Text style={style.title} numberOfLines={1}>{rowData.book_name}</Text>
				      			<Text style={style.author}>{rowData.book_author}</Text>
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
		Util.get('http://123.206.183.239:3002/',function(data){
			if(data.status===1){
				let books=data.books;
				var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
				that.setState({
					isShow:true,	
					dataSource:ds.cloneWithRows(books)
				});
			}else{
				alert('数据调取失败！');
			}

		},function(err){
			alert(err);
		});
	}
	_goToDetailPage(book_name,book_id){
	  this.props.navigator.push({
	    component:DetailsPage,
	    title: book_name,
	    rightButtonTitle: '加入书架',
	    onRightButtonPress: function(){
	        alert('加入书架成功');
	    },
	    passProps:{
	    	book_id:book_id,
	    }

	  });
	}
}


//详情页
class DetailPage extends Component {
  _show(text) {
    alert(text);
  }

  _handleBackButtonPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
              <TouchableOpacity
                 onPress={this._show.bind(this,'React Native')}
                 activeOpacity={0.5}>
                 <Text style={styles.item}>React Native</Text>
               </TouchableOpacity>

               <TouchableOpacity
                 onPress={this._handleBackButtonPress.bind(this)}>
                 <Text style={styles.item}>返回上一级页面</Text>
               </TouchableOpacity>
      </View>
    );
  }
}



var style=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#E0E0E0',
	},
	item:{
		flexDirection:'row',
		height:100,
		borderBottomWidth:1,
		borderBottomColor:'#353533',
		backgroundColor:'#EDEDED',
		borderRadius:10,
		margin:3,
		padding:5
		
	},
	img:{
		height:90,
		width:80,
		borderRadius:3
	},
	test_wraper:{
		marginLeft:10,
		flex:1
	},
	title:{
		fontSize:17,
		paddingTop:25,
		paddingLeft:50,
	},
	author:{
		fontSize:12,
		paddingTop:10,
		paddingLeft:30,
	}


});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:64
  },
  item:
  {
    fontSize:18,
    marginLeft:5,
    color:'#434343'
  },
  flex:{
    flex: 1,
  },
  list_item:{
    lineHeight:25,
    fontSize:16,
    marginLeft:10,
    marginRight:10
  }
});

module.exports=indexPage;