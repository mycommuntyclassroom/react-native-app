import styleVariables from '../../styles/variables';

const NotificationsItem = {};


NotificationsItem.note = {
  paddingBottom: 17,
  borderBottomWidth: 1,
  borderColor: styleVariables.mc2lightGray
}

NotificationsItem.message = {
  color: styleVariables.mc2rusticRed,
  fontSize: 13,
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

NotificationsItem.actionItems = {
  flexDirection: 'row',
  marginLeft: 17,
  marginTop: 5
}

NotificationsItem.connectDelete = {
  width: 80,
  padding: 5,
  borderRadius: 30,
  marginRight: 6,
  alignItems: 'center',
}

NotificationsItem.connectDeleteText = {
  color: 'white',
}

NotificationsItem.delete = {
  backgroundColor: 'gray',
  paddingRight: 15,
  alignItems: 'flex-end',
  width: 100,
  left: -27
}

NotificationsItem.connect = {
  backgroundColor: styleVariables.mc2BlueElectric,
  zIndex: 1
}

NotificationsItem.ctaButtons = {
  flexDirection: 'row'
}

NotificationsItem.profileView = {
  color: styleVariables.mc2rusticRed,
  fontWeight: '600',
  top: 5
}

NotificationsItem.displayName = {
  color: styleVariables.mc2fontGray,
}

export default NotificationsItem;