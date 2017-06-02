import React from 'react';
import { TiArrowLeft } from 'react-icons/lib/ti';

const BackButton = (props) => {

  // if there is no path designated for this button, default to going back to the previous page
  let link;
  const { app } = props;

  props.path 
    ? link = () => app.goToScene(props.path, {app})
    : link = () => { console.log('default for the back button') }

  return(
    <View className="back-button"> 
      <TouchableHighlight onClick={link}>
        <TiArrowLeft/>
      </TouchableHighlight>
    </View>
  )
};

export default BackButton;
