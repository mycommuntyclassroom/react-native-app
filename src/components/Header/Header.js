import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import { deleteEvent } from '../../helpers/events';

import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import BackButton from '../BackButton';
import Nav from '../Nav';
import Invite from '../Invite';
import Link from '../Link';
import style from './style';
import globalStyles from '../../styles';
import styleVariables from '../../styles/variables'

class Header extends Component {
  static PropTypes={
    editMode: PropTypes.bool
  };

  constructor(props) {
    super();

    this.state={
      navOpen: false,
    };
  }


  toggleNav() {

    const props = this.props;
    const { app } = props;
    
    this.setState({navOpen: !this.state.navOpen})

    this.state.navOpen 
      ? app.refs.navMenu.close() 
      : app.refs.navMenu.open()
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const props = this.props;
    const { app } = props;

    let headerLinks;
    let headerColor;
    let deleteOption;

    // check if the delete option is turned on
    if(props.deleteOption) {
      deleteOption = 
        <Link   
          onClick={ () => deleteEvent(props) }
          textStyles={{color: 'white', fontWeight: '500' }}
          extraStyle={{ backgroundColor: 'red', padding: 7, marginRight: 70, marginLeft:15 }}
          text='Delete Event' />
    }

    // determine if the user is editing or viewing a profile, and output the appropriate view
    if(props.editMode) {
      headerLinks =
        <View style={style.linksContainer}>
          { deleteOption }
          <Link 
            onClick={ () => app.goToScene('Dashboard', {app}) }
            textStyles={{color: 'white', fontWeight: '500', marginRight: 15 }}
            text='Cancel' />
        </View>

      headerColor=[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]

    } else {
      headerLinks =
        <View style={style.linkView}>
          <Link onClick={ () => app.goToScene('Invite', {app}) } text='Invite' textStyles={style.link} />
        </View>

      headerColor=[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]
    }

    let headerNav;

    // handle output of the back button vs the nav button
    if(props.backOption) {
      headerNav = <BackButton {...props} />
    } else {
      headerNav =
        <TouchableHighlight onPress={() => this.toggleNav()}>
          <Image source={require('../../../images/logo.png')} resizeMode='contain' style={{ width: 50, height: 50}}/>
        </TouchableHighlight>
    }

    return (
      <LinearGradient 
        start={{x: 1, y: 1}} end={{x: 0, y: 1}}
        colors={headerColor} 
        style={style.linearGradient}
      >
        <View style={style.baseHeader}>
          <View style={style.menuIcon}>
            { headerNav }
          </View>
          { headerLinks }
          <View className="ad-box">
            {/** empty block for now **/}
          </View>
        </View>
      </LinearGradient>
    )
  }

}

export default Header;
