import React, { Component } from 'react'
import { View, TouchableHighlight, Text, Image, StyleSheet, Switch } from 'react-native'
import Header from '../components/Header'
import FooterNav from '../components/FooterNav'
import { Agenda } from 'react-native-calendars'
import AgendaItem from '../components/AgendaItem'
import moment from 'moment'

class Calendar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      items: {},
      sched: {},
      filter: false
    };
  }

  render () {
    const props = this.props;
    const {globalStyles, app} = props;
    const today = moment().format('YYYY-MM-DD');

    return (
      <View style={{backgroundColor: 'white', flex:1}}>
        <Header { ...props } />
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', marginTop:4}}>
          <Text style={{fontFamily: 'AvenirNext-UltraLight', fontSize:16, marginRight:4}}>Show only my Hostings</Text>
          <Switch
            onValueChange={(value) => {this.setState({filter: value, sched:{}}); }}
            value={this.state.filter}
            onTintColor={'#00adf5'}
          />
        </View>

        {this.state.filter && <Agenda
          items={this.state.sched}
          selected={today}
          loadItemsForMonth={this.loadTimesFiltered.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          theme={{
                calendarBackground: 'white',
                textSectionTitleColor: 'white',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: 'white',
                arrowColor: 'orange',
                monthTextColor: 'black',
                textDayFontSize: 14,
                textMonthFontSize: 14,
                textMonthMargin: 140,
                textDayHeaderFontSize: 14
                }}
          style={{}}
        />}
        {!this.state.filter && <Agenda
          items={this.state.sched}
          selected={today}
          loadItemsForMonth={this.loadTimes.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          theme={{
                calendarBackground: 'white',
                textSectionTitleColor: 'white',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: 'white',
                arrowColor: 'orange',
                monthTextColor: 'black',
                textDayFontSize: 14,
                textMonthFontSize: 14,
                textMonthMargin: 140,
                textDayHeaderFontSize: 14
                }}
          style={{}}
        />}
        <FooterNav {...props} />
      </View>
    );
  };

  loadTimes (day) {
    const classroomSchedule = this.props.user.classroomSchedule || {};

    //Necessary because of RNCalendar quirk of requiring date:empty[] pair
    setTimeout(() => {
      let schedule = {};
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!schedule[strTime]) {
          schedule[strTime] = [];
        }
      }

      Object.values(classroomSchedule).forEach(event => {
        for (i = 0; i < event.calendarDates.length; i++) {
          if (!schedule[event.calendarDates[i]])
            schedule[event.calendarDates[i]] = [];
          schedule[event.calendarDates[i]].push({
            title: event.title,
            startTime: event.startTime,
            finishTime: event.finishTime,
            mychildren: event.mychildren,
            students: event.students,
            location: event.location
          })
        }
      });

      this.setState({
        sched: schedule
      });
    }, 1000);
  }

  loadTimesFiltered (day) {
    const classroomSchedule = this.props.user.classroomSchedule || {};

    //Necessary because of RNCalendar quirk of requiring date:empty[] pair
    setTimeout(() => {
      let schedule = {};
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!schedule[strTime]) {
          schedule[strTime] = [];
        }
      }

      Object.values(classroomSchedule).forEach(event => {
         if(event.gid === this.props.user.uid)
          for (i = 0; i < event.calendarDates.length; i++) {
            if (!schedule[event.calendarDates[i]])
              schedule[event.calendarDates[i]] = [];
            schedule[event.calendarDates[i]].push({
              title: event.title,
              startTime: event.startTime,
              finishTime: event.finishTime,
              mychildren: event.mychildren,
              students: event.students,
              location: event.location,
              myEvent: event.gid === this.props.user.uid
            })
          }
      });

      this.setState({
        sched: schedule
      });
    }, 1000);
  }

  renderItem (item) {
    return (
      <View style={[styles.item]}>
        <AgendaItem
          item={item}
        />
      </View>
    );
  }

  renderEmptyDate () {
    return (
      <View style={styles.emptyDate}><Text style={{fontFamily: 'AvenirNext-UltraLight', fontSize:16}}>
        Nothing Scheduled for this date!</Text></View>
    );
  }

  rowHasChanged (r1, r2) {
    return r1.title !== r2.title;
  }

  timeToString (time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

}

export default Calendar;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5
  },
  emptyDate: {
    height: 15,
    flex: 1,
    margin: 5,
    paddingTop: 30,
    justifyContent: 'center'
  }
});
