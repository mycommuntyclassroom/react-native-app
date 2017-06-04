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
        <Image source={require('../../../images/logo.png')} 
               resizeMode='contain' 
               style={{width: '90%', height: 100}} />
      </View>
    </View>
  )
}

export default PageLoader;