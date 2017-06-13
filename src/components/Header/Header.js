import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import BackButton from '../BackButton';
import Nav from '../Nav';
import Invite from '../Invite';
import Link from '../Link';
import style from './style';
import globalStyles from '../../styles';

class Header extends Component {
  static PropTypes={
    editMode: PropTypes.bool
  };

  constructor(props) {
    super();


    this.state={
      navOpen: false,
      inviteOpen: false
    };

    this.handleInvite = this.handleInvite.bind(this);
  }

  /**
   *
   * @param e
   */

  handleInvite(e) {
    e.preventDefault();
    this.setState({
      inviteOpen: !this.state.inviteOpen
    })
  }

  /**
   *
   * @returns {XML}
   */
  render() {

    const props = this.props;
    const { app } = props;

    const renderInvite = () => (
      <View className = "invite-holder" onClick={ this.handleInvite } >
        <Invite { ...this.props } handleInvite={ (e) => this.handleInvite(e) } />
      </View>
    );

    let headerLinks;

    // determine if the user is editing/viewing a profile, and output the appropriate view
    if(props.editMode) {
      headerLinks =
        <View>
          <Link onClick={ () => app.goToScene('Dashboard', {app}) } text='Cancel' />
        </View>
    } else {
      headerLinks =
        <View>
          <Link onClick={ this.handleInvite } text='Invite' />
          <Link text='Donate' />
        </View>
    }

    let headerNav;

    // handle outputting the back button vs the nav button
    if(props.backOption) {
      headerNav = <BackButton {...props} />
    } else {
      headerNav =
        <TouchableHighlight onPress={() => app.refs.navMenu.open()}>
          <Image source={require('../../../images/logo.png')} resizeMode='contain' style={{ width: 50, height: 50}}/>
        </TouchableHighlight>
    }

    return (
      <View style={style.container}>
        <View style={style.baseHeader}>
          <View className="base-logo hamburger">
            { headerNav }
          </View>
          <View className="invite-links">
            { headerLinks }
          </View>
          <View className="ad-box">
            {/** empty block for now **/}
          </View>
        </View>
        { this.state.inviteOpen ? renderInvite() : false }
      </View>
    )
  }

}

export default Header;
