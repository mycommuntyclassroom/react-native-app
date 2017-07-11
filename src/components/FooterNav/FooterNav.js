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
  const iconDimensions = {width: 50, height: 50};

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
          iconTop={{url: require('../../../images/home.png'), dimensions: iconDimensions }}
          text='HOME' />
        <Link 
          extraStyle={style.footerLink} 
          textStyles={style.footerLinkCopy} 
          onClick={ () => app.goToScene('Calendar', {app}) }
          iconTop={{url: require('../../../images/calendar.png'), dimensions: iconDimensions }}
          text='CALENDAR' />

        <View style={style.footerLink, style.browseHostsLink}>
          <Link 
            extraStyle={style.browseHostsButton} 
            textStyles={style.footerLinkCopy} 
            onClick={ () => app.goToScene('BrowseHosts', {app}) }
            iconTop={{url: require('../../../images/globe.png'), dimensions: iconDimensions }}
            text='BROWSE HOSTS' />
        </View>

        <Link 
          extraStyle={style.footerLink} 
          textStyles={style.footerLinkCopy} 
          onClick={ () => app.goToScene('Notifications', {app}) }
          iconTop={{url: require('../../../images/bell.png'), dimensions: iconDimensions }}
          text='NOTIFICATIONS' />
        <Link 
          extraStyle={style.footerLink}
          textStyles={style.footerLinkCopy} 
          onClick={ () => app.goToScene('Feedback', {app}) }
          iconTop={{url: require('../../../images/feedback.png'), dimensions: iconDimensions }}
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
