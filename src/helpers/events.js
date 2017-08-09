import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import { database } from './firebase';
import actions from '../redux/actions';
import store from '../redux/store';
import { checkRelationship } from './user';
import { dayConversions } from './data'

import Link from '../components/Link';
import RequestFriendButton from '../components/RequestFriendButton';
import EventStyles from '../components/BrowseHostsOutput/style';
import styleVariables from '../styles/variables';
import { deviceDimensions } from '../styles';

const { deviceWidth, deviceHeight } = deviceDimensions;


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


// BROWSE HOSTS TEASERS
// 
// generate event teasers based on the data passed to this function
// 
export function generateTeasers(eventData, props, handleEventIndex, toggleSeatBooking) {

  const { app } = props;

  // this array stores the template elements ex: the event post
  let hostEventsOutput = [];
  let teaserOutput = [];
  let teaserElement;
  let isFriend = checkRelationship('friend', props, props.gid);

  function slideChange (index) {
    return handleEventIndex(index)
  }

  // loop through each guardian group of events
  for (let teaserGroup in eventData) {
    teaserOutput = [];

    // set vars at this scope to be used in the hostEventsOutput
    let eventHostName;

    // iterate through each host event within the current group
    for (let teaser in eventData[teaserGroup]) {
      
      let teaserData = eventData[teaserGroup][teaser];
      const { hostName, title, image, startTime, finishTime } = teaserData;

      // set the gid for the scope above
      gid = teaserData.gid
      const ageRange = teaserData.ageRange || [];
      eventHostName = hostName;

      // handle the output of the image
      let eventImage = image != '../../images/blank-profile-pic.png'
        ? {uri: image} 
        : require('../../images/blank-profile-pic.png');

      teaserElement =
        <View style={EventStyles.teaserContainer} id={teaser} key={teaser}>
          <Image 
            source={eventImage} 
            resizeMode='cover' 
            style={EventStyles.teaserImage} />
          <LinearGradient 
            style={EventStyles.eventView}
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']} 
          >
            <Text style={EventStyles.title}>{title}</Text>
            <View style={EventStyles.tags}>
              { 
                ageRange.map((item) => {
                  return (
                    <View style={EventStyles.bulletAndTagItem} key={`${teaser}${item}`}>
                      <View style={EventStyles.bullet} />
                      <Text style={EventStyles.tagItem}>{item}</Text>
                    </View>
                  )
                })
              }
            </View>
            { 
              (toggleSeatBooking && isFriend) &&
              <LinearGradient 
                colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
                style={EventStyles.childDropOff}> 
                <TouchableHighlight onPress={ () => toggleSeatBooking() }>
                  <Image
                    source={require('../../images/drop-off-color.png')}
                    resizeMode='cover' 
                    style={{width: 37, height: 37}} />
                </TouchableHighlight>
              </LinearGradient>
            }
            <RequestFriendButton 
              {...props} 
              gid={gid} 
              requester={{displayName: hostName, uid: gid}} 
              browseHostsStyle={EventStyles.requestFriendButton} 
            />
            <View style={EventStyles.dayAndTime}>
              <View style={EventStyles.days}>
                {
                  teaserData.recurringDays.map((item, index) => {
                    // conditionals for handling the various output for the recurring days
                    let daysArray = teaserData.recurringDays;
                    if(daysArray.length === 1 && item === ' '){
                      let stringDate = teaserData.startDate.split(' ').slice(0,3).join(' ')
                      return <Text style={EventStyles.dayText} key={`${teaser}${item}`}>{stringDate}</Text>
                    }
                    else if(index === 0 || index === 1) {
                      return <Text style={EventStyles.dayText} key={`${teaser}${item}`}>{item}</Text>
                    } else{
                      return <Text style={EventStyles.dayText} key={`${teaser}${item}`}>/{item}</Text>
                    }
                  })
                }
              </View>
              <View style={EventStyles.time}><Text style={EventStyles.timeText}>{startTime} - {finishTime}</Text></View>
            </View>
          </LinearGradient>
        </View>
      teaserOutput.push(teaserElement);
    }
    hostEventsOutput.push(
      <View className="event-container" key={`${teaserGroup}`}>
        <Link 
          onClick={() => app.goToScene('GuardianDetails', {app, gid})} 
          extraStyle={EventStyles.hostName}
          textStyles={EventStyles.hostNameText}
          text={eventHostName} /> 
        <Carousel
          className="host-events"
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={deviceWidth - 40} // make the sliderWidth and itemWidth equivalent to make it left align
          itemWidth={deviceWidth - 40} // subtract 40 for item's left and right padding
          onSnapToItem={(slideIndex) => { slideChange(slideIndex) }}
        >
          {teaserOutput}
        </Carousel>
      </View>
    )
  }
  // if hostEventsOutput is empty after the array, fill it with an empty string value
  // this is to prevent the react-slick slider from throwing an undefined error
  hostEventsOutput = hostEventsOutput === [] ? [' '] : hostEventsOutput;

  return hostEventsOutput;
}

