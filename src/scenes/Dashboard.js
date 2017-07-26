import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import AdminView from '../components/AdminView';

class Dashboard extends Component {

  render() {
    const props = this.props;
    const { app } = props;
    let { status } = props.auth;

    return(
      <View>
        { status === 'ANONYMOUS' && app.goToScene('Welcome', {app}) }
        <AdminView {...props} />
      </View>
    )
  }
}

export default Dashboard;
