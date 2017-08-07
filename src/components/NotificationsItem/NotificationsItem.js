import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView
} from 'react-native';

import { handleInvite } from '../../helpers/user'

import Link from '../Link';
import style from './style'

export default function NotificationsItem (props) {
  const { auth, noteProp, note, seenSwitch, friends, app } = props;

  console.log('NotificationsItem props: ', props)
  const { gid } = noteProp;

  let 
    options, 
    noteClass,
    noteType = noteProp.noteType || '';

  switch( noteType ) {
    case 'friend':
      options = 
        <View style={style.actionItems}>
          <View style={style.ctaButtons}>
            <Link 
              extraStyle={[style.connectDelete, style.connect]}
              textStyles={style.connectDeleteText}
              onClick={() => handleInvite(auth, noteProp, 'accept', note)} 
              text='Connect' />
            <Link 
              extraStyle={[style.connectDelete, style.delete]}
              textStyles={style.connectDeleteText}
              onClick={() => handleInvite(auth, noteProp, 'delete', note)} 
              text='Delete >' />
          </View>
          <Link 
            textStyles={style.profileView} 
            onClick={ () => app.goToScene('GuardianDetails', {props, gid}) } 
            text='Click to view Profile' />
        </View>;
      break;
    default: 
      options = <View style={style.actionItems}></View>;
      noteClass = 'standard';
  }

  return(
    <View style={style.note} key={`${note}`} id={`${note}`}> 
      <View style={[style.noteInfo, style[noteClass]]}>
        <View style={[style.switch, style[seenSwitch]]}>
          <View style={style.decoCircle} />
        </View>
        {
          noteProp.displayName &&
            <Text style={style.displayName}>{noteProp.displayName} </Text>
        }
        <View><Text style={style.message}>{noteProp.message}</Text></View>
      </View>
      {options}
    </View>
  )
}