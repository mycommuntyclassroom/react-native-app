import React, { Component } from 'react';
import {
  ScrollView,
  TouchableHighlight,
  Text
} from 'react-native';

import { getGuardianData } from '../../helpers/user'
import Header from '../Header';
import FooterNav from '../FooterNav';
import Hero from '../Hero';
import Summary from '../Summary';
import CirclesTeaser from '../CirclesTeaser';
import EventTeaser from '../EventTeaser';

class GuardianView extends Component {

  constructor(props) {
    super(props);

    this.state={
      gid: props.gid
    }

    console.log('GuardianView constructor was called: ', props)
    const gid = this.state.gid;

    // GET THE GUARDIAN'S DATA
    // 
    // retrive the guardian data per the id passed
    // 
    getGuardianData(gid, (callbackData) => {
      console.log('callbackData: ', callbackData)
      let newState = Object.assign(this.state, callbackData)
      this.setState(newState);
    });
  }

  render() { 
    console.log('Render was called HERE IS THE STATE: ', this.state);
    const props = this.props;
    const { app } = props;
    const { auth, user, signOut } = app.props

    return(
      <ScrollView className="guardian-view">
        <Hero guardianData={this.state} />
        <Summary guardianData={this.state} />
        <CirclesTeaser guardianData={this.state} circlesData={this.state.children || [' ']} title="Children" path="child" />
        <EventTeaser guardianData={this.state} />
      </ScrollView>
    )
  }
}

export default GuardianView;