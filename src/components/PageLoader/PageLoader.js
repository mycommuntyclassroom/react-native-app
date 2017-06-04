import React from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

const PageLoader = () => {
  return(
    <View className="page-loader">
      <View className="mc2-logo-container">
        <img className="mc2-logo" src="/logo.png"
          alt="MC2 Logo" />
        <Image source={require('../../../images/logo.png')} 
               resizeMode='contain' 
               style={{width: '90%', height: 100}} />
      </View>
    </View>
  )
}

export default PageLoader;