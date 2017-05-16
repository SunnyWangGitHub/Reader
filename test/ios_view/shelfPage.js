/*
* @Author: SunnyWangGitHub
* @Date:   2017-05-06 14:02:30
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-06 14:20:59
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

class shelfPage extends Component{
	render(){
		return(
			<View>
				<Text style={style.text}>书架</Text>
			</View>
		);
	}

}

var style=StyleSheet.create({
	text:{
		fontSize:60
	}
});

module.exports=shelfPage;