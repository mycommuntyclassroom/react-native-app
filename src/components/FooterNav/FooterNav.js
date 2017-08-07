import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
  ScrollView
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import NotificationsCounter from '../NotificationsCounter';
import Link from "../Link";
import styleVariables from '../../styles/variables'
import style from './style';
// import NotificationsCounter from './NotificationsCounter';
// <NotificationsCounter {...props} />


class FooterNav extends Component {

  render () {

    const iconStyles = {width: 100, height: 60, marginBottom: -15, marginTop: -10};
    const browseHostsIconStyles = {width: 80, height: 60, marginBottom: -8, marginTop: -20, position: 'relative', top: -5};
    const feedbackIcon = {height: 45, width: 60};
    
    // get the current scene
    const props = this.props;
    const {app} = props;
    const { navigator } = app.refs
    let currentScene = navigator.getCurrentRoutes().pop().scene;

    function checkScene (scene) {
      let chosenIcon;
      currentScene === scene 
        ? chosenIcon = icons[scene][1]
        : chosenIcon = icons[scene][0]
      return chosenIcon;
    }

    const icons = {

      Dashboard: [ require('../../../images/home-blue.png'), require('../../../images/home-purp.png') ],
      Calendar: [ require('../../../images/calander-blue.png'), require('../../../images/calender-purp.png') ],
      BrowseHosts: [ require('../../../images/globe-blue.png'), require('../../../images/globe-purple.png') ],
      Notifications: [ require('../../../images/bell-blue.png'), require('../../../images/bell-purp.png') ],
      Feedback: [ require('../../../images/feedback-blue.png'), require('../../../images/feedback-purp.png') ]

    }

    return (
      <View style={style.container}>
        <LinearGradient
          colors={['white', '#dbdbdb']} 
          style={[style.footerNav]}
        >
          <Link 
            extraStyle={style.footerLink} 
            textStyles={style.footerLinkCopy} 
            onClick={ () => app.goToScene('Dashboard', {app}) }
            iconTop={{url: checkScene('Dashboard'), dimensions: iconStyles }}
            text='HOME' />
          <Link 
            extraStyle={style.footerLink} 
            textStyles={style.footerLinkCopy} 
            onClick={ () => app.goToScene('Calendar', {app}) }
            iconTop={{url: checkScene('Calendar'), dimensions: iconStyles }}
            text='CALENDAR' />
          <Link 
            extraStyle={style.footerLink, style.browseHostsLink} 
            textStyles={style.footerLinkCopy} 
            onClick={ () => app.goToScene('BrowseHosts', {app}) }
            iconTop={{url: checkScene('BrowseHosts'), dimensions: browseHostsIconStyles }}
            text='BROWSE HOSTS' />
          <Link 
            extraStyle={style.footerLink} 
            textStyles={style.footerLinkCopy} 
            onClick={ () => app.goToScene('Notifications', {app}) }
            iconTop={{url: checkScene('Notifications'), dimensions: iconStyles }}
            customElement={<NotificationsCounter {...props} customStyle={style.notificationsBubble} />}
            text='NOTIFICATIONS' />
          <Link 
            extraStyle={style.footerLink}
            textStyles={style.footerLinkCopy} 
            onClick={ () => app.goToScene('Feedback', {app}) }
            iconTop={{url: checkScene('Feedback'), dimensions: feedbackIcon }}
            text='FEEDBACK' />
        </LinearGradient>
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'white']}
          style={style.decoCurve}
          locations={[1, 1]}
        >
        </LinearGradient>
      </View>
    )
  }
}

export default FooterNav;
