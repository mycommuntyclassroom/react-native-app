const FeedbackForm = {};

FeedbackForm.container = {
  width: '100%',
  flex:1,
  flexDirection:'column',
  marginBottom: 90
};

FeedbackForm.titleRow = {
  flexDirection:'column',
  justifyContent:'flex-start',
  padding:20
};

FeedbackForm.questionStyle = {
  fontSize:18,
  fontFamily: 'AvenirNext-Regular',
  fontWeight:'200',
  color:'rgba(0,0,0,0.7)',
  textAlign:'center'
};

FeedbackForm.imageGroup = {
  flexDirection:'column',
  justifyContent:'flex-start',
  marginRight:20,
  marginLeft:20
};

FeedbackForm.avatar = {
  height:32,
  width: 32,
  borderRadius: 16,
  marginRight:5
};

FeedbackForm.textGroup = {
  flexDirection:'column',
  justifyContent:'flex-start',
  alignItems:'stretch',
  padding:20
};


FeedbackForm.button = {
  backgroundColor: 'transparent',
  borderWidth: 1.5,
  borderRadius: 15,
  padding: 5,
  marginRight: 10,
  borderColor: 'rgba(102,108,114,0.8)',
};

FeedbackForm.moreButton = {
  backgroundColor: '#B3C0CF',
  borderRadius: 7,
  padding: 3,
  marginRight: 10,
};

FeedbackForm.buttonText = {
  color: 'rgba(0,0,0,0.7)',
  textAlign:'center',
  fontSize:11,
  fontWeight:'400'
};

FeedbackForm.moreButtonText = {
  color: 'white',
  textAlign:'center',
  fontSize:12,
  paddingRight:5,
  paddingLeft:5,
  fontWeight:'200'
};

export default FeedbackForm;