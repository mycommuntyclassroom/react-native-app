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
      pending: false,
      connected: false
    }

  }

  render() {

    const handlePending = () => {
      this.setState({pending: true}) // 1 for true; is pending (also used for array pointing)
    }

    const connectTrigger = () => {
      this.setState({connected: true})
    }

    const props = this.props;
    const { app, browseHostsStyle, globalStyles, requester } = props;
    const userData = app.props.user;
    let incomingRequestNoteId = checkRelationship('incoming', props, props.gid);

    let buttonOutput;

    // if the users are already friends don't output a button
    if (checkRelationship('friend', props, props.gid)){
      buttonOutput = <Text></Text>;
    } 
    // if they have an incoming friend request, output a connect option
    else if (incomingRequestNoteId) {
      console.log('incomingRequestNoteId: ', incomingRequestNoteId)
      buttonOutput =
        <LinearGradient
          style={[browseHostsStyle, style.connect]}
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']} 
          colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
        >
          <Link 
            textStyles={style.connectText} 
            onClick={() => handleInvite(app.props.auth, requester, 'accept', incomingRequestNoteId, connectTrigger)} 
            text='Connect' 
          />
        </LinearGradient>
    }
    // if they have a pending friend request, output a null friend request icon
    else if (this.state.pending || checkRelationship('pending', props, props.gid)) {
      buttonOutput = 
      <TouchableHighlight>
        <LinearGradient
          style={[browseHostsStyle, globalStyles.addItem]}
          colors={['gray', 'gray']}
        >
          <Image 
            source={require('../../../images/friend-request-greyed-out.png')} 
            resizeMode='cover' 
            style={style.requestFriendIcon} />
        </LinearGradient>
      </TouchableHighlight>

    }
    else {
      // default to outputting the request friend icon
      buttonOutput = 
      <TouchableHighlight onPress={ () => requestFriend(props, props.gid, handlePending) }>
        <LinearGradient
          style={[browseHostsStyle, globalStyles.addItem]}
          colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
        >
          <Image 
            source={require('../../../images/friend-request.png')} 
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