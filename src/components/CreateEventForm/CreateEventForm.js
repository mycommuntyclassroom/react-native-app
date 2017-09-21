import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
  ScrollView,
  Image
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { addItem, handleFileUpload, updateProfile } from '../../helpers/form';
import { generateCalendarDates } from '../../helpers/events';
import { storage, database } from '../../helpers/firebase';
import actions from '../../redux/actions';
import store from '../../redux/store';

import CheckBox from '../CheckBox';
import Button from '../Button';
import Link from '../Link';
import style from './style'
import PrivacyForm from '../privacyForm'

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
    const { auth, user } = props.app.props;

    // pull the formData tree from the DB and grab all of the checkboxes for hostEvents
    database
    .ref('formData/hostEvents')
    .once('value')
    .then((snapshot) => {
      // setup the state properties

      let categories = {
        gid: auth.uid,
        hostName: user.displayName,
        privacy: user.privacy || 'public',
        latlong: user.latlong || { lat: 90.000, lng:0.000 },
        image: '',
        title: '',
        summary: '',
        profileImage: '../../../images/logo.png',
        seatsAvailable: 0,
        uploadProgress: null,
        recurringDays: [],
        frequency: '',
        ageRange: [],
        startDate: '',
        startTime: '',
        formattedStartDate: '',
        finishDate: '',
        finishTime: '',
        formattedFinishDate: '',
        imageModal: false
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

    // FILE UPLOAD
    this.storageRef = storage.ref(`event-images/${props.auth.uid}`);

    // bind functions
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

    const { 
      formattedStartDate, 
      formattedFinishDate, 
      recurringDays, 
      frequency 
    } = newEvent;

    // generate a collection of formatted dates from the recurring event days and place that collection into the newEvent obj
    newEvent.calendarDates = generateCalendarDates(formattedStartDate, formattedFinishDate, recurringDays, frequency);
    
    // store the selected image's url
    const { selectedImage, profileImage } = this.state;

    let imageUri
    selectedImage
      ? imageUri = selectedImage.uri
      : imageUri = profileImage

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
    let userId = addItem(`guardians/${this.state.gid}/hostEvents`, newEvent);
    // add the event to the general hosts tree - path, data
    updateProfile(`hostEvents/${this.state.gid}/${userId}`, newEvent);

    // update the database
    const eventRef = database.ref(`guardians/${this.state.gid}/hostEvents/${userId}`)
    const hostRef = database.ref(`hostEvents/${this.state.gid}/${userId}`)

    // upload the profile image 
    handleFileUpload(imageUri, selectedImage, this.storageRef, eventRef);
    handleFileUpload(imageUri, selectedImage, this.storageRef, hostRef);

    // navigate to the dashboard
    app.goToScene('Dashboard', {app})
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const props = this.props;
    const { globalStyles } = props;
    const { profileImage } = this.state;
    let formData = this.state.formData || {};

    const outputCheckboxes = () => {
      let checkboxOutput = []
      for (var category in formData) {
        {formData[category].map(item => {
          checkboxOutput.push(
            <CheckBox
              label={item}
              key={item}
              onChange={(checked) => this.checkboxChange(item, category, checked) }
            />
          )
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

    // needed to ensure radio doesnt reset on privacy change
    let frequencySelected;
    frequency_radio_props.map((option, i) => {
      // if there's a match, return the index of the matching item
      if (this.state.frequency === option.value) {
        frequencySelected = i;
      }
    });

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
                selectSingleItem={true}
                assetType='Photos'
                imagesPerRow={3}
                imageMargin={5}
                callback={this.getSelectedImages.bind(this)} />
            </View>
        }
        <Text style={[globalStyles.title, {color: 'white', textAlign: 'center'}]}> Add an Event! </Text>

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
            placeholder='Event Title'
            placeholderTextColor="white"
            onChangeText={ (value) => this.handleChange(value, 'title') } 
          />

          <TextInput
            style={[globalStyles.textInput, {height: 90}]}
            multiline = {true}
            numberOfLines = {6}
            placeholder='Summary of the event'
            placeholderTextColor="white"
            onChangeText={ (value) => this.handleChange(value, 'summary') } 
          />

          <Text style={[style.subTitle, {textAlign: 'center'}]}>Seats Available</Text>
          <View style={style.seatsAvailableContainer}>
            <View style={style.seatsAvailableControls}>
              <TouchableHighlight onPress={() => this.handleSeatsAvailable('minus')}>
                <Image 
                  source={require('../../../images/minus-white.png')} 
                  resizeMode='cover' 
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
                  resizeMode='cover' 
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
            minuteInterval={15}
            showIcon={false}
            onDateChange={(date) => {
              this.setState({
                startDate: date,
                startTime: moment(date, 'MMMM Do YYYY, h:mm a').format('h:mm a'),
                formattedStartDate: moment(date, 'MMMM Do YYYY, h:mm a').format('YYYY-MM-DD')
              });
            }}
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
            onDateChange={(date) => {
              this.setState({
                finishDate: date,
                finishTime: moment(date, 'MMMM Do YYYY, h:mm a').format('h:mm a'),
                formattedFinishDate: moment(date, 'MMMM Do YYYY, h:mm a').format("YYYY-MM-DD")
              });
            }}
          />

          <Text style={style.subTitle}>Repeats</Text>
          <View style={ [globalStyles.radioButtonContainer, {marginTop: 5}] }>
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

          <PrivacyForm globalStyle={globalStyles} onChange={this.radioButtonChange} privacy={this.state.privacy}
                       title={'Event Privacy'}/>

          <Button text='Submit' onPress= { () => this.submitForm() }></Button>
        </View>
      </ScrollView>
    )
  }
}

export default CreateEventForm;
