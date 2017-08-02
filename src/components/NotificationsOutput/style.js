import styleVariables from '../../styles/variables'

const NotificationsOutput = {}; 

NotificationsOutput.container = {
  backgroundColor: 'white',
  flex: 1,
  padding: 10,
  paddingTop: 0,
  marginBottom: 65
}

NotificationsOutput.note = {
  paddingBottom: 17,
  borderBottomWidth: 1,
  borderColor: styleVariables.mc2lightGray
}

NotificationsOutput.message = {
  color: styleVariables.mc2rusticRed,
  fontSize: 11,
  fontWeight: '500'
}

NotificationsOutput.switch = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 10,
  height: 10,
  marginRight: 8,
  backgroundColor: styleVariables.mc2BlueElectric,
  borderRadius: 10
}

NotificationsOutput.seen = {
  backgroundColor: '#b0b9c2'
}

NotificationsOutput.decoCircle = {
  width: 5,
  height: 5,
  borderRadius: 20,
  backgroundColor: 'white'
}


NotificationsOutput.noteInfo = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 17,
  alignItems: 'center'
}

export default NotificationsOutput;