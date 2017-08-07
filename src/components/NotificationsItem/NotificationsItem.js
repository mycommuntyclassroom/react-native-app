import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView
} from 'react-native';

import Link from '../Link';
import style from './style'

export default function NotificationsItem (props) {
  const { auth, noteProp, note, seenSwitch, friends, app } = props;
  let 
    elements, 
    noteClass,
    noteType = noteProp.noteType || '';

  switch( noteType ) {
    case 'friend':
      elements = 
        <View style={style.actionItems}>
          <View className={style.ctaButtons}>
            <Link style={style.connect} onClick={() => handleInvite(auth, noteProp, 'accept', note)} text='Connect' />
            <Link className={style.delete} onClick={() => handleInvite(auth, noteProp, 'delete', note)} text='Delete' />
          </View>
          <Link className={style.profileView} onClick={ () => app.goToScene('GuardianDetails', {app})} text='Click to view Profile' />
        </View>;
      break;
    default: 
      elements = <View style={style.actionItems}></View>;
      noteClass = 'standard'
  }

  return(
    <View style={style.note} key={`${note}`} id={`${note}`}> 
      <View style={[style.noteInfo, style[noteClass]]}>
        <View style={[style.switch, style[seenSwitch]]}>
          <View style={style.decoCircle} />
        </View>
        <Text>{noteProp.displayName}</Text>
        <View><Text style={style.message}>{noteProp.message}</Text></View>
      </View>
      {elements}
    </View>
  )
}