import { deviceDimensions } from '../../styles';
const { deviceWidth, deviceHeight } = deviceDimensions;

const SeatBooking = {};

SeatBooking.container = {
  display: 'flex',
  position: 'absolute',
  top: deviceHeight / 5,
  left: deviceWidth / 10,
  // backgroundColor: 'gray',
  justifyContent: 'center',
  alignItems: 'center',
  
}

SeatBooking.innerContainer = {
  width: 300,
  padding: 10,
  backgroundColor: 'yellow'
}

SeatBooking.studentBubble = {
  position: 'relative',
  width: 80,
  height: 80,
  overflow: 'hidden',
  borderRadius: 40
}

SeatBooking.studentGroup = {
  display: 'flex',
  flexDirection: 'row'
}

export default SeatBooking;