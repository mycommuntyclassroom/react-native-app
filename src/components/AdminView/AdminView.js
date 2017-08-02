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
import FooterNav from '../FooterNav';

import style from './style';

class AdminView extends Component {

  render() {
    const props = this.props;
    const { app } = props;
    const { user } = app.props;

    return(
      <View style={style.container}>
        <ScrollView>
          <Header { ...props } />
          <Hero {...props} user={user} />
          <Summary {...props} />
          <CirclesTeaser 
            circlesData={user.children} 
            customStyles={{borderBottomWidth: 1, borderColor: styleVariables.mc2medLightGray}} 
            circleType="myChildren" 
            title="Children:"
            gid={app.props.auth.uid}
            path="child" 
            hasAddButton={true} {...props} />
          <EventTeaser {...props} />
        </ScrollView>
        <FooterNav {...props} />
      </View>
    )
  }
}

export default AdminView;