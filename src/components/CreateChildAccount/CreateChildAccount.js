import React, { Component } from 'react';
import { addChildProfile, removeItem, handleFileUpload } from '../../helpers/form';
import { database, storage } from '../../helpers/firebase';
import actions from '../../redux/actions';
import store from '../../redux/store';

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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckBox from '../CheckBox';
import Button from '../Button';
import Link from '../Link';
import style from './style';

// import BackButton from '../components/BackButton';

class CreateChildAccount extends Component {

  constructor(props) {
    super();

    // 
    // STATE OBJECT
    // 
    this.state={};

    // clear the old formData
    AsyncStorage.removeItem('formData');
    const { app } = props
    const { auth } = app.props;

    // pull the formData tree from the DB and grab all of the checkboxes for the guardians
    database
    .ref('formData/children')
    .once('value')
    .then((snapshot) => {
      // setup the state properties

      let categories = {
        gid: auth.uid,
        fName: '',
        lName: '',
        age:'',
        profileImage: '../../../images/blank-profile-pic.png',
        gender: null,
        uploadProgress: null,
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
    this.storageRef = storage.ref(`user-images/${app.props.auth.uid}/children`);

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
    const options = this.state[ checkboxOptions ];
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
    const newState = {}
    newState[group] = value

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
    // store the selected image's url
    const { fName, lName, selectedImage, profileImage } = this.state;
    // gather the child's info from the state
    const newChild = {...this.state};
    // create a temporary id for the new child
    const tempNewChildID = `${fName}${lName}`;

    let imageUri
    selectedImage
      ? imageUri = selectedImage.uri
      : imageUri = profileImage

    // get the user
    let parent = app.props.user;
    // get the users group of children
    let userChildren = parent.children || {};

    // if this is the first time the user is adding children, remove the empty placeholder
    if (userChildren[0] == ' ') {
      // remove the placeholder from the DB
      removeItem(`guardians/${newChild.gid}/children/0`)
      // remove the placeholder locally
      delete userChildren['0'];
    }


    // create a copy of the user's children
    const updatedUserChildren = Object.assign(userChildren);

    // add the new child to the user's children
    updatedUserChildren[tempNewChildID] = newChild;

    // pass the user with the updated children to the store
    const updatedUser = Object.assign(parent, updatedUserChildren);
    store.dispatch(actions.handleChildProfile(updatedUser));

    // update the database
    let userId = addChildProfile(newChild);

    const userRef = database.ref(`guardians/${newChild.gid}/children/${userId}`)
    
    // upload the profile image 
    handleFileUpload(imageUri, selectedImage, this.storageRef, userRef);

    // navigate to the dashboard
    app.goToScene('Dashboard', {app})
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const props = this.props
    const { globalStyles, app } = props
    let formData = this.state.formData || {};
    const { displayName, email, imageName } = this.props.auth;
    const { uploadProgress, profileImage } = this.state;

    const outputCheckboxes = () => {
      let checkboxOutput = []
      for (var category in formData) {
        checkboxOutput.push(
          <View>
            <Text style={globalStyles.formSubTitle}>{category}</Text>
            <View style={ [globalStyles.checkboxContainer, {marginBottom: 30}] }>
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
          </View>
        )
      }
      return checkboxOutput
    }

    const age_radio_props = [
      {label: '0-3', value: '03' },
      {label: '3-6', value: '36' },
      {label: '6-9', value: '69' },
      {label: '9-12', value: '912' },
      {label: '12-15', value: '1215' }
    ];

    let ageSelected;
    age_radio_props.map((option, i) => {
      // if there's a match, return the index of the matching item
      if (this.state.age === option.value) {
        ageSelected = i;
      }
    });

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
        <Text style={[globalStyles.formTitle, style.title]}> Add your child here! </Text>

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

        <View>
          <TextInput
            style={globalStyles.textInput}
            placeholder='First Name'
            placeholderTextColor="white"
            onChangeText={ (value) => this.handleChange(value, 'fName') } 
          />

          <TextInput
           style={globalStyles.textInput}
            placeholder='Last Name'
            placeholderTextColor="white"
            onChangeText={ (value) => this.handleChange(value, 'lName') } 
          />

          <View>
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

          { outputCheckboxes() }

          <View>
            <Text style={style.subTitle}>Age Range</Text>
            <RadioForm
              radio_props={age_radio_props}
              initial={ageSelected}
              style={{marginTop: 5, marginBottom: 5}}
              buttonColor={'rgba(0, 0, 0, 0.3)'}
              buttonSize={10}
              buttonWrapStyle={{padding: 10, marginRight: 10}}
              labelStyle={{marginRight: 10, color: 'white', fontSize: 14}}
              formHorizontal={true}
              onPress={(value) => { this.radioButtonChange(value, 'age') }}
            />
          </View>

          <Button 
            text='Submit'
            extraStyle={{marginTop: 20, marginBottom: 120}}
            onPress= { () => this.submitForm() }></Button>
        </View>
      </ScrollView>
    )
  }
}

export default CreateChildAccount;
