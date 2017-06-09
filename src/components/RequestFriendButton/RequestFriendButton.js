import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

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
    const { requester } = props;

    console.log('RequestFriendButton CALLED, this is the requester: ', requester);
    let buttonOutput = ''
          // <View className="connect" onClick={() => handleInvite(userObj, noteProp, 'accept', note)}>Connect</View>

    // check the relationship of the users are the same
    if (checkRelationship('friend', props, props.gid)){
      console.log('FRIEND ENTERED::::((()')
      buttonOutput = '';
    } 
    else if (checkRelationship('incoming', props, props.gid)) {
      console.log('THIS is the props.gid: ', props.gid)
      buttonOutput = 
        <View className="cta-buttons">
          <View className="connect" onClick={() => handleInvite(props.auth, requester, 'accept')}>Connect</View>
        </View>
      console.log('IS iS incoming!!!*!***: ');
    }
    else {
      buttonOutput = 
        <View onClick={ () => requestFriend(props, props.gid, handlePending) } 
             className={`add-item-button friend-request ${this.state.pending} ${checkRelationship('pending', props, props.gid)}`}>
          <View className="icon"><MdPersonAdd/></View>
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