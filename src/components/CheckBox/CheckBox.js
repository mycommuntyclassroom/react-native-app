import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  Image,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

class CheckBox extends Component {
  static PropTypes = {
    checked: PropTypes.bool,
    label: PropTypes.str,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    const checked = props.checked || false;

    this.state={
      checked
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox() {
    let checkboxSwitch = !this.state.checked;
    this.setState({checked: checkboxSwitch});
    this.props.onChange(checkboxSwitch);
  }

  render() {
    const props = this.props;
    const imageSrc = props.imageSrc

    return (
      <TouchableHighlight onPress={this.handleCheckbox} style={[ style.container, style[this.state.checked]]} >
        <View>
          { imageSrc && <Image source={imageSrc} style={ props.imageStyles || {width: 60, height: 60} } /> }
          <Text style={style.text}>{props.label}</Text>
        </View>
      </TouchableHighlight>
    )
  }

}

export default CheckBox;
