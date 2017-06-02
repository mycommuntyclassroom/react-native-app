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
    let userData
    // if guardianData is passed in the props, then show guardian data 
    // instead of admin user data
    props.guardianData ? userData = props.guardianData : userData = props.user
    const { profileImage, photoURL, displayName, street, city, state, zipCode } = userData;

    let userImg = profileImage || photoURL;

    let ImageStyles = {
      backgroundImage: `url('${userImg}')`,
      backgroundSize: 'cover'
    };

    return(
      <View className="hero">
        <View className="profile-image" style={ ImageStyles }>
          <Text className="main-info">
            <Text>{ displayName }</Text>
            <Text className="address"> {street}, {city}, <View className="caps">{state}</View> {zipCode}</Text>
          </Text>
        </View>
        { !props.guardianData && 
            <TouchableHighlight onPress={() => app.goToScene('editProfile', {app})} className="add-item-button edit-profile-button">
              <FaPencil/>
            </TouchableHighlight>
        }
      </View>
    )
  }
}

export default Hero;