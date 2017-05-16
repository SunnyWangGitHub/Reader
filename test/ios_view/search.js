/*
* @Author: SunnyWangGitHub
* @Date:   2017-05-07 13:40:24
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-07 14:18:19
*/

'use strict';

import React, {
  Component,
} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import	Util from './util'

class search extends Component{
	render(){
		return(
			<View style={style.container}>
				<TextInput style={style.search_input} placeholder="搜索" placeholderTextColor="#2F2E2D"/>
			</View>
		);
	}

}

var style=StyleSheet.create({
	container:{
		paddingLeft:10,
		paddingRight:10,
		marginTop:20
	},
	text:{
		fontSize:60
	},
	search_input:{
		height:35,
		borderWidth:Util.pixel,
		borderColor:'#A5A5A5',
		paddingLeft:5,
		borderRadius:3
	}
});

module.exports=search;