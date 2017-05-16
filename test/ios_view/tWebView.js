/*
* @Author: SunnyWangGitHub
* @Date:   2017-05-08 11:32:40
* @Last Modified by:   SunnyWangGitHub
* @Last Modified time: 2017-05-12 16:38:23
*/

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
  } from 'react-native';

class TWebView extends Component{
  constructor(props){
    super(props);
    this.state = {
      url: this.props.url,
   
      isShowErrorPage: false,

    };
  }
  render(){
    let url = {uri: this.state.url};
    //if(this.state.isNearBy){
    //  url = require('./../html/nearby.html');
    //}
    //if(this.state.isWeather){
    //  url = require('./../html/weather.html');
    //}
    return(
      <View style={styles.container}>
        {
          this.state.isShowErrorPage?
            <View style={styles.textView}>
              <Text style={styles.text}>不好意思,请检查网络连接情况或者报告错误</Text>
            </View>
            :
            <WebView
              style={[styles.container,{marginTop: this.state.isMargin || -20}]}
              startInLoadingState={true}
              onError={this._loadError.bind(this)}
              source={url}>
            </WebView>
        }
      </View>
    );
  }

  _loadError(){
    this.setState({
      isShowErrorPage: true
    });
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text:{
    fontSize:16,
    fontWeight:'300'
  },
  textView:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center'
  }
});

module.exports = TWebView;