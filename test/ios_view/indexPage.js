/*
* @Author: SunnyWangGitHub
* @Date:   2017-05-06 13:51:40
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-21 21:14:33
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
  AsyncStorage,
  AlertIOS,
} from 'react-native';

import Util from './util';
import Search from './search';
import TWebView from './tWebView';
import DetailsPage from  './detailsPage';
import {PullList} from 'react-native-pull';



class indexPage extends Component{
	constructor(props){
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			isShow:false,
			dataSource:ds.cloneWithRows([])
		};

	}
	render() {
	    return (
	      <NavigatorIOS style={{flex:1}} initialRoute={{ component:ListPage,title:'书库'}}/>
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
				<Search style={style.search}/>
				{
					this.state.isShow?
					<PullList
						onPullRelease={this.onPullRelease.bind(this)}  
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
	    //问题：this
	    onRightButtonPress:() =>this.saveDate(book_id,1),
	    passProps:{
	    	book_id:book_id,
	    }

	  });
	}


	saveDate(book_id,chapter_id){
        try {
            AsyncStorage.setItem(
                book_id.toString(),
                chapter_id.toString(),
                (error)=>{
                    if (error){
                        alert('书签保存失败:',error);
                    }else{
                        AlertIOS.alert('成功加入书架：）');
                    }
                }
            );
        } catch (error){
            alert('失败'+error);
        }
	}
	onPullRelease(resolve){
    	this.componentDidMount();
	    setTimeout(() => {
	          resolve();
	    }, 1000);
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
	search:{
		height:40,
		backgroundColor:'#000000',
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