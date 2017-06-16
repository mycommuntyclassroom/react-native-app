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

import RNFetchBlob from 'react-native-fetch-blob';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CameraRollPicker from 'react-native-camera-roll-picker';
import CheckBox from '../CheckBox';
import Button from '../Button';
import Link from '../Link';

import { updateProfile, capitalizeWord } from '../../helpers/form';
import { storage, database } from '../../helpers/firebase';
import PageLoader from '../PageLoader';
import actions from '../../redux/actions';
import store from '../../redux/store';
import style from './style';

class EditGuardianAccount extends Component {

  constructor(props) {
    super(props);

    const { app } = props;
    const { 
            uid, displayName, profileImage, specialties, 
            street, city, zipCode, gender, state
          } = app.props.user;

    // build the state object with the key values in the props
    let newStateObject = {
      uid,
      displayName,
      profileImage,
      street,
      city,
      zipCode,
      gender: gender || '',
      specialties,
      state,
      uploadProgress: null,
      imageModal: false
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

  

    // const userImage = profileImage || photoURL;

    // FILE UPLOAD


    console.log('this is the uid Loaded: ', app.props.auth.uid);

    this.userRef = database.ref(`guardians/${app.props.auth.uid}`);
    this.storageRef = storage.ref(`user-images/${app.props.auth.uid}/guardian`);
    this.handleFileUpload = this.handleFileUpload.bind(this);

    // bind functions
    this.radioButtonChange=this.radioButtonChange.bind(this);
    this.checkboxChange=this.checkboxChange.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
    this.handleImageSelector=this.handleImageSelector.bind(this);
    this.selectImage=this.selectImage.bind(this);
  }

  // handleFileUpload() {
    // const { selectedImage } = this.state;
    // const imageFile = selectedImage.uri;


    // console.log('SUBMIT::: imageFile: ', imageFile);

    // RNFetchBlob.fs.readFile(imageFile, 'base64')
    // .then((data) => {
    //   // handle the data ..
    //   console.log('RNFetchBlob data: ', data);
    //   let base64Image = `data:image/jpeg;base64,${data}`;
    //   // push the image to the database
    //   const uploadTask = 
    //     this.storageRef
    //         .child(selectedImage.filename)
    //         .put(base64Image);

    //   uploadTask.on('state_changed', (snapshot) => {
    //     // const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     // this.setState({ uploadProgress });
    //   });

    //   uploadTask.then((snapshot) => {
    //     this.userRef.update({
    //       profileImage: snapshot.downloadURL
    //     });
    //     this.setState({ 
    //       uploadProgress: null,
    //       profileImage: snapshot.downloadURL
    //     });
    //   });
    // })

  handleFileUpload(uri = this.state.selectedImage.uri, mime = 'image/jpeg') {

    // Prepare Blob support
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    console.log('thie is the handleFileUpload uri: ', uri );
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null

      const imageRef = storage.ref('images').child('image_001')

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }

  handleImageSelector() {
    console.log('******handleImageSelector CALLED')
    this.setState({imageModal: !this.state.imageModal});
  }

  selectImage() {
    console.log('selectImage CALLED')
    this.setState({ profileImage: this.state.selectedImage.uri});
  }


  getSelectedImages(images, current) {
    var num = images.length;

    console.log('images: ', images)
    console.log('current: ', current);
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

    // upload the profile image 
    this.handleFileUpload();

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
              <Text>IMAGE MODAL </Text>
              <Link text='Close' onClick={() => this.handleImageSelector()}> </Link>
              <Link text='Select' onClick={() => this.selectImage()}> </Link>

              {/* image handler */}
              <CameraRollPicker
                scrollRenderAheadDistance={500}
                initialListSize={1}
                pageSize={3}
                removeClippedSubviews={false}
                groupTypes='SavedPhotos'
                batchSize={5}
                maximum={3}
                selected={this.state.selected}
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
            <Link text='File Input' onClick={() => this.handleImageSelector()} style={globalStyles.formSubTitle}></Link>
          </View>
        </View>

        <View style={{paddingBottom: 93}}>
          <TextInput
            style={globalStyles.textInput}
            name="displayName"
            defaultValue={ this.state.displayName }
            onChangeText={ (value) => this.handleChange(value, 'displayName') } />

          <View>
            <RadioForm
              radio_props={radio_props}
              initial={userGender === 'male' ? 0 : 1 }
              onPress={(value) => { this.radioButtonChange(value, 'gender') }}
            />
          </View>

          <View className="address">
            <Text style={globalStyles.formSubTitle}>Address</Text>
            <TextInput
              style={globalStyles.textInput}
              type="text"
              placeholder="Street Address"
              defaultValue={ this.state.street }
              onChangeText={ (value) => this.handleChange(value, 'street') }
            />
            <View style={globalStyles.formAddress2ndRow}>
              <View style={globalStyles.formAddressItem}>
                <TextInput
                  style={globalStyles.textInput}
                  name="city"
                  type="text"
                  placeholder="City"
                  defaultValue={ this.state.city }
                  onChangeText={ (value) => this.handleChange(value, 'city') } 
                />
              </View>
              <View style={[globalStyles.formAddressItem, globalStyles.formAddressCenterPiece]}>
                <TextInput
                  style={globalStyles.textInput}
                  className="state-field"
                  name="state"
                  placeholder="State"
                  defaultValue={ this.state.state }
                  onChangeText={ (value) => this.handleChange(value, 'state') } 
                />
              </View>
              <View style={globalStyles.formAddressItem}>
                <TextInput
                  style={globalStyles.textInput}
                  name="zipCode"
                  type="text"
                  placeholder="Zipcode"
                  defaultValue={ this.state.zipCode }
                  onChangeText={ (value) => this.handleChange(value,'zipCode') } 
                />
              </View>
            </View>
          </View>

          { outputCheckboxes() }

          <Button extraStyle={style.submit} text='Submit' onPress= { () => this.submitForm() }></Button>
        </View>
      </ScrollView>
    )
  }
}

export default EditGuardianAccount;
