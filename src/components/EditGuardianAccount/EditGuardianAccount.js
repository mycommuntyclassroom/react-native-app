import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  Image,
  CameraRoll,
  Platform
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from '../CheckBox';
import Button from '../Button';
import Link from '../Link';

import { updateProfile, capitalizeWord, handleFileUpload } from '../../helpers/form';
import { storage, database } from '../../helpers/firebase';
import PageLoader from '../PageLoader';
import actions from '../../redux/actions';
import store from '../../redux/store';
import style from './style';
import PrivacyForm  from '../privacyForm'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

class EditGuardianAccount extends Component {

  constructor(props) {
    super(props);

    const { app } = props;
    const { 
            uid, displayName, profileImage, specialties, 
            street, city, zipCode, gender, state, greeting, privacy, latlong, sponsored = false
          } = app.props.user;

    // build the state object with the key values in the props
    let newStateObject = {
      uid,
      displayName,
      profileImage: profileImage || '',
      greeting,
      street,
      city,
      zipCode,
      gender: gender || '',
      specialties,
      state,
      privacy: privacy || 'public',
      uploadProgress: null,
      imageModal: false,
      latlong,
      sponsored
    };

    // update the state after the render
    this.state = newStateObject;

    // pull the formData tree and grab all of the checkboxes for the guardians
    // and save it in the state
    database
    .ref('formData/guardians')
    .once('value')
    .then((snapshot) => {
      // store the formData in the state
      this.setState({formData: snapshot.val()});

      let formData = snapshot.val() || {}

      // gather all of the checkbox categories and pass them to the state (categories) object
      // for (var category in formData) {
    
    
      //   // add a new property to the newStateObject
      //   // with the name of each checkbox group name and its checked fields
      //   let categoryArray = props.user[category] || [];
    
      //   let newCategoryArray = categoryArray.slice();
    
      //   newStateObject[category] = newCategoryArray;
      // }
    })

    // FILE UPLOAD
    this.userRef = database.ref(`guardians/${app.props.auth.uid}`);
    this.storageRef = storage.ref(`user-images/${app.props.auth.uid}/guardian`);

    // bind functions
    this.radioButtonChange=this.radioButtonChange.bind(this);
    this.checkboxChange=this.checkboxChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
    this.handleImageSelector=this.handleImageSelector.bind(this);
    this.selectImage=this.selectImage.bind(this);
  }

  handleImageSelector() {
    this.setState({imageModal: !this.state.imageModal});
  }

  selectImage() {
    // if the user didn't select an image, skip this
    if (!this.state.selectedImage) return;

    // set the image uri to the profile image and close the modal
    this.setState({ profileImage: this.state.selectedImage.uri});
    this.handleImageSelector();
  }

