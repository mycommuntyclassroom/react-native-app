import React from 'react';
import {
  TouchableHighlight,
  Text
} from 'react-native';

import style from '../../style';

const Link = ({ text, onClick, extraStyle }) => (
  <TouchableHighlight style={[style.Link, extraStyle || {}]} onClick={onClick}>
    <Text style={style.LinkText}>
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
