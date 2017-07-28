import { deviceDimensions } from '../../styles';
const { deviceWidth, deviceHeight } = deviceDimensions;

const SeatBooking = {};

SeatBooking.container = {
  display: 'flex',
  position: 'absolute',
  top: deviceHeight / 3,
  width: deviceWidth,
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: 'rgba(51, 51, 112, 0.4)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  opacity: 0
}

SeatBooking.innerContainer = {
  padding: 10
}

SeatBooking.studentBubble = {
  position: 'relative',
  width: 80,
  height: 80,
  overflow: 'hidden',
  borderRadius: 40,
  backgroundColor: 'transparent'
}

SeatBooking.studentGroup = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
}

SeatBooking.copy = {
  alignItems: 'center',
  marginBottom: 8
}

SeatBooking.text = {
  maxWidth: 200,
  lineHeight: 16,
  textAlign: 'center'
}

SeatBooking.isVisible = {
  opacity: 1
}

export default SeatBooking;