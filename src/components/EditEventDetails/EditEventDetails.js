import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  Image
} from 'react-native';

import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import CheckBox from '../CheckBox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Button from '../Button';

import { updateProfile } from '../../helpers/form';
import { storage, database } from '../../helpers/firebase';
import PageLoader from '../PageLoader';
import actions from '../../redux/actions';
import store from '../../redux/store';

// time/date values
const now = moment().hour(0).minute(0);
const nowFormat = now.format('YYYY-MM-DD')
const today = now.format('YYYY-MM-DD');
const priorDay = today.slice(-2) - 1;
const yesterday = `${today.slice(0, 8)}${priorDay}`;

class EditGuardianAccount extends Component {

  constructor(props) {
    super(props);

    console.log('EditGuardianAccount CALLED!!!')

    const { eventId } = props;
    const { app } = props;

    // event details
    let hostEvents = app.props.user.hostEvents[eventId];

    const { 
            gid, title, summary, image, hostName, seatsAvailable,
            ageRange, startDate, finishDate, recurringDays, frequency 
          } = hostEvents || null;

    // build the state object with the key values in the props
    let newStateObject = {
      gid,
      title,
      summary,
      hostName,
      startDate,
      finishDate,
      recurringDays,
      frequency,
      image,
      seatsAvailable,
      recurringDays,
      ageRange,
      uploadProgress: null
    }

    // update the state after the render
    this.state = newStateObject;

    console.log('this is the newStateObject: ', newStateObject)

    // pull the formData tree and grab all of the checkboxes for the guardians
    // and save it in the state
    database
    .ref('formData/hostEvents')
    .once('value')
    .then((snapshot) => {
      // store the formData in the state
      console.log('*!*!*!*!* firebase call returned *!*!*!*!')
      this.setState({formData: snapshot.val()});

      let formData = snapshot.val() || {};

    })
    // bind functions
    this.handleSeatsAvailable=this.handleSeatsAvailable.bind(this);
    this.radioButtonChange=this.radioButtonChange.bind(this);
    this.checkboxChange=this.checkboxChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
  }

  handleFileUpload(event) {
    // const file = event.target.files[0];
    // const uploadTask = this.storageRef.child(file.name)
    //                                   .put(file, { contentType: file.type });

    // uploadTask.on('state_changed', (snapshot) => {
    //   const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   this.setState({ uploadProgress });
    // });

    // uploadTask.then((snapshot) => {
    //   this.userRef.update({
    //     image: snapshot.downloadURL
    //   });
    //   this.setState({ 
    //     uploadProgress: null,
    //     image: snapshot.downloadURL
    //   });
    // });
  }

  /**
   *
   * @param e
   */
  handleChange(value, fieldName) {
    console.log('handleChange CALLED| value and fieldName', `${value} | ${fieldName}`)
    let inputObj = {}
    inputObj[fieldName] = value;
    this.setState(inputObj);
  }

