import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';

import style from '../../styles';

const Link = ({ text, onClick, extraStyle, textStyles, iconTop }) => (
  <TouchableHighlight style={[style.Link, extraStyle || {}]} onPress={onClick}>
    <View>
      { 
        iconTop &&
        <Image 
          source={iconTop.url}
          resizeMode='cover' 
          style={iconTop.dimensions} />
      }
      <Text style={[style.LinkText, textStyles || {}]}>
        {text}
      </Text>
    </View>
  </TouchableHighlight>
);

Link.propTypes = {
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  extraStyle: React.PropTypes.object
};

export default Link;
