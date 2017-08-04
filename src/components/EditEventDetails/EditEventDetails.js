import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  Image
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CameraRollPicker from 'react-native-camera-roll-picker';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import CheckBox from '../CheckBox';
import Button from '../Button';
import Link from '../Link';

import { updateProfile, handleFileUpload } from '../../helpers/form';
import { storage, database } from '../../helpers/firebase';
import actions from '../../redux/actions';
import store from '../../redux/store';
import style from '../CreateEventForm/style'

// time/date values
const now = moment().hour(0).minute(0);
const nowFormat = now.format('YYYY-MM-DD')
const today = now.format('YYYY-MM-DD');
const priorDay = today.slice(-2) - 1;
const yesterday = `${today.slice(0, 8)}${priorDay}`;

class EditGuardianAccount extends Component {

  constructor(props) {
    super(props);


    const { eventId } = props;
    const { app } = props;

    // event details
    let hostEvents = app.props.user.hostEvents[eventId];

    const { 
            gid, title, summary, image, hostName, seatsAvailable,
            ageRange, startDate, finishDate, frequency, profileImage 
          } = hostEvents || null;

    const recurringDays = hostEvents.recurringDays || []

    // build the state object with the key values in the props
    let newStateObject = {
      gid,
      title,
      summary,
      hostName,
      startDate,
      finishDate,
      frequency,
      image,
      seatsAvailable,
      recurringDays,
      ageRange: ageRange || [''],
      profileImage,
      uploadProgress: null,
      imageModal: false
    }

    // update the state after the render
    this.state = newStateObject;

    // pull the formData tree and grab all of the checkboxes for the guardians
    // and save it in the state
    database
    .ref('formData/hostEvents')
    .once('value')
    .then((snapshot) => {
      // store the formData in the state
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

  handleImageSelector() {
    this.setState({imageModal: !this.state.imageModal});
  }

  selectImage() {
    // if the user didn't select an image, skip this
    if (!this.state.selectedImage) return;

    // set the image uri to the profile image and close the modal
    this.setState({profileImage: this.state.selectedImage.uri});
    this.handleImageSelector();
  }

  getSelectedImages(images, current) {
    this.setState({selectedImage: current})
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

  checkboxChange(checkbox, checkboxOptions, checked) {
    // current array of options
    let options;
    if (this.state[checkboxOptions]) {
      options = this.state[checkboxOptions]
    }
    else {
      let checkboxOptionsObj = {};
      checkboxOptionsObj[checkboxOptions] = []
      this.setState(checkboxOptionsObj);
    };

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
    const props = this.props;
    const { app, globalStyles } = props;

    // state values for the event
    const { 
      title, uploadProgress, gid, image, recurringDays, 
      frequency, startDate, finishDate, ageRange, summary, profileImage
    } = this.state;

    // grab the form data set within the state
    let formData = this.state.formData || {};

    const outputCheckboxes = () => {
      // skip this function if the state doesn't have basic info
      if (gid === null) { return }
      let checkboxOutput = [];
      for (var category in formData) {
        {formData[category].map(item => {
          let currentCategory = this.state[`${category}`] || [];
          // pre-check any items that were selected and saved
          if (currentCategory.indexOf(item) > -1) {
            checkboxOutput.push(
              <CheckBox
                label={item}
                checked={true}
                key={`${item}${category}`}
                onChange={(checked) => this.checkboxChange(item, category, checked) }
              />
            )
          } 
          else {
            checkboxOutput.push(
              <CheckBox
                label={item}
                key={`${item}${category}`}
                onChange={(checked) => this.checkboxChange(item, category, checked) }
              />
            )
          }
        })}
      }
      return checkboxOutput
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
    let eventImage = profileImage != '../../../images/logo.png'
      ? {uri: profileImage} 
      : require('../../../images/logo.png');

    return(
      <ScrollView style={style.container}>

        {
          /* page overlay for the image selection
             rendered based on the state per the open/close */

          this.state.imageModal &&
            // if true, render the imageModal
            <View style={style.imageModal}>
              <Text style={globalStyles.imagePickerTitle}>
                Select an image for your profile 
              </Text>
              <Link 
                text='Cancel'
                extraStyle={[globalStyles.chooseImage, {backgroundColor: 'maroon'}]}
                textStyles={{color: 'white'}}
                onClick={() => this.handleImageSelector()}/>
              <Link 
                text='Select'
                extraStyle={globalStyles.chooseImage}
                onClick={() => this.selectImage()}/>

              {/* image handler */}
              <CameraRollPicker
                scrollRenderAheadDistance={500}
                initialListSize={1}
                pageSize={3}
                removeClippedSubviews={false}
                groupTypes='SavedPhotos'
                batchSize={5}
                maximum={1}
                selected={this.state.selected}
                assetType='Photos'
                imagesPerRow={3}
                imageMargin={5}
                callback={this.getSelectedImages.bind(this)} />
            </View>
        }

        <Text style={[globalStyles.title, {color: 'white', textAlign: 'center'}]}> 
          { `Editing ${title}` } 
        </Text>

        <View className="image-uploader">
          <View style={globalStyles.formImageContainer}>
            <Image 
              source={eventImage} 
              style={globalStyles.formImage}
              resizeMode='cover' />
          </View>
          <View className="image-uploader--identification">
            <Link 
              text='Add a profile image' 
              onClick={() => this.handleImageSelector()}
              extraStyle={globalStyles.uploadImageButton}
            />
          </View>
        </View>

        <View style={{paddingBottom: 140}}>
          <TextInput
            style={globalStyles.textInput}
            name="title"
            defaultValue={ this.state.title }
            placeholderTextColor="white"
            onChangeText={ (value) => this.handleChange(value, 'title') } />

          <TextInput
            style={[globalStyles.textInput, {height: 90}]}
            name="summary"
            multiline={true}
            numberOfLines={6}
            defaultValue={ this.state.summary }
            onChangeText={ (value) => this.handleChange(value, 'summary') } />

          <Text style={[style.subTitle, {textAlign: 'center'}]}>Seats Available</Text>
          <View style={style.seatsAvailableContainer}>
            <View style={style.seatsAvailableControls}>
              <TouchableHighlight onPress={() => this.handleSeatsAvailable('minus')}>
                <Image 
                  source={require('../../../images/minus-white.png')}
                  resizeMode='contain'
                  style={style.seatControlsIcon}
                />
              </TouchableHighlight>
              <Image 
                source={require('../../../images/chair-white.png')}
                resizeMode='cover'
                style={style.seatIcon}
              />
              <TouchableHighlight onPress={() => this.handleSeatsAvailable('add')}> 
                <Image 
                  source={require('../../../images/plus-sign-white.png')}
                  resizeMode='contain' 
                  style={style.seatControlsIcon} 
                />
              </TouchableHighlight>
            </View>
            <View style={style.seatCount}><Text style={style.seatCountCopy}>{ this.state.seatsAvailable }</Text></View>
          </View>

          <Text style={style.subTitle}> Start Date </Text>
          <DatePicker
            style={style.datePicker}
            date={this.state.startDate}
            mode="datetime"
            placeholder="Start Date"
            format="MMMM Do YYYY, h:mm a"
            minDate={`${yesterday}`}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: style.dateInput,
              placeholderText: style.datePickerText,
              dateText: style.dateText
            }}
            minuteInterval={5}
            showIcon={false}
            onDateChange={(date) => {this.setState({startDate: date});}}
          />

          <Text style={style.subTitle}> Finish Date </Text>
          <DatePicker
            style={style.datePicker}
            date={this.state.finishDate}
            mode="datetime"
            placeholder="Finish Date"
            format="MMMM Do YYYY, h:mm a"
            minDate={`${yesterday}`}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: style.dateInput,
              placeholderText: style.datePickerText,
              dateText: style.dateText
            }}
            minuteInterval={5}
            showIcon={false}
            onDateChange={(date) => {this.setState({finishDate: date});}}
          />

          <Text style={style.subTitle}>Repeats</Text>
          <View style={ [globalStyles.radioButtonContainer, {marginTop: 5}] }>
            {
              /* custom checkbox output for the event form. This doesn't exist in the formData */
              recurringDays_checkbox_props.map((item, i) =>{
                let { label, value } = item;
                let currentValue = recurringDays_checkbox_props[i].value;

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
          </View>
          <View>
            <Text style={style.subTitle}>Frequency</Text>
            <RadioForm
              radio_props={frequency_radio_props}
              initial={frequencySelected}
              style={{marginTop: 5, marginBottom: 5}}
              buttonColor={'rgba(0, 0, 0, 0.3)'}
              buttonSize={30}
              buttonWrapStyle={{padding: 30, marginRight: 10}}
              labelStyle={{marginRight: 30, color: 'white', fontSize: 15}}
              formHorizontal={true}
              onPress={(value) => { this.radioButtonChange(value, 'frequency') }}
            />
          </View>

          <View style={ [globalStyles.radioButtonContainer, {marginBottom: 30}] }>
            { outputCheckboxes() }
          </View>

          <Button text='Submit' onPress= { () => this.submitForm() }></Button>
        </View>
      </ScrollView>
    )
  }
}

export default EditGuardianAccount;
