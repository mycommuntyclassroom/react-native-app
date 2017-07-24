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
import Link from "../Link";
import styleVariables from '../../styles/variables'
import style from './style';
// import NotificationsCounter from './NotificationsCounter';
// <NotificationsCounter {...props} />


const FooterNav = (props) => {

  const {app} = props;
  const iconStyles = {width: 100, height: 60, marginBottom: -15, marginTop: -10};
  const browseHostsIconStyles = {width: 80, height: 60, marginBottom: -8, marginTop: -20, position: 'relative', top: -5};

  return (
    <View>
      <LinearGradient
        colors={['white', '#dbdbdb']} 
        style={[style.footerNav]}
      >
        <Link 
          extraStyle={style.footerLink} 
          textStyles={style.footerLinkCopy} 
          onClick={ () => app.goToScene('Dashboard', {app}) }
          iconTop={{url: require('../../../images/home-blue.png'), dimensions: iconStyles }}
          text='HOME' />
        <Link 
          extraStyle={style.footerLink} 
          textStyles={style.footerLinkCopy} 
          onClick={ () => app.goToScene('Calendar', {app}) }
          iconTop={{url: require('../../../images/calander-blue.png'), dimensions: iconStyles }}
          text='CALENDAR' />
        <Link 
          extraStyle={style.footerLink, style.browseHostsLink} 
          textStyles={style.footerLinkCopy} 
          onClick={ () => app.goToScene('BrowseHosts', {app}) }
          iconTop={{url: require('../../../images/globe-blue.png'), dimensions: browseHostsIconStyles }}
          text='BROWSE HOSTS' />
        <Link 
          extraStyle={style.footerLink} 
          textStyles={style.footerLinkCopy} 
          onClick={ () => app.goToScene('Notifications', {app}) }
          iconTop={{url: require('../../../images/bell-blue.png'), dimensions: iconStyles }}
          text='NOTIFICATIONS' />
        <Link 
          extraStyle={style.footerLink}
          textStyles={style.footerLinkCopy} 
          onClick={ () => app.goToScene('Feedback', {app}) }
          iconTop={{url: require('../../../images/feedback-blue.png'), dimensions: iconStyles }}
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

export default FooterNav;
