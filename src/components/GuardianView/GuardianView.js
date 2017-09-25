import React, { Component } from 'react';
import {
  ScrollView,
  TouchableHighlight,
  View,
  Text
} from 'react-native';

import { getGuardianData } from '../../helpers/user'
import Header from '../Header';
import FooterNav from '../FooterNav';
import Hero from '../Hero';
import Summary from '../Summary';
import CirclesTeaser from '../CirclesTeaser';
import EventTeaser from '../EventTeaser';

import style from './style';

class GuardianView extends Component {

  constructor(props) {
    super(props);

    this.state={
      gid: props.gid
    }

    const gid = this.state.gid;

    // GET THE GUARDIAN'S DATA
    // 
    // retrive the guardian data per the id passed
    // 
    getGuardianData(gid, (callbackData) => {
      let newState = Object.assign(this.state, callbackData)
      this.setState(newState);
    });
  }

  render() { 
    const props = this.props;
    const { app } = props;
    const { auth, user, signOut } = app.props

    return(
      <View style={style.container}>
        <ScrollView>
          <Hero {...props} guardianData={this.state} />
          <Summary {...props} guardianData={this.state} />
          <CirclesTeaser {...props} guardianData={this.state} circlesData={this.state.children || [' ']} title="Children" path="child" />
          <EventTeaser {...props} guardianData={this.state} />
        </ScrollView>
      </View>
    )
  }
}

export default GuardianView;