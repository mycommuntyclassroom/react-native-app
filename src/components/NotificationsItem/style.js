import styleVariables from '../../styles/variables';

const NotificationsItem = {};

NotificationsItem.container = {}

NotificationsItem.note = {
  paddingBottom: 17,
  borderBottomWidth: 1,
  borderColor: styleVariables.mc2lightGray
}

NotificationsItem.message = {
  color: styleVariables.mc2rusticRed,
  fontSize: 11,
  fontWeight: '500'
}

NotificationsItem.switch = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 10,
  height: 10,
  marginRight: 8,
  backgroundColor: styleVariables.mc2BlueElectric,
  borderRadius: 10
}

NotificationsItem.seen = {
  backgroundColor: '#b0b9c2'
}

NotificationsItem.decoCircle = {
  width: 5,
  height: 5,
  borderRadius: 20,
  backgroundColor: 'white'
}


NotificationsItem.noteInfo = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 17,
  alignItems: 'center'
}

export default NotificationsItem;