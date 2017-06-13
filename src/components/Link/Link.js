import React from 'react';
import {
  TouchableHighlight,
  Text
} from 'react-native';

import style from '../../styles';

const Link = ({ text, onClick, extraStyle, textStyles }) => (
  <TouchableHighlight style={[style.Link, extraStyle || {}]} onPress={onClick}>
    <Text style={[style.LinkText, textStyles || {}]}>
      {text}
    </Text>
  </TouchableHighlight>
);

Link.propTypes = {
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  extraStyle: React.PropTypes.object
};

export default Link;
