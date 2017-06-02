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
// import CirclesTeaser from '../CirclesTeaser';
// import EventTeaser from '../EventTeaser';

class AdminView extends Component {

  componentDidMount() {
    console.log('mounted Dashboard: ADMIN VIEW', this.props);
  }


        // <Summary {...props} />
        // <CirclesTeaser circlesData={user.children} circleType="myChildren" title="Children:" path="child" hasAddButton={true} />
        // <EventTeaser {...props} />
        // <FooterNav { ...props } />
  render() {
    const props = this.props;
    const { app } = props;

    return(
      <View>
        <Header { ...props } />
        <Hero {...props} user={app.props.user} />
      </View>
    )
  }
}

export default AdminView;