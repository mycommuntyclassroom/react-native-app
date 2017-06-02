import React from 'react';
import {
  TouchableHighlight,
  Text
} from 'react-native';

import style from '../styles';

const Button = ({ text, onPress, extraStyle }) => (
  <TouchableHighlight style={[style.Button, extraStyle || {}]} onPress={onPress}>
    <Text style={style.ButtonText}>
      {text}
    </Text>
  </TouchableHighlight>
);

Button.propTypes = {
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func,
  extraStyle: React.PropTypes.object
};

export default Button;
