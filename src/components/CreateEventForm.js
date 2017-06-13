import React, { Component } from 'react';
import { addItem } from '../helpers/form';
import { database } from '../helpers/firebase';
import actions from '../redux/actions';
import store from '../redux/store';

import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
  ScrollView
} from 'react-native';

import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from './CheckBox';
import Button from '../components/Button';

const now = moment().hour(0).minute(0);
const nowFormat = now.format('YYYY-MM-DD')
const today = now.format('YYYY-MM-DD');
const priorDay = today.slice(-2) - 1;
const yesterday = `${today.slice(0, 8)}${priorDay}`;
// import BackButton from '../components/BackButton';

class CreateEventForm extends Component {

  constructor(props) {
    super();

    // 
    // STATE OBJECT
    // 
    this.state={};

    // clear the old formData
    AsyncStorage.removeItem('formData');

    const { auth } = props.app.props;

    // pull the formData tree from the DB and grab all of the checkboxes for hostEvents
    database
    .ref('formData/hostEvents')
    .once('value')
    .then((snapshot) => {
      // setup the state properties

      let categories = {
        gid: auth.uid,
        hostName: auth.displayName,
        image: '',
        title: '',
        summary: '',
        seatsAvailable: 0,
        uploadProgress: null,
        recurringDays: [' '],
        frequency: '',
        ageRange: [],
        startDate: '',
        finishDate: ''
      }

      // gather all of the checkbox categories and pass them to the state (categories) object
      const checkBoxCategories = () => {
        for (var category in snapshot.val()) {
          // add a new property to the categories object
          // with the name of each checkbox group name
          categories[category] = []
        }
      }
      checkBoxCategories();

      // store the formData in the state
      this.setState({formData: snapshot.val()})

      // UPDATE THE STATE
      this.setState(categories);

    }) 

    this.radioButtonChange=this.radioButtonChange.bind(this);
    this.checkboxChange=this.checkboxChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
  }

  /**
   *
   * @param e
   */
  handleChange(value, fieldName) {
    let inputObj = {}
    inputObj[fieldName] = value;
    this.setState(inputObj);
  }

  // HANDLE THE SEATS AVAILABLE
  // 
  // 
  handleSeatsAvailable(option) {
    // get the current seats available
    let currentSeats = this.state.seatsAvailable;

    option == 'add'
      ? currentSeats++
      : currentSeats--

    if (currentSeats < 0)  currentSeats = 0;

    this.setState({seatsAvailable: currentSeats});
  }

  checkboxChange(checkbox, checkboxOptions, checked) {
    // current array of options
    const options = this.state[ checkboxOptions ];
    let index;

    // check if the check box is checked or unchecked
    if (checked) {
      // add the value of the checkbox to options array
      options.push(checkbox)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(checkbox)
      options.splice(index, 1)
    }

  }

  radioButtonChange(value, group) {
    // current array of options
    let radioButtonGroup = group
    let radio = value

    const newState = {}
    newState[radioButtonGroup] = radio

    // update the state with the new array of options
    this.setState(newState);

  }

