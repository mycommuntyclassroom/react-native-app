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
import styleVariables from '../../styles/variables';
import style from './style';

class RequestFriendButton extends Component {


  constructor(props) {
    super(props)

    this.state = {
      pending: false
    }

  }

  render() {

    const handlePending = () => {
      this.setState({pending: true}) // 1 for true; is pending (also used for array pointing)
    }

    const props = this.props;
    const { app, browseHostsStyle, globalStyles, requester } = props;

    let buttonOutput = ''
          // <View className="connect" onClick={() => handleInvite(userObj, noteProp, 'accept', note)}>Connect</View>

    // check if the users are already friends
    if (checkRelationship('friend', props, props.gid)){
      buttonOutput = <Text></Text>;
    } 
    // check if they have an incoming friend request
    else if (checkRelationship('incoming', props, props.gid)) {
      buttonOutput =
        <LinearGradient
          style={[browseHostsStyle, style.connect]}
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']} 
          colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
        >
          <Link textStyles={style.connectText} onClick={() => handleInvite(app.props.auth, requester, 'accept')} text='Connect' />
        </LinearGradient>
    }
    else {
      // default to outputting the request friend icon
      let requestFriendIcon;
      let gradientColor;

      if (this.state.pending) {
        requestFriendIcon = require('../../../images/blank-profile-pic.png')
        gradientColor = ['gray', 'gray'];
      } else {
        requestFriendIcon = require('../../../images/friend-request.png')
        gradientColor = [styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]
      }


      buttonOutput = 
      <TouchableHighlight onPress={ () => requestFriend(props, props.gid, handlePending) }>
        <LinearGradient
          style={[browseHostsStyle, globalStyles.addItem]}
          colors={gradientColor}
        >
          <Image 
            source={requestFriendIcon} 
            resizeMode='cover' 
            style={style.requestFriendIcon} />
        </LinearGradient>
      </TouchableHighlight>
    }

    return(
      <View className="connection-button">
        {buttonOutput}
      </View>
    )
  }
}

export default RequestFriendButton;