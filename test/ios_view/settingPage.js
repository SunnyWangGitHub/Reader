/*
* @Author: SunnyWangGitHub
* @Date:   2017-05-06 14:02:17
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-06 14:20:56
*/

'use strict';

import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class settingPage extends Component{
	render(){
		return(
			<View>
				<Text style={style.text}>设置</Text>
			</View>
		);
	}

}

var style=StyleSheet.create({
	text:{
		fontSize:60
	}
});

module.exports=settingPage;