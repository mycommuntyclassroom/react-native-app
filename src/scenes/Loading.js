import React, { Component } from 'react';
import {
  View
} from 'react-native';

import LoadingSpinner from '../components/LoadingSpinner';

class Loading extends Component {

  render() {
    const { globalStyles } = this.props;

    return (
      <View style={[globalStyles.container, {zIndex: 0} ]}>
        <LoadingSpinner />
      </View>
    );
  };

}

export default Loading;
