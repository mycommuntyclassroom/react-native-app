import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import variables from './variables';

// save device dimensions
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const pagePadding = 15;

export const deviceDimensions = {
  deviceWidth,
  deviceHeight
}

const STYLE = {};

/* Global styles */

STYLE.fullscreen = {
  flex: 1
};

STYLE.deviceWidth = {
  width: deviceWidth
}

STYLE.deviceHeight = {
  height: deviceHeight
}

STYLE.loader = {
  flex: 1,
  height: 80,
  position: 'absolute'
};

STYLE.container = {
  flex: 1,
  // justifyContent: 'space-between',
  padding: 20,
  paddingBottom: 0
};

STYLE.title = {
  fontSize: 30
};

STYLE.text = {
  fontSize: 16
};

STYLE.addItem = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 22.5,
  height: 35,
  width: 35,
  padding: 10,
  shadowColor: 'rgba(51, 51, 112, 0.6)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1
}

/* Components */

STYLE.Button = {
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  padding: 13,
  borderRadius: 15
};

STYLE.ButtonText = {
  backgroundColor: 'transparent',
  color: 'white',
  textAlign: 'center',
  fontWeight: '500'
};

STYLE.Nav = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  zIndex: 100,
  height: '100%',
  width: '75%',
  top: 0
};

STYLE.NavText = {
  color: 'white'
};

STYLE.NavLink = {
  height: 50
};


// FORM Styles
// 
// bootstrap forms particular to forms
// 

STYLE.formContainer = {
  paddingLeft: pagePadding,
  paddingRight: pagePadding
}

STYLE.formTitle = {
  color: 'white',
  fontSize: 25,
  marginBottom: 10,
  textAlign: 'center'
}

STYLE.formSubTitle = {
  color: 'white',
  textAlign: 'center',
  fontWeight: '500'
}

STYLE.formImageContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

STYLE.formImage = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: deviceWidth - (pagePadding * 2 ),
  height: 320
}

STYLE.uploadImageButton = {
  backgroundColor: 'white',
  padding: 20,
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 10
}

STYLE.imagePickerTitle = {
  fontSize: 20,
  color: 'white',
  textAlign: 'center'
}

STYLE.closeImagePicker = {
  backgroundColor: 'maroon',
  padding: 10,
  alignItems: 'center',
  marginTop: 5,
  marginBottom: 5
}

STYLE.chooseImage = {
  backgroundColor: 'white',
  padding: 10,
  alignItems: 'center',
  marginTop: 5,
  marginBottom: 5
}

STYLE.textInput = {
  minHeight: 40, 
  borderRadius: 3,
  fontSize: 12,
  padding: 10,
  marginTop: 4,
  marginBottom: 4,
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.3)'
}

STYLE.formAddress2ndRow = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch'
}

STYLE.formAddressItem = {
  width: '32%'
}

STYLE.formAddressCenterPiece = {
  marginLeft: '2%',
  marginRight: '2%'
}

// CHECKBOX
// 
STYLE.checkboxContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'stretch',
  marginTop: 20
}
STYLE.checkboxSubTitle = {
  color: 'white',
  textAlign: 'center',
  width: '100%',
  fontWeight: '500'
}

export default StyleSheet.create(STYLE);