  /**
   *
   * @param e
   */
  submitForm() {
    const props = this.props;
    const { app } = props;
    const newEvent = {...this.state};

    // add a timestamp to the added event
    newEvent.timestamp = (new Date()).getTime();

    // update the store, create a new user object with the updated event in it
    const newUserObject = app.props.user;

    // get the collection of the host's events
    const eventGroup = app.props.user.hostEvents || {};

    // add the new event to the event group
    eventGroup[`${newEvent.title}`] = newEvent;
    newUserObject['hostEvents'] = eventGroup;
    
    // pass the updated object to the store
    store.dispatch(actions.handleHostEvent(newUserObject));

    // update the database
    // 
    // add the event to the guardian host branch - path, data
    addItem(`guardians/${this.state.gid}/hostEvents`, newEvent);
    // add the event to the general hosts tree - path, data
    addItem(`hostEvents/${this.state.gid}`, newEvent);

    // navigate to the dashboard
    app.goToScene('Dashboard', {app})
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const props = this.props
    let formData = this.state.formData || {};

    const outputCheckboxes = () => {
      let checkboxOutput = []
      for (var category in formData) {
        checkboxOutput.push(
          <View key={category}>
            <Text>{category}</Text>
            {formData[category].map(item => {
              return ( 
                <View key={item}>
                  <CheckBox
                    label={item}
                    key={item}
                    onChange={(checked) => this.checkboxChange(item, category, checked) }
                  />
                </View>
              )
            })}
          </View>
        )
      }
      return checkboxOutput
    }

    // set the data structure for the frequency radio buttons group
    const frequency_radio_props = [
      {label: 'none', value: 'none' },
      {label: 'weekly', value: 'weekly' },
      {label: 'monthly', value: 'monthly' }
    ];

    // set the data structure for the recurringDays checkbox group
    const recurringDays_checkbox_props = [
      {label: 'Mon', value: 'M' },
      {label: 'Tue', value: 'T' },
      {label: 'Wed', value: 'W' },
      {label: 'Thu', value: 'Th' },
      {label: 'Fri', value: 'F' },
      {label: 'Sat', value: 'S' },
      {label: 'Sun', value: 'Su' }
    ];
        // <BackButton path="/welcome-search" />

    return(
      <ScrollView>
        <Text> Add an Event! </Text>
        <View style={{paddingBottom: 91}}>

          <TextInput
            style={{width: 200, height: 40}}
            placeholder='Event Title'
            onChangeText={ (value) => this.handleChange(value, 'title') } 
          />

          <TextInput
            style={{width: 200, height: 40}}
            placeholder='Summary of the event'
            onChangeText={ (value) => this.handleChange(value, 'summary') } 
          />

          <View className="seats-available">
            <Text>Seats Available</Text>
            <View>
              <TouchableHighlight className="seat-control" onPress={() => this.handleSeatsAvailable('minus')}> 
                <Text>Minus Icon</Text> 
              </TouchableHighlight>
              <Text>Chair Icon</Text>
              <TouchableHighlight className="seat-control" onPress={() => this.handleSeatsAvailable('add')}> 
                <Text>Plus Icon</Text> 
              </TouchableHighlight>
              <View className="seat-count"><Text>{ this.state.seatsAvailable }</Text></View>
            </View>
          </View>

          <Text>
            Start Date
          </Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.startDate}
            mode="datetime"
            placeholder="Start Date"
            format="MMMM Do YYYY, h:mm a"
            minDate={`${yesterday}`}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            minuteInterval={5}
            showIcon={false}
            onDateChange={(date) => {this.setState({startDate: date});}}
          />

          <Text>
            Finish Date
          </Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.finishDate}
            mode="datetime"
            placeholder="Finish Date"
            format="MMMM Do YYYY, h:mm a"
            minDate={`${yesterday}`}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            minuteInterval={5}
            showIcon={false}
            onDateChange={(date) => {this.setState({finishDate: date});}}
          />

          <Text>Repeats</Text>
          {
            /* custom checkbox output for the event form. This doesn't exist in the formData */
            recurringDays_checkbox_props.map((item) =>{
              let { label, value } = item;
              return (
                <CheckBox
                  label={label}
                  key={label}
                  onChange={(checked) => this.checkboxChange(value, 'recurringDays', checked) }
                />
              )
            })

          }

          <View>
            <Text>frequency</Text>
            <RadioForm
              radio_props={frequency_radio_props}
              initial={0}
              onPress={(value) => { this.radioButtonChange(value, 'frequency') }}
            />
          </View>

          { outputCheckboxes() }

          <Button text='Submit' onPress= { () => this.submitForm() }></Button>
        </View>
      </ScrollView>
    )
  }
}

export default CreateEventForm;
