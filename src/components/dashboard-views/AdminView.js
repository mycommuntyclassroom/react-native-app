import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Header from '../Header';
import Hero from '../Hero';
import Summary from '../Summary';
import CirclesTeaser from '../CirclesTeaser';
import EventTeaser from '../EventTeaser';
// import FooterNav from '../FooterNav';

class AdminView extends Component {

  componentDidMount() {
    console.log('mounted Dashboard: ADMIN VIEW', this.props);
  }

        // <FooterNav { ...props } />
  render() {
    const props = this.props;
    const { app } = props;
    const { user } = app.props;

    return(
      <View>
        <Header { ...props } />
        <Hero {...props} user={user} />
        <Summary {...props} />
        <CirclesTeaser circlesData={user.children} circleType="myChildren" title="Children:" path="child" hasAddButton={true} {...props} />
        <EventTeaser {...props} />
      </View>
    )
  }
}

export default AdminView;