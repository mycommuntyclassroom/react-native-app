import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text
} from 'react-native';
import PropTypes from 'prop-types';;
import style from './style';

class CheckBox extends Component {
  static PropTypes = {
    checked: PropTypes.bool,
    label: PropTypes.str,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    console.log('the TRUE checkbox was called| props: ', props)

    const checked = props.checked || false;
    console.log('this is the checked: ', checked)


    this.state={
      checked
    };

    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox() {
    console.log('handleCheckbox Called');
    console.log('this.state.checked: ', this.state.checked)
    let checkboxSwitch = !this.state.checked;
    this.setState({checked: checkboxSwitch});
    console.log('checkboxSwitch Value: ', checkboxSwitch)
    this.props.onChange(checkboxSwitch);
  }

  render() {
    const props = this.props;

    return (

      <TouchableHighlight onPress={() => this.handleCheckbox} style={[ style.container, style[this.state.checked]]} >
        <Text>{props.label}</Text>
      </TouchableHighlight>

    )
  }

}

export default CheckBox;
