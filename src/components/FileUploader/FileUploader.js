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
import Link from '../Link';
import style from './style';

class FileUploader extends Component {

  constructor(props) {
    super(props)

    this.state = {};
  }
    // <FileUploader 
    //       {...props} 
    //       userImage={ userImage }
    //       imageModal={this.state.imageModal}
    //       selectImage={() => this.selectImage()}
    //       getSelectedImages={() => this.getSelectedImages()}
    //       handleImageSelector={() => this.handleImageSelector()}
    //     />

  render() {
    const props = this.props;
    const { globalStyles, imageModal } = props;



    return (
      <View>
        {
          /* page overlay for the image selection
             rendered based on the state per the open/close */

          imageModal &&
            // if true, render the imageModal
            <View style={style.imageModal}>
              <Text>IMAGE MODAL </Text>
              <Link text='Close' onClick={() => props.handleImageSelector()}> </Link>
              <Link text='Select' onClick={() => props.selectImage()}> </Link>

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
                // callback={this.getSelectedImages.bind(this)} />
                assetType='Photos'
                imagesPerRow={3}
                imageMargin={5}
                callback={() => props.getSelectedImages(this)} />

            </View>
        }
        <Text style={[globalStyles.formTitle, style.title]}> Editing Profile </Text>

        <View className="image-uploader">
          <View style={globalStyles.formImageContainer}>
            <Image 
              source={props.userImage} 
              style={globalStyles.formImage}
              resizeMode='cover' />
          </View>
          <View className="image-uploader--identification">
            <Link text='File Input' onClick={() => props.handleImageSelector()} style={globalStyles.formSubTitle}></Link>
          </View>
        </View>
      </View>
    )
  }
}

export default FileUploader;
