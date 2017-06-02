import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Header from '../Header/Header';
// import FooterNav from '../FooterNav';
// import Hero from '../Hero';
// import Summary from '../Summary';
// import CirclesTeaser from '../CirclesTeaser';
// import EventTeaser from '../EventTeaser';

class AdminView extends Component {

  componentDidMount() {
    console.log('mounted Dashboard: ADMIN VIEW', this.props);
  }

        // <Hero {...props} />
        // <Summary {...props} />
        // <CirclesTeaser circlesData={user.children} circleType="myChildren" title="Children:" path="child" hasAddButton={true} />
        // <EventTeaser {...props} />
        // <FooterNav { ...props } />
  render() {
    const props = this.props;

    return(
      <View>
        <Header { ...props } />
      </View>
    )
  }
}

export default AdminView;