  checkboxChange(checkbox, checkboxOptions, checked) {
    // current array of options
    const options = this.state[checkboxOptions];
    let index;

    // check if the check box is checked or unchecked
    if (checked) {
      // add the numerical value of the checkbox to options array
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

  /**
   *
   * @param e
   */

  submitForm() {
    console.log('*!*!*!*!*!*!submitForm CALLED');
    const props = this.props;
    const { eventId, app } = props;
    const eventData = {...this.state};

    // set a timestamp for last updated
    eventData.lastUpdated = (new Date()).getTime();

    // update the store's event contents with the newly added event
    app.props.user.hostEvents[eventId] = eventData;

    // update the database
    // 
    // update the event in the guardian host branch - path, data
    updateProfile(`guardians/${this.state.gid}/hostEvents/${eventId}`, eventData);
    // update the event in the general hosts tree - path, data
    updateProfile(`hostEvents/${this.state.gid}/${eventId}`, eventData);

    // navigate to the dashboard
    app.goToScene('Dashboard', {app})
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    console.log('Reached the Edit event RENDER, state: ', this.state)
    const props = this.props;
    const { app } = props

    // state values for the event
    const { 
      title, uploadProgress, gid, image, recurringDays, 
      frequency, startDate, finishDate, ageRange, summary
    } = this.state;

    // grab the form data set within the state
    let formData = this.state.formData || {};

    const outputCheckboxes = () => {
      console.log('outputCheckboxes Called ');
      // skip this function if the state doesn't have basic info
      if (gid === null) { return }
      let checkboxOutput = [];
      for (var category in formData) {
        checkboxOutput.push(
          <View key={category}>
            <Text>{category}</Text>
            {formData[category].map(item => {
              var checkbox = '';
              // pre-check any items that were selected and saved
              if (this.state[`${category}`].indexOf(item) > -1) {
                checkbox = 
                  <CheckBox
                    label={item}
                    checked={true}
                    key={`${item}${category}`}
                    onChange={(checked) => this.checkboxChange(item, category, checked) }
                  />;
              } else {
                checkbox = 
                  <CheckBox
                    label={item}
                    key={`${item}${category}`}
                    onChange={(checked) => this.checkboxChange(item, category, checked) }
                  />;
              }

              return checkbox;
              console.log('returned checkbox: ', checkbox);
            })}
          </View>
        )
      }
      return checkboxOutput
      console.log('checkboxOutput AFTER: ', checkboxOutput);
    }

    // set the data structure for the frequency radio buttons group
    const frequency_radio_props = [
      {label: 'none', value: 'none' },
      {label: 'weekly', value: 'weekly' },
      {label: 'monthly', value: 'monthly' }
    ];

    // get the index of the frequency
    let frequencySelected;
    frequency_radio_props.map((option, i) => {
      // if there's a match, return the index of the matching item
      if (this.state.frequency === option.value) {
        frequencySelected = i;
      }
    })

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

    // handle the output of the required image
    let eventImage = image != '../../../images/blank-profile-pic.png'
      ? {uri: image} 
      : require('../../../images/blank-profile-pic.png');

    return(
      <ScrollView className="create-account">

        <Text> { `Editing ${title}` }  </Text>

        <View className="image-uploader">
          <View className="image-uploader--image-container">
            <Image 
              source={eventImage} 
              className="image-uploader--photo"
              resizeMode='contain' 
              style={{width: 100, height: 100}} />
          </View>
          <View className="image-uploader--identification">
            <Text>File Input</Text>
          </View>
        </View>

        <View style={{paddingBottom: 93}}>
          <TextInput
            style={{height: 50}}
            name="title"
            defaultValue={ this.state.title }
            onChangeText={ (value) => this.handleChange(value, 'title') } />

          <TextInput
            style={{minHeight: 50}}
            name="summary"
            multiline={true}
            numberOfLines={4}
            defaultValue={ this.state.summary }
            onChangeText={ (value) => this.handleChange(value, 'summary') } />


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

          <Text> Start Date </Text>
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

          <Text> Finish Date </Text>
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
            recurringDays_checkbox_props.map((item, i) =>{
              let { label, value } = item;
              let currentValue = recurringDays_checkbox_props[i].value;
              console.log('recurringDays_checkbox_props value: ', value)
              console.log('recurringDays_checkbox_props: ', recurringDays_checkbox_props[i].value)
              console.log('this.state.recurringDays.indexOf(currentValue): ', this.state.recurringDays.indexOf(currentValue))


              // pre-check any items that were selected and saved
              if (this.state.recurringDays.indexOf(currentValue) > -1) {
                return (
                  <CheckBox
                    label={label}
                    key={label}
                    checked={true}
                    onChange={(checked) => this.checkboxChange(value, 'recurringDays', checked) }
                  />
                ) 
              } else {
                return (
                  <CheckBox
                    label={label}
                    key={label}
                    onChange={(checked) => this.checkboxChange(value, 'recurringDays', checked) }
                  />
                )
              }
            })
          }
          <View>
            <Text>frequency</Text>
            <RadioForm
              radio_props={frequency_radio_props}
              initial={frequencySelected}
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

export default EditGuardianAccount;
