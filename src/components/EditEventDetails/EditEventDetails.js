import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  Image
} from 'react-native';

import CheckBox from '../CheckBox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Button from '../Button';

import { updateProfile } from '../../helpers/form';
import { storage, database } from '../../helpers/firebase';
import PageLoader from '../PageLoader';
import actions from '../../redux/actions';
import store from '../../redux/store';

class EditGuardianAccount extends Component {

  constructor(props) {
    super(props);

    console.log('EditGuardianAccount CALLED!!!')

    const { eventId } = props;

    console.log('eventId: ', eventId)

    const { app } = props;

    // event details
    let hostEvents = app.props.user.hostEvents[eventId];

    console.log('thie is the APP data: ', app)
    console.log('thie is the hostEvent: ', hostEvents)

    const { 
            gid, title, summary, image, hostName, seatsAvailable,
            ageRange, startDate, finishDate, recurringDays, frequency 
          } = hostEvents || null;

    console.log('hostEvents gid: ', gid)

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

    console.log('this is the state obj after the insertion: ', this.state);

    // bind functions
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
    console.log('this is the checkboxChange state: ', this.state)
    const options = this.state.specialties;
    console.log('This is the checkboxChange options: ', this.state.specialties);
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

  /**
   *
   * @param e
   */

  submitForm() {
    console.log('*!*!*!*!*!*!submitForm CALLED');
    const props = this.props;
    const { app } = props;
    const data = {...this.state};

    const currentUserObject = app.props.user;
    console.log('here is the currentUserObject: ', currentUserObject)
    const updatedUser = Object.assign(currentUserObject, data)
    console.log('here is the updatedUser: ', updatedUser)

    // pass the updated object to the store
    store.dispatch(actions.userInfo(updatedUser));

    // update the database - path, data
    updateProfile(`guardians/${data.gid}`, data);

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

    console.log('formData: ', formData)
    console.log('this is the RENDER STATE: ', this.state)

    const outputCheckboxes = () => {
      console.log('outputCheckboxes Called ');
      // skip this function if the state doesn't have basic info
      console.log('this is the gid: ', gid);
      if (gid === null) { return }
      console.log('guard PASSED')
      let checkboxOutput = [];
      for (var category in formData) {
        checkboxOutput.push(
          <View key={category}>
            <Text>{category}</Text>
            {formData[category].map(item => {
              var checkbox = '';
              console.log('output checkboxes this.state:: ', this.state)
              console.log('output checkboxes category:: ', category)
              console.log('output checkboxes this.state[`${category}`]:: ', this.state[`${category}`])
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
    let frequencySelected = frequency_radio_props.map((option) => {
      option.value
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

    console.log('This is the image: ', image);

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

          <Text>Repeats</Text>
          {
            /* custom checkbox output for the event form. This doesn't exist in the formData */
            recurringDays_checkbox_props.map((item) =>{
              let { label, value } = item;
              // pre-check any items that were selected and saved
              if (recurringDays.indexOf(item) > -1) {
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
              initial={2}
              onPress={(value) => { this.radioButtonChange(value, 'frequency') }}
            />
          </View>

          <Text>Repeats</Text>
          {
            /* custom checkbox output for the event form. This doesn't exist in the formData 
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
            */

          }

          { outputCheckboxes() }

          <Button text='Submit' onPress= { () => this.submitForm() }></Button>
        </View>
      </ScrollView>
    )
  }
}

export default EditGuardianAccount;
