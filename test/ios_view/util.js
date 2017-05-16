/*
* @Author: SunnyWangGitHub
* @Date:   2017-05-07 10:35:06
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-07 10:46:20
*/

'use strict';
import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio
} from 'react-native';

module.exports={
	size:{
		height:Dimensions.get('window').height,
		width:Dimensions.get('window').width
	},

	pixel: 1/PixelRatio.get(),

	get:function(url,successCallback,failCallback){
		fetch(url)
      	.then((response) => response.json())
      	.then((responseJson) => {
        	successCallback(responseJson);
      	})
      	.catch((error) => {
        	failCallback(error);
      	});
	}
};