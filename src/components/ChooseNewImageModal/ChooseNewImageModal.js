import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';


import CameraRollPicker from 'react-native-camera-roll-picker';
import Link from '../Link';
import globalStyles from '../../styles';
import style from './style';

class ChooseNewImageModal extends Component {
  
  /* page overlay for the image selection
     rendered based on the state per the open/close */

  render() {

    this.state={
      imageModal: false
    }

    const props = this.props;

    return(

      {/* if true, render the imageModal */}
      <View style={style.imageModal}>
        <Text style={globalStyles.imagePickerTitle}>
          Select an image for your profile 
        </Text>
        <Link 
          text='Cancel'
          extraStyle={[globalStyles.chooseImage, {backgroundColor: 'maroon'}]}
          textStyles={{color: 'white'}}
          onClick={() => props.handleImageSelector()}/>
        <Link 
          text='Select'
          extraStyle={globalStyles.chooseImage}
          onClick={() => props.selectImage()}/>

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
          callback={props.getSelectedImages} />
      </View>
    )
  }
}

export default ChooseNewImageModal;
