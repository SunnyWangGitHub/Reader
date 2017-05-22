/*
* @Author: SunnyWangGitHub
* @Date:   2017-05-06 14:02:30
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-21 20:40:10
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
import {PullList} from 'react-native-pull';
import ReadingPage from './readingPage';
class shelfPage extends Component{
	constructor(props){
		super(props);
		// var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		// this.state={
		// 	isShow:false,
		// 	dataSource:ds.cloneWithRows([])
		// };

	}


	render() {
	    return (
	      <NavigatorIOS style={{flex:1}} navigationBarHidden={true} initialRoute={{ component:ListPage,title:'书架'}}/>
	    );
  	}
}

//================================================

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
				{
					this.state.isShow?
					<PullList
					  contentContainerStyle={style.listViewStyle}
					  onPullRelease={this.onPullRelease.bind(this)} 
				      dataSource={this.state.dataSource}
				      renderRow={(rowData) =>(
				      	<TouchableOpacity  
				      	style={style.item} 
				      	onPress={this._goToReadingPage.bind(this,rowData.book_id)}
				      	onLongPress={this.fordeleteRecord.bind(this,rowData.book_id)}
				      	delayLongPress={2000}
				      	>
				      		<View>
				      			<Image style={style.img} source={{url:rowData.book_poster}}/>
				      		</View>
				      		<View style={style.test_wraper}>
				      			<Text style={style.book_name} numberOfLines={1}>{rowData.book_name}</Text>
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
		let book_id=[];
		let books=[];
		let that=this;
        try {
            AsyncStorage.getAllKeys(
                (error,result)=>{
                    if (error){
                        alert('取值失败:'+error);
                    }else{
                    	book_id=result;
                    	if(book_id.length==0){
							var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
							that.setState({
								isShow:true,	
								dataSource:ds.cloneWithRows([])
							});                   		
                    	}


                    	for(var i=0;i<book_id.length;i++){
							Util.get('http://123.206.183.239:3002/shelf?book_id='+book_id[i],function(data){
								if(data.status===1){
									books.push(data.data[0]);
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
                    }
                }
            )
        }catch(error){
            alert('失败'+error);
        }
	}
	_goToReadingPage(book_id){
        try {
            AsyncStorage.getItem(
                book_id.toString(),
                (error,result)=>{
                    if (error){
                        alert('取值失败:'+error);
                    }else{
                    	this.props.navigator.push({
						    component:ReadingPage,
						    passProps:{
						    	book_id:book_id,
						    	chapter_id:parseInt(result),
						    }

						  });
                        
                    }
                }
            )
        }catch(error){
            alert('失败'+error);
        }
	};
    getValue(book_id){
        try {
            AsyncStorage.getItem(
                book_id,
                (error,result)=>{
                    if (error){
                        alert('取值失败:'+error);
                    }else{
                        alert('取值成功:'+result);
                    }
                }
            )
        }catch(error){
            alert('失败'+error);
        }
    };
    onPullRelease(resolve){
    	this.componentDidMount();
	    setTimeout(() => {
	          resolve();
	    }, 1000);
  	}
  	fordeleteRecord(book_id){
  		try {
	        AsyncStorage.removeItem(
	               book_id.toString(),
	               (error)=>{
	                   if(!error){
	                       AlertIOS.alert('删除成功','请下拉刷新页面：）');
	                       this.onPullRelease.bind(this);
	                       
	                   }
	               }
	           )
	       }catch (error){
	           alert('失败',+error);
	       }
  	}





}
//================================================

var style=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#E0E0E0',

	},
	listViewStyle:{
		marginTop:30,
		paddingLeft:15,
		paddingRight:10,
		flexDirection:'row',  
        // 一行显示不下,换一行  
        flexWrap:'wrap',  
        // 侧轴方向  
        alignItems:'center', // 必须设置,否则换行不起作用  
	},
	item:{
		
		width:Util.size.width/3.5,
		height:Util.size.height/4,
		padding:3,
		borderWidth:1,
		borderColor:'#D3D3D3',
		borderRadius:5,
		margin:3,
		
	},
	img:{
		width:100,
		height:130,
		borderRadius:3
	},
	test_wraper:{
		width:100,
		height:30,
		paddingTop:10,

	},
	book_name:{
		textAlign:'center',
		fontSize:15,
	}

});

module.exports=shelfPage;