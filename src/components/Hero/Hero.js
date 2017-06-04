import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaPencil } from 'react-icons/lib/fa';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import Link from '../Link/Link';

class Hero extends Component {
  static PropTypes={
    user: PropTypes.object
  };

  render() {

    const props = this.props
    const { app } = props
    console.log('THIS IS THE HERO APP: ', app);
    let userData

    console.log('props.user: ', props.user);
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
      <View className="hero">
        <View className="profile-image">
          <View className="main-info">
            <Text>{ displayName }</Text>
            <View className="address"> 
              <Text>{street}, {city}, </Text> 
              <Text className="caps">{state}</Text> 
              <Text>{zipCode}</Text>
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