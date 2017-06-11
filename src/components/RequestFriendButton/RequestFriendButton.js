import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import Link from '../Link'
import { requestFriend, checkRelationship, handleInvite } from '../../helpers/user';

class RequestFriendButton extends Component {


  constructor(props) {
    super(props)

    console.log('props passed into the RequestFriendButton: ', props)
    this.state = {
      pending: ''
    }

  }

  render() {

    const handlePending = () => {
      this.setState({pending: 'pending'})
    }

    const props = this.props
    const { app } = props
    const { requester } = app.props;

    console.log('RequestFriendButton CALLED, this is the requester: ', requester);
    let buttonOutput = ''
          // <View className="connect" onClick={() => handleInvite(userObj, noteProp, 'accept', note)}>Connect</View>

    // check the relationship of the users are the same
    if (checkRelationship('friend', props, props.gid)){
      console.log('FRIEND ENTERED::::((()')
      buttonOutput = <Text></Text>;
    } 
    else if (checkRelationship('incoming', props, props.gid)) {
      console.log('THIS is the props.gid: ', props.gid)
      buttonOutput = 
        <View className="cta-buttons">
          <Link className="connect" onClick={() => handleInvite(app.props.auth, requester, 'accept')} text='Connect' />
        </View>
      console.log('IS iS incoming!!!*!***: ');
    }
    else {
      buttonOutput = 
        <View onClick={ () => requestFriend(props, props.gid, handlePending) } 
             className={`add-item-button friend-request ${this.state.pending} ${checkRelationship('pending', props, props.gid)}`}>
          <View className="icon"><Text> MdPersonAdd </Text></View>
        </View>;
    }

    return(
      <View className="connection-button">
        {buttonOutput}
      </View>
    )
  }
}

export default RequestFriendButton;