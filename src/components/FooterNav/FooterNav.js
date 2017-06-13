import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
  ScrollView
} from 'react-native';

import Link from "../Link";
// import NotificationsCounter from './NotificationsCounter';
// <NotificationsCounter {...props} />


const FooterNav = (props) => {

  const {app} = props;

  return (
    <View className="footer-nav">
      <View className="fixed-container">
        <Link onClick={ () => app.goToScene('Dashboard', {app}) } text='Dashboard' />
        <Link onClick={ () => app.goToScene('Calendar', {app}) } text='Calendar' />
        <Link onClick={ () => app.goToScene('BrowseHosts', {app}) } text='BrowseHosts' />
        <Link onClick={ () => app.goToScene('Notifications', {app}) } text='Notifications' />
        <Link onClick={ () => app.goToScene('Feedback', {app}) } text='Feedback' />
      </View>
    </View>
  )
}

export default FooterNav;