  getSelectedImages(images, current) {
    var num = images.length;
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
    const options = this.state.specialties;
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
    const props = this.props;
    const { app } = props;
    const data = {...this.state};

    const currentUserObject = app.props.user;
    const updatedUser = Object.assign(currentUserObject, data)

    // store the selected image's url
    const { selectedImage, profileImage } = this.state;
    let imageUri
    selectedImage
      ? imageUri = selectedImage.uri
      : imageUri = profileImage
    // let imageUri = selectedImage.uri || profileImage;

    // upload the profile image 
    handleFileUpload(imageUri, selectedImage, this.storageRef, this.userRef);

    // pass the updated object to the store
    store.dispatch(actions.userInfo(updatedUser));

    // update the database - path, data
    updateProfile(`guardians/${data.uid}`, data);

    // navigate to the dashboard
    app.goToScene('Dashboard', {app})
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const props = this.props;
    const { globalStyles, app } = props
    const userObj = app.props.user
    const { uid, displayName } = userObj;
    const { uploadProgress, profileImage } = this.state;
    const userSpecialties = userObj.specialties

    // grab the form data set within the state
    let formData = this.state.formData || {};

    const outputCheckboxes = () => {
      // skip this function if the state doesn't have basic info
      if (uid === null) { return }
      let checkboxOutput = [];
      for (var category in formData) {
        checkboxOutput.push(
          <View style={globalStyles.checkboxContainer} key={category}>
            <Text style={globalStyles.checkboxSubTitle}>{capitalizeWord(category)}</Text>
            {formData[category].map(item => {
              var checkbox = '';
              // pre-check any items that were selected and saved
              if (userSpecialties.indexOf(item) > -1) {
                checkbox = 
                  <CheckBox
                    label={item}
                    checked={true}
                    key={item}
                    onChange={(checked) => this.checkboxChange(item, category, checked) }
                  />;
              } else {
                checkbox = 
                  <CheckBox
                    label={item}
                    key={item}
                    onChange={(checked) => this.checkboxChange(item, category, checked) }
                  />;
              }

              return checkbox;
            })}
          </View>
        )
      }
      return checkboxOutput
    }

    // set the data structure for the radio buttons
    const radio_props = [
      {label: 'Male', value: 'male' },
      {label: 'Female', value: 'female' }
    ];

    let userGender = this.state.gender

    // handle the output of the required image
    let userImage = profileImage != '../../../images/blank-profile-pic.png'
      ? {uri: profileImage} 
      : require('../../../images/blank-profile-pic.png');

    return(
      <ScrollView style={globalStyles.formContainer}>
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
        <Text style={[globalStyles.formTitle, style.title]}> Editing Profile </Text>

        <View className="image-uploader">
          <View style={globalStyles.formImageContainer}>
            <Image 
              source={userImage} 
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

        <View style={{paddingBottom: 93}}>
          <TextInput
            style={globalStyles.textInput}
            name="displayName"
            placeholderTextColor="white"
            defaultValue={ this.state.displayName }
            onChangeText={ (value) => this.handleChange(value, 'displayName') } />

          <TextInput
            style={[globalStyles.textInput, {height: 90}]}
            multiline = {true}
            numberOfLines = {6}
            placeholderTextColor='white'
            placeholder='Write a summary about yourself here'
            defaultValue={ this.state.greeting }
            onChangeText={ (value) => this.handleChange(value, 'greeting') } 
          />

          <View style={{alignItems: 'center'}}>
            <RadioForm
              radio_props={radio_props}
              initial={userGender === 'male' ? 0 : 1 }
              style={{padding: 30, marginRight: 10}}
              buttonWrapStyle={{padding: 30, marginRight: 10}}
              labelStyle={{marginRight: 30}}
              formHorizontal={true}
              onPress={(value) => { this.radioButtonChange(value, 'gender') }}
            />
          </View>

          <View className="address">
            <Text style={globalStyles.formSubTitle}>Address</Text>
            <GooglePlacesAutocomplete
              placeholder='Start typing your address here'
              minLength={2} // minimum length of text to search
              autoFocus={true}
              returnKeyType={'default'}
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              let componentForm = {
                      street_number: 'short_name',
                      route: 'long_name',
                      locality: 'long_name',
                      administrative_area_level_1: 'short_name',
                      country: 'short_name',
                      postal_code: 'short_name'
                    };

                 for (let i = 0; i < details.address_components.length; i++) {
                let addressType = details.address_components[i].types[0];
                if (componentForm[addressType]) {
                  let val = details.address_components[i][componentForm[addressType]];
                  componentForm[addressType] = val;
                }
              }
              this.handleChange(componentForm.postal_code, 'zipCode');
              this.handleChange(componentForm.street_number + ' ' + componentForm.route, 'street');
              this.handleChange(componentForm.administrative_area_level_1, 'state');
              this.handleChange(componentForm.locality, 'city');
              this.handleChange(details.geometry.location, 'latlong');
              }}
              placeholderTextColor='white'
              getDefaultValue={() => ''}
              enablePoweredByContainer={false}
              styles={{ textInput: { minHeight: 40,
                      borderRadius: 3,
                      fontSize: 12,
                      padding: 10,
                      marginTop: 4,
                      marginBottom: 4,
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)'},
                      textInputContainer: {
                          backgroundColor: 'rgba(0,0,0,0)',
                          borderTopWidth: 0,
                          borderBottomWidth:0
                        },
                        row: {
                        padding: 10,
                        height: 36,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                      },
                      description:{
                        fontSize:12
                      },
                      }}

              query={{
                      key: 'AIzaSyAif6TTNUxjjj4Zt-6tNT7orijVUT2mHXE',
                      language: 'en', // language of the results
                      types: 'address' // default: 'geocode'
                    }}

              nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GooglePlacesSearchQuery={{
                      rankby: 'distance',
                      types: 'food'
                     }}
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
            <TextInput
              style={globalStyles.textInput}
              type="text"
              placeholder="Street Address"
              placeholderTextColor="white"
              defaultValue={ this.state.street }
              value={this.state.street}
              onChangeText={ (value) => this.handleChange(value, 'street') }
            />
            <View style={globalStyles.formAddress2ndRow}>
              <View style={globalStyles.formAddressItem}>
                <TextInput
                  style={globalStyles.textInputDisabled}
                  name="city"
                  type="text"
                  placeholder="City"
                  defaultValue={ this.state.city }
                  value={this.state.city}
                  editable={false}
                  onChangeText={ (value) => this.handleChange(value, 'city') }
                />
              </View>
              <View style={[globalStyles.formAddressItem, globalStyles.formAddressCenterPiece]}>
                <TextInput
                  style={globalStyles.textInputDisabled}
                  className="state-field"
                  name="state"
                  placeholder="State"
                  defaultValue={ this.state.state }
                  value={this.state.state}
                  editable={false}
                  onChangeText={ (value) => this.handleChange(value, 'state') }
                />
              </View>
              <View style={globalStyles.formAddressItem}>
                <TextInput
                  style={globalStyles.textInputDisabled}
                  name="zipCode"
                  type="text"
                  placeholder="Zipcode"
                  defaultValue={ this.state.zipCode }
                  value={this.state.zipCode}
                  editable={false}
                  onChangeText={ (value) => this.handleChange(value,'zipCode') }
                />
              </View>
            </View>
          </View>

          { outputCheckboxes() }

          <PrivacyForm globalStyle={globalStyles} onChange={this.radioButtonChange} privacy={this.state.privacy}
                       title={'Default Event Privacy'}/>

          <Button extraStyle={style.submit} text='Submit' onPress= { () => this.submitForm() }></Button>
        </View>
      </ScrollView>
    )
  }
}

export default EditGuardianAccount;
