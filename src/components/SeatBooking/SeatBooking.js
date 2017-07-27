import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import { getHostEvents, childDropOff } from '../helpers/events';

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
    const props = this.props
    
    const { toggleSeatBooking, selectedEventDetails, currentEventIndex } = props;

    function childrenOutput() {
      const children = props.user.children || [];
      let output = [];
      if (children[0] == [' ']) return "You haven't added any of your children yet."
      for (let child in children) {

        // grab the profileImage from the child obj
        const { profileImage } = children[child];

        // setup inline styles for the BG image
        var ImageStyles = {
          backgroundImage: `url('${profileImage}')`,
          backgroundSize: 'cover'
        };

        //
        let eventStudents = selectedEventDetails.students || {};
        let eventStudentsId = Object.keys(eventStudents);
        let childEventId = `${child}-${currentEventIndex}`
        let input = <CheckBox type="checkbox" id={childEventId} name="students" value={child} />
        let input =
          <CheckBox
            label={child}
            key={childEventId}
            onChange={(checked) => this.checkboxChange(item, category, checked) }
          />

        eventStudentsId.map((student) => {
          // check if the admin's child is enrolled for the class being viewed
          // if they are, default the checkbox to checked
          if(child === student){
            input = <input type="checkbox" id={childEventId} name="students" value={child} defaultChecked />
          }
        })

        // template for the students
        let childIcon = 
          <span key={childEventId}>
            { input }
            <label htmlFor={childEventId} style={ImageStyles}></label>
          </span>

        // move the childIcon into the output array
        output.push(childIcon);
      }
      return output;
    }

    return(
      <div className={`seat-booking ${props.visibility}`}>
        <div className="inner-container">
          <div className="close-icon" onClick={ () => toggleSeatBooking() }>X</div>
          <h3>Please select which of your children will be attending</h3>
          <form onSubmit={ this.submitForm } >
            <section className="child-group" onChange={ this.checkboxChange }>
              { childrenOutput() }
            </section>
            <input className="button"
                   type="submit"
                   name="submit"
                   value="Request a seat" />
          </form>
        </div>
      </div>
    )
  }
}

export default SeatBooking;
