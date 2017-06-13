import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaPencil } from 'react-icons/lib/fa';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import Link from '../Link';
import style from './style';

class Hero extends Component {
  static PropTypes={
    user: PropTypes.object
  };

  render() {

    const props = this.props
    const { app } = props
    let userData

    // if guardianData is passed in the props, then show guardian data 
    // instead of admin user data
    props.guardianData ? userData = props.guardianData : userData = props.user
    const { profileImage, photoURL, displayName, street, city, state, zipCode } = userData;

    let userImg = profileImage || photoURL;

    // let ImageStyles = {
    //   backgroundImage: `url('${userImg}')`,
    //   backgroundSize: 'cover'
    // };

    return(
      <View style={style.container}>
        <View className="profile-image">
          <View className="main-info">
            <Text style={style.userName}>{ displayName }</Text>
            <View style={style.hr}></View>
            <View className="address"> 
              <Text style={style.address}>{street}, {city}, </Text> 
              <Text style={style.address}>{state}</Text> 
              <Text style={style.address}>{zipCode}</Text>
            </View>
          </View>
        </View>
        { !props.guardianData && 
            <TouchableHighlight onPress={() => app.goToScene('EditGuardian', {app})} className="add-item-button edit-profile-button">
              <Text>FaPencil</Text>
            </TouchableHighlight>
        }
      </View>
    )
  }
}

export default Hero;