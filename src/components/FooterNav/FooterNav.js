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

  return (
    <View style={style.container}>
      <LinearGradient
        colors={['white', '#dbdbdb']} 
        style={[style.footerNav]}
      >
        <Link extraStyle={style.footerLink} textStyles={style.footerLinkCopy} onClick={ () => app.goToScene('Dashboard', {app}) } text='HOME' />
        <Link extraStyle={style.footerLink} textStyles={style.footerLinkCopy} onClick={ () => app.goToScene('Calendar', {app}) } text='CALENDAR' />
        <View style={style.footerLink, style.browseHostsLink}>
          <Link extraStyle={style.browseHostsButton} textStyles={style.footerLinkCopy} onClick={ () => app.goToScene('BrowseHosts', {app}) } text='BROWSE HOSTS' />
        </View>
        <Link extraStyle={style.footerLink} textStyles={style.footerLinkCopy} onClick={ () => app.goToScene('Notifications', {app}) } text='NOTIFICATIONS' />
        <Link extraStyle={style.footerLink} textStyles={style.footerLinkCopy} onClick={ () => app.goToScene('Feedback', {app}) } text='FEEDBACK' />
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
