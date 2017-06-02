import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Header from '../Header/Header';
import Hero from '../Hero/Hero';
// import FooterNav from '../FooterNav';
// import Summary from '../Summary';
import CirclesTeaser from '../CirclesTeaser/CirclesTeaser';
// import EventTeaser from '../EventTeaser';

class AdminView extends Component {

  componentDidMount() {
    console.log('mounted Dashboard: ADMIN VIEW', this.props);
  }


        // <Summary {...props} />
        // <EventTeaser {...props} />
        // <FooterNav { ...props } />
  render() {
    const props = this.props;
    const { app } = props;
    const { user } = app.props;

    return(
      <View>
        <Header { ...props } />
        <Hero {...props} user={user} />
        <CirclesTeaser circlesData={user.children} circleType="myChildren" title="Children:" path="child" hasAddButton={true} />
      </View>
    )
  }
}

export default AdminView;