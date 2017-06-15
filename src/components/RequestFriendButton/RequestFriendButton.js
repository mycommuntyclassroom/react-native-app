import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import Link from '../Link'
import LinearGradient from 'react-native-linear-gradient';
import { requestFriend, checkRelationship, handleInvite } from '../../helpers/user';
import styleVariables from '../../styles/variables'

class RequestFriendButton extends Component {


  constructor(props) {
    super(props)

    this.state = {
      pending: ''
    }

  }

  render() {

    const handlePending = () => {
      this.setState({pending: 'pending'})
    }

    const props = this.props
    const { app, browseHostsStyle, globalStyles } = props
    const { requester } = app.props;

    let buttonOutput = ''
          // <View className="connect" onClick={() => handleInvite(userObj, noteProp, 'accept', note)}>Connect</View>

    // check if the users are already friends
    if (checkRelationship('friend', props, props.gid)){
      buttonOutput = <Text></Text>;
    } 
    else if (checkRelationship('incoming', props, props.gid)) {
      buttonOutput = 
        <View className="cta-buttons">
          <Link className="connect" onClick={() => handleInvite(app.props.auth, requester, 'accept')} text='Connect' />
        </View>
    }
    else {
      buttonOutput = 
        <LinearGradient
          style={[browseHostsStyle, globalStyles.addItem]}
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']} 
          colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]} 
          onClick={ () => requestFriend(props, props.gid, handlePending) } 
          className={`add-item-button friend-request ${this.state.pending} ${checkRelationship('pending', props, props.gid)}`}
        >
          <View style={{}}>
            <Text> + </Text>
          </View>
        </LinearGradient>;
    }

    return(
      <View className="connection-button">
        {buttonOutput}
      </View>
    )
  }
}

export default RequestFriendButton;