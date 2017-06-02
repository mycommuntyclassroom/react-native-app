import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import AdminView from '../components/dashboard-views/AdminView';

class Dashboard extends Component {

  componentDidMount() {
    console.log('mounted Dashboard', this.props);
  }

  render() {
    const props = this.props;
    const { app } = props;
    let { status } = props.auth;

    return(
      <View>
        { status === 'ANONYMOUS' && app.goToScene('Welcome', {app}) }
        { status === 'SIGNED_IN' && <AdminView /> }
      </View>
    )
  }
}

export default Dashboard;
