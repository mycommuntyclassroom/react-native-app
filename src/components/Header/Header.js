import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import BackButton from '../BackButton/BackButton';
import Nav from '../Nav';
import Invite from '../Invite';
import Link from '../Link';

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

    this.handleMenu = this.handleMenu.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
  }

  /**
   *
   * @param e
   */
  handleMenu(e) {
    e.preventDefault();
    this.setState({
      navOpen: !this.state.navOpen
    })
  }

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

    const renderNav=() => (
      <View className="nav-holder">
        <Nav menu={ this.handleMenu } />
      </View>
    );

    const renderInvite = () => (
      <View className = "invite-holder" onClick={ this.handleInvite } >
        <Invite { ...this.props } handleInvite={ (e) => this.handleInvite(e) } />
      </View>
    );

    let headerLinks;

    // determine if the user is editing/viewing a profile, output the appropriate view
    if(props.editMode) {
      headerLinks =
        <View>
          <Link onClick={ () => app.goToScene('Welcome', {app}) } text='Cancel' />
        </View>
    } else {
      headerLinks =
        <View>
          <Link onClick={ this.handleInvite } text='Invite' />
          <Link txt='Donate' />
        </View>
    }

    let headerNav;

    // handle outputting the back button vs the nav button
    if(props.backOption) {
      headerNav = <BackButton />
    } else {
      headerNav =
        <TouchableHighlight onClick={ this.handleMenu }>
          <Image source={require('../../logo.png')} resizeMode='contain' style={{ width: 50 }}/>
        </TouchableHighlight>
    }

    return (
      <View className="wrap">
        <View className="base-header">
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
        { this.state.navOpen ? renderNav() : false }
        { this.state.inviteOpen ? renderInvite() : false }
      </View>
    )
  }

}

export default Header;
