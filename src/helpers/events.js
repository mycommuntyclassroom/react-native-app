import React, {Component} from 'react';
import { database } from './firebase';

import RequestFriendButton from '../components/RequestFriendButton';
import actions from '../redux/actions';
import store from '../redux/store';


// GET ALL CLASSROOM EVENTS
// 
// grab all of the hosted class events
// and set a watch for data changes to the tree
// on any change to the data, trigger an update the store
// 
export function getHostEvents () {
  // grab all of the user's notifications and store them in the Redux store
  database
  .ref('hostEvents')
  .on('value', snapshot => {
    store.dispatch(actions.setHostEvents(snapshot.val()));
  })
}


// generate teaser based on the data passed to this function
function generateTeasers() {
  for (let teaser in teaserData) {
    const { gid, title, image, date, startTime, finishTime } = teaserData[teaser];

          // <Image source={require(image)} resizeMode='contain' />

    // handle the output of the image
    let eventImage = image != '../../../images/blank-profile-pic.png'
      ? {uri: image} 
      : require('../../../images/blank-profile-pic.png');

    teaserElement =
      <View style={style.teaserElement} key={teaser}>
        <TouchableHighlight className="event-image" onPress={ () => app.goToScene('EventDetails') }>
          <Image 
            source={eventImage} 
            resizeMode='cover' 
            style={style.teaserImage} />
        </TouchableHighlight>
        <View style={style.addEventContainer}>
          <LinearGradient
            colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]} 
            style={[globalStyles.addItem, style.editItem]}
          >
            <Link textStyles={style.addCopy} onClick={ () => app.goToScene('EditEvent', {app, eventId: teaser}) } text='edit' />
          </LinearGradient>
          {
           !props.guardianData &&
            <LinearGradient
              colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]} 
              style={[globalStyles.addItem, style.addItem]}
            >
              <Link textStyles={style.addCopy} onClick={ () => app.goToScene('CreateEvent') } text='+' />
            </LinearGradient>
          }
        </View>
        <View style={style.eventView}>
          <Text style={style.eventTitle}>{title}</Text>
          <View style={style.eventTags}>
            { 
              teaserData[teaser].ageRange.map((item) => {
                return (
                  <View className="tag-item" key={`${teaser}${item}`}>
                    <Text style={style.tagItemCopy}>{item}</Text>
                  </View>
                )
              })
            }
          </View>
          <View style={style.eventDays}>
            {
              // develop the view for recurring days ex: M/W/F
              // if there are no recurring days, show the date of the event
              teaserData[teaser].recurringDays.map((item, index) => {
                let daysArray = teaserData[teaser].recurringDays;

                if(daysArray.length === 1 && item === ' ') {
                  let stringDate = teaserData[teaser].startDate.split(' ').slice(0,3).join(' ')
                  return <View key={`${teaser}${item}`}><Text style={style.eventDay}>{stringDate}</Text></View>
                }
                else if(index === 0 || index === 1) {
                  return <View key={`${teaser}${item}`}><Text style={style.eventDay}>{item}</Text></View>
                } else {
                  return <View key={`${teaser}${item}`}><Text style={style.eventDay}>/{item}</Text></View>
                }
              })
            }
          </View>
          <View className="time"><Text>{startTime} - {finishTime}</Text></View>
        </View>
      </View>
    teaserOutput.push(teaserElement);
  }

  // if teaserOutput is empty after the array, fill it with an empty string value
  // this is to prevent the react-slick slider from throwing an undefined error
  teaserOutput = teaserOutput == [] ? [' '] : teaserOutput;
}

// CHILD DROP-OFF
// 
// 
export function childDropOff (data, props) {

  const { gId } = props.params

  // set the new data on the students tree
  database.ref(`hostEvents/${gId}/${props.currentEventIndex}/students`)
          .set(data);

  let timestamp = (new Date()).getTime();

  let studentObj = {
    message: 'A child has been scheduled for your class!',
    seen: true,
    timestamp
  }

  // send the confirmation to the host's notifications tree
  database.ref(`guardians/${gId}/notifications`)
          .push(studentObj);
}