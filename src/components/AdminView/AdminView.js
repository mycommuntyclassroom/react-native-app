import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Text
} from 'react-native';

import Header from '../Header';
import Hero from '../Hero';
import Summary from '../Summary';
import CirclesTeaser from '../CirclesTeaser';
import EventTeaser from '../EventTeaser';
import styleVariables from '../../styles/variables';

class AdminView extends Component {

  componentDidMount() {
    console.log('mounted Dashboard: ADMIN VIEW', this.props);
  }

  render() {
    const props = this.props;
    const { app } = props;
    const { user } = app.props;

    return(
      <ScrollView>
        <Header { ...props } />
        <Hero {...props} user={user} />
        <Summary {...props} />
        <CirclesTeaser 
          circlesData={user.children} 
          customStyles={{borderBottomWidth: 1, borderColor: styleVariables.mc2medLightGray}} 
          circleType="myChildren" 
          title="Children:" 
          path="child" 
          hasAddButton={true} {...props} />
        <EventTeaser {...props} />
      </ScrollView>
    )
  }
}

export default AdminView;