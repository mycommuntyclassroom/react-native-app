const Invite = {};

Invite.container = {
  width: '100%',
  flex:1,
  flexDirection:'column',
  marginBottom: 90
};

Invite.titleRow = {
  flexDirection:'column',
  justifyContent:'flex-start',
  padding:20
};

Invite.questionStyle = {
  fontSize:18,
  fontFamily: 'AvenirNext-Regular',
  fontWeight:'200',
  color:'rgba(0,0,0,0.7)',
  textAlign:'center'
};

Invite.imageGroup = {
  flexDirection:'column',
  justifyContent:'flex-start',
  marginRight:20,
  marginLeft:20
};

Invite.avatar = {
  height:32,
  width: 32,
  borderRadius: 16,
  marginRight:5
};

Invite.textGroup = {
  flexDirection:'column',
  justifyContent:'flex-start',
  alignItems:'stretch',
  padding:20
};


Invite.button = {
  backgroundColor: 'transparent',
  borderWidth: 1.5,
  borderRadius: 15,
  padding: 5,
  marginRight: 10,
  borderColor: 'rgba(102,108,114,0.8)',
};

Invite.moreButton = {
  backgroundColor: '#B3C0CF',
  borderRadius: 7,
  padding: 3,
  marginRight: 10,
};

Invite.buttonText = {
  color: 'rgba(0,0,0,0.7)',
  textAlign:'center',
  fontSize:11,
  fontWeight:'400'
};

Invite.moreButtonText = {
  color: 'white',
  textAlign:'center',
  fontSize:12,
  paddingRight:5,
  paddingLeft:5,
  fontWeight:'200'
};

export default Invite;