import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import { childDropOff } from '../../helpers/events';
import CheckBox from '../CheckBox';
import style from './style';

class SeatBooking extends Component {

  constructor(props){
    super();

    this.state={
      students: {}
    }

    this.checkboxChange = this.checkboxChange.bind(this);
    this.submitForm=this.submitForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({students: nextProps.selectedEventDetails.students});
  }

  checkboxChange(child, checked) {
    const children = this.props.user.children;
    console.log('Here are the children: ', children)
    // let checkbox = e.target.value;
    const studentsCopy = Object.assign({}, this.state.students);

    // check if the checkbox is checked or unchecked
    if (checked) {
      // add the childDetails to the studentsCopy object
      studentsCopy[child]=children[child];
    } else {
      // remove the value from the unchecked checkbox from the array
      delete studentsCopy[child]
    }
    // update the state object with the new students selection
    this.setState({students: studentsCopy});
  }

  submitForm(e) {
    e.preventDefault();
    const props = this.props;
    // gather the students that are registered for the class
    const data = this.state.students;
    // close the child dropoff overlay
    props.toggleSeatBooking();
    // set the updated students group in the database
    childDropOff(data, props);
  }

  render() {
    const props = this.props;
    const { toggleSeatBooking, selectedEventDetails, currentEventIndex, visibility } = props;

    // handle the style that toggles the modal's visibility
    let isVisible = visibility ? style.isVisible : {}

    const childrenOutput = () => {
      const children = props.user.children || [];
      let output = [];
      if (children[0] == [' ']) return "You haven't added any of your children yet."
      for (let child in children) {

        // grab the profileImage from the child obj
        const { profileImage } = children[child];

        //
        let eventStudents = selectedEventDetails.students || {};
        let eventStudentsId = Object.keys(eventStudents);
        let childEventId = `${child}-${currentEventIndex}`
        let studentImage = profileImage != '../../../images/blank-profile-pic.png'
          ? {uri: profileImage}
          : require('../../../images/blank-profile-pic.png');
        let input =
          <CheckBox
            key={childEventId}
            imageSrc={studentImage}
            extraStyles={style.studentBubble}
            checkMark={true}
            onChange={(checked) => this.checkboxChange(child, checked) }
          />

        eventStudentsId.map((student) => {
          // check if the admin's child is enrolled for the class being viewed
          // if they are, default the checkbox to checked
          if(child === student){
            // input = <input type="checkbox" id={childEventId} name="students" value={child} defaultChecked />
          }
        })

        // template for the students
        let childIcon = 
          <View key={childEventId}>
            { input }
          </View>

        // move the childIcon into the output array
        output.push(childIcon);
      }
      return output;
    }

    return(
      <View style={[style.container, isVisible]}>
        <View style={style.innerContainer}>
          <TouchableHighlight 
            className="close-icon" 
            onPress={ () => toggleSeatBooking() }>
            <Text>X</Text>
          </TouchableHighlight>
          <View style={style.copy}>
            <Text style={style.text}>Please select which of your children will be attending</Text>
          </View>
          <View style={style.studentGroup}>
            { childrenOutput() }
          </View>
            {/*<Button className="button"
                               type="submit"
                               name="submit"
                               value="Request a seat" />*/}
        </View>
      </View>
    )
  }
}

export default SeatBooking;