// GENERATE CALENDAR DATES
// 
// convert date ranges to individual calendar dates
// this is based on a start date and finsh date.
// the individual dates are determined by the 
// 
export function generateCalendarDates(formattedStartDate, formattedFinishDate, recurringDays, frequency) {
  let dateFormatCollection = {};
  dateFormatCollection[formattedStartDate] = [];
  dateFormatCollection[formattedFinishDate] = [];
  const startDateTimeStamp = moment(formattedStartDate).format('X');
  const finishDateTimeStamp = moment(formattedFinishDate).format('X');

  console.log('startDateTimeStamp: ', startDateTimeStamp);
  console.log('finishDateTimeStamp: ', finishDateTimeStamp);

  console.log('recurringDays: ', recurringDays)
  console.log('recurringDays.length: ', recurringDays.length)
  // if the frequency is none ('') or there are no recurring days then skip this function and return the startDate
  if (!formattedStartDate || !formattedFinishDate || frequency === '' || recurringDays.length === 0 )
    {console.log('none for freq or rec days');  return formattedStartDate; }

  // get the startingDay by converting the formattedStartDate to a day
  const startingDay = moment(formattedStartDate, 'YYYY-MM-DD').format("dddd");
  console.log('startingDay: ', startingDay)

  let numberOfDays;
  // set numerical value for the days between the frequency options
  switch(frequency) {
    case 'monthly':
      numberOfDays = 30;
      break;
    case 'weekly':
      numberOfDays = 7;
      break;
    default:
      // no function
  }

  // check if the startingDay matches any of the recurringDays
  const startsOnRecurringDay = recurringDays.indexOf(dayConversions[startingDay].label) !== -1 ? true : false;
  
  console.log('startsOnRecurringDay: ', startsOnRecurringDay);
  console.log('recurringDays: ', recurringDays)
  console.log('recurringDays[0]: ', recurringDays[0])
  console.log('dayConversions: ', dayConversions)
  console.log('dayConversions[recurringDays[0]]: ', dayConversions[recurringDays[0]])
  // if the startingDay matches a recurringDay, check if there are any additional recurring days in the list
  // let additionalRecurringDays;
  // startsOnRecurringDay &&

  // if the startingDay does NOT match a recurringDay, assign the starting day to initialStartingDate and determine
  // the distance between the initialStartingDate and the nearest recurring day
  let firstRecurringDayObj;
  // let firstRecurringDayCalendar;
  let firstRecurringDayFormat;
  let firstRecurringDayString;
  console.log('formattedStartDate: ', formattedStartDate)
  if (!startsOnRecurringDay) {
    firstRecurringDayObj = 
      moment(formattedStartDate)
      .add(dayConversions[recurringDays[0]].value - dayConversions[startingDay].value, 'days')

      console.log('dayConversions[recurringDays[0]].value: ', dayConversions[recurringDays[0]].value);
      console.log('dayConversions[startingDay].value: ', dayConversions[startingDay].value)

    // firstRecurringDayCalendar = firstRecurringDayObj.calendar();
    firstRecurringDayFormat = firstRecurringDayObj.format('YYYY-MM-DD');

  //   console.log('firstRecurringDayFormat: ', firstRecurringDayFormat)
  //   console.log('firstRecurringDayCalendar: ', firstRecurringDayCalendar)

  //   // firstRecurringDayString = firstRecurringDayCalendar.slice(0, firstRecurringDayCalendar.indexOf(' '));
  //   firstRecurringDayString = moment(firstRecurringDayCalendar, 'YYYY-MM-DD').format("dddd");
  //   // if the firstRecurringDayString value is 'Tomorrow' convert it to a literal day
  //   if (firstRecurringDayString === 'Tomorrow') {
  //     const dayConversionsList = Object.keys(dayConversions);
  //     const tomorrowValue = dayConversions[startingDay].value;
  //     firstRecurringDayString = dayConversionsList[tomorrowValue];
  //     console.log('dayConversionsList: ', dayConversionsList)
  //     console.log('tomorrowValue: ', tomorrowValue);
  //     console.log('firstRecurringDayString: ', firstRecurringDayString);
  //   }

  }

  // let dateGroup = {};
  // dateGroup[firstRecurringDayString] = firstRecurringDayFormat;
  let dateGroup = [];
  dateGroup.push(formattedStartDate);
  dateGroup.push(firstRecurringDayFormat);

  // now remove the first recurring day from the RecurringDays list
  recurringDays.splice(0, 1);

  console.log('dateGroup: ', dateGroup)
  console.log('recurringDays after splice: ', recurringDays)

  // populate the dateGroup with the string date and the date format 
  // of the recurring days remaning in the recurringDays list
  if (recurringDays.length > 0) {
    recurringDays.map((currentDay, i) => {
      console.log('recurringDays MAP')
      console.log('---------------------------')
      console.log('recurringDays: ', recurringDays)
      console.log('recurringDays[0]: ', recurringDays[0])
      console.log('dayConversions[recurringDays[i]]: ', dayConversions[recurringDays[i]].value);
      console.log('dayConversions[startingDay].value: ', dayConversions[startingDay].value)
      console.log('firstRecurringDayFormat: ', firstRecurringDayFormat)
      recurringDayObj = 
        moment(formattedStartDate)
        .add(dayConversions[recurringDays[i]].value - dayConversions[startingDay].value, 'days')

      recurringDayCalendar = recurringDayObj.calendar();
      recurringDayFormat = recurringDayObj.format('YYYY-MM-DD');
      recurringDayString = moment(recurringDayFormat, 'YYYY-MM-DD').format("dddd");
      // recurringDayString = recurringDayCalendar.slice(0, recurringDayCalendar.indexOf(' '));

      console.log('recurringDayString: ', recurringDayString)
      // dateGroup[recurringDayString] = recurringDayFormat;
      dateGroup.push(recurringDayFormat)
      console.log('recurringDayObj: ', recurringDayObj);
      console.log('recurringDayCalendar: ', recurringDayCalendar);
      console.log('recurringDayFormat: ', recurringDayFormat)

    })
  }
  console.log('dateGroup: ', dateGroup);
}

