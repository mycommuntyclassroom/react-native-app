import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  CameraRoll,
  Image
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from '../CheckBox';
import Button from '../Button';
import Link from '../Link';

import { updateProfile, handleFileUpload } from '../../helpers/form';
import { storage, database } from '../../helpers/firebase';
import actions from '../../redux/actions';
import store from '../../redux/store';

import style from '../CreateChildAccount/style';

class EditChildAccount extends Component {

  constructor(props) {
    super(props);

    // child's id
    const { childId } = props;
    const { app } = props;
    const child = app.props.user.children[childId];

    const { 
            gid, fName, lName, profileImage, gender, allergies
          } = child;


    // build the state object with the key values in the props
    let newStateObject = {
      gid,
      fName,
      lName,
      profileImage,
      gender: gender || 'female',
      allergies: allergies || [''],
      uploadProgress: null,
      imageModal: false
    }

    // set the state
    this.state = newStateObject;


    // pull the formData tree and grab all of the checkboxes for the children
    // and save it in the state
    database
    .ref('formData/children')
    .once('value')
    .then((snapshot) => {
      // store the formData in the state
      this.setState({formData: snapshot.val()});
    })

    // FILE UPLOAD
    this.childRef = database.ref(`guardians/${gid}/children/${childId}`);
    this.storageRef = storage.ref(`user-images/${app.props.auth.uid}/children`);

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
    const options = this.state.allergies;
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

  // SUBMIT FORM DATA
  // 
  // 
  submitForm() {
    const props = this.props;
    const { childId } = props;
    const { app } = props;
    const data = {...this.state};

    // store the selected image's url
    const { selectedImage } = this.state;

    // skip if the profile image wasn't updated
    if (selectedImage) {
      let imageUri = selectedImage.uri;
      // upload the profile image 
      handleFileUpload(imageUri, selectedImage, this.storageRef, this.childRef);
    }

    // remove the values from the formData prop
    data.formData = null;

    // update the store, create a new user object with the profile info in it
    const childProfile = app.props.user.children[childId];
    const userProfile = app.props.user;

    // update the child's profile with the data submitted
    const updatedChildProfile = Object.assign(childProfile, data);
    // update the user object with the updated child profile
    const updatedUser = Object.assign(userProfile, updatedChildProfile)


    // pass the updated user to the store
    store.dispatch(actions.userInfo(updatedUser));

    // update the database - path, data
    updateProfile(`guardians/${data.gid}/children/${childId}`, data);

    // navigate to the dashboard
    app.goToScene('Dashboard', {app})
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const props = this.props;
    const { app, globalStyles } = props
    const currentChild = this.state
    const { gid, fName, lName, gender, profileImage, uploadProgress, allergies } = currentChild;
    let allergyList = allergies || [''];

    // grab the form data set within the state
    let formData = this.state.formData || {};


    const outputCheckboxes = () => {
      // skip this function if the state doesn't have basic info (id)
      if (gid === null) { return }
      
      let checkboxOutput = [];
      for (var category in formData) {
        checkboxOutput.push(
          <View key={category}>
            <Text style={globalStyles.formSubTitle}>{category}</Text>
            <View style={ [globalStyles.radioButtonContainer, {marginBottom: 30}] }>
              {formData[category].map(item => {
                var checkbox = '';
                // pre-check any items that were selected and saved
                if (allergyList.indexOf(item) > -1) {
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

        <Text style={[globalStyles.formTitle, style.title]}> {`Updating ${fName}'s Profile`} </Text>

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
            name="fName"
            placeholderTextColor="white"
            defaultValue={ this.state.fName }
            onChangeText={ (value) => this.handleChange(value, 'fName') } />

          <TextInput
            style={globalStyles.textInput}
            name="lName"
            placeholderTextColor="white"
            defaultValue={ this.state.lName }
            onChangeText={ (value) => this.handleChange(value, 'lName') } />

          <View>
            <RadioForm
              radio_props={radio_props}
              initial={gender === 'male' ? 0 : 1 }
              style={{padding: 30, marginRight: 10}}
              buttonWrapStyle={{padding: 30, marginRight: 10}}
              labelStyle={{marginRight: 30}}
              formHorizontal={true}
              onPress={(value) => { this.radioButtonChange(value, 'gender') }}
            />
          </View>

          { outputCheckboxes() }

          <Button text='Submit' onPress= { () => this.submitForm() }></Button>
        </View>
      </ScrollView>
    )
  }
}

export default EditChildAccount;
