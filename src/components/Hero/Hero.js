import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaPencil } from 'react-icons/lib/fa';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Link from '../Link';
import style from './style';
import styleVariables from '../../styles/variables'
import { checkRelationship } from '../../helpers/user';
import RequestFriendButton from '../RequestFriendButton';

class Hero extends Component {
  static PropTypes={
    user: PropTypes.object
  };

  render() {

    const props = this.props;
    const { globalStyles, app } = props;
    let userData;
    let friendStatus = false; // default to non-friend until validated

    // if guardianData is passed in the props, then show guardian data 
    // instead of admin user data
    if (props.guardianData) {
      userData = props.guardianData
      friendStatus = checkRelationship('friend', app.props, props.gid);
    } else {
      userData = props.user 
    }

    const { profileImage, photoURL, displayName, street, city, state, zipCode } = userData;

    // handle the output of the required image
    let userImage = profileImage != '../../../images/blank-profile-pic.png'
      ? {uri: profileImage} 
      : require('../../../images/blank-profile-pic.png');

    // handle address output based on permissions (friends/admin only)
    let addressOutput;
    if(friendStatus || props.gid === app.props.auth.uid || !props.guardianData){
      addressOutput = 
        <View style={style.addressContainer}> 
          <Text style={style.address}>{street}, {city}, </Text> 
          <Text style={style.address}>{state}</Text> 
          <Text style={style.address}> {zipCode}</Text>
        </View>
    } else {
      addressOutput =
        <View style={style.addressContainer}> 
          <Text style={style.address}>{city}, {state} </Text>
        </View>
    }
    
    return(
      <View style={style.container}>
        <View className="profile-image">
          <Image 
            source={userImage}
            resizeMode='cover' 
            style={ globalStyles.deviceWidth, {height: 320}} />
          <LinearGradient 
            style={style.mainInfo}
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']} 
          >
            <Text style={style.userName}>{ displayName }</Text>
            <View style={style.hr}></View>
            { addressOutput }
            { props.guardianData && <RequestFriendButton {...props} gid={props.gid} requester={{displayName: app.props.auth.displayName, uid: app.props.auth.uid}} browseHostsStyle={style.requestFriendButton} />}
            { props.gid && <TouchableHighlight onPress={ () => app.goToScene('Chat', {app, gid:props.gid}) }>
              <LinearGradient
                style={[style.chatButton, globalStyles.addItem]}
                colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
              >
                <Image
                  source={require('../../../images/chatone.png')}
                  resizeMode='cover'
                  style={style.chatIcon} />
              </LinearGradient>
            </TouchableHighlight>}
            </LinearGradient>
        </View>
        { !props.guardianData && 
          <LinearGradient
            colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]} 
            style={style.edit}
          >
            <TouchableHighlight onPress={() => app.goToScene('EditGuardian', {app})} className="add-item-button edit-profile-button">
              <Image 
                source={require('../../../images/edit.png')}
                resizeMode='cover' 
                style={{width: 60, height: 60}} />
            </TouchableHighlight>
          </LinearGradient>
        }
        <View style={style.decoClip}></View>
      </View>
    )
  }
}

export default Hero;