// CHILD DROP-OFF
// 
// When a parent enrolls one or more of their children in a class
// send a notification to the reciepient host and add the host event details to 
// the classroomSchedule within the requester's data tree and the requester's 
// child(ren) data tree
// 
export function childDropOff (students, props) {
  const { gid, currentEventId, selectedEventDetails, auth } = props

  // add the updated group of children to the students tree
  database.ref(`hostEvents/${gid}/${currentEventId}/students`)
          .set(students);
  
  // record the timestamp for the date the student was added
  let timestamp = (new Date()).getTime();

  // grab the user's children from the collection of students
  // and store them in the mychildren branch
  const studentList = Object.keys(students)

  const mychildren = studentList.map(child => {
    return students[child].gid === auth.uid && students[child]
  })

  // add the mychildren group to the selectedEventDetails object
  selectedEventDetails['mychildren'] = mychildren;

  // send the selectedEventDetails to the classroomSchedule table
  // in the the root of the guardian branch and the children branch
  database.ref(`guardians/${auth.uid}/classroomSchedule/${currentEventId}`)
          .set(selectedEventDetails);

  // send the selectedEventDetails to each of the children's branches
  mychildren.map(child => {
    database.ref(`guardians/${auth.uid}/children/${child.childId}/classroomSchedule/${currentEventId}`)
            .set(selectedEventDetails);
  })

  // build the notification message
  let studentObj = {
    message: 'A child has been scheduled for your class!',
    seen: true,
    timestamp
  }

  // send the confirmation to the host's notifications tree
  database.ref(`guardians/${gid}/notifications`)
          .push(studentObj);
}