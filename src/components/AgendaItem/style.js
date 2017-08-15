/**
 * Created by nikitph on 8/6/17.
 */

const AgendaItem = {};

AgendaItem.container = {
  width: '100%',
  flexDirection:'column',
};

AgendaItem.titleRow = {
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'center'
};

AgendaItem.imageGroup = {
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'center',
};

AgendaItem.avatar = {
  height:32,
  width: 32,
  borderRadius: 16,
  marginRight:5
};

AgendaItem.textGroup = {
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'center',
  margin:5
};


AgendaItem.button = {
  backgroundColor: 'transparent',
  borderWidth: 1.5,
  borderRadius: 15,
  padding: 5,
  marginRight: 10,
  borderColor: 'rgba(102,108,114,0.8)',
};

AgendaItem.moreButton = {
  backgroundColor: '#B3C0CF',
  borderRadius: 7,
  padding: 3,
  marginRight: 10,
};

AgendaItem.buttonText = {
  color: 'rgba(0,0,0,0.7)',
  textAlign:'center',
  fontSize:11,
  fontWeight:'400'
};

AgendaItem.moreButtonText = {
  color: 'white',
  textAlign:'center',
  fontSize:12,
  paddingRight:5,
  paddingLeft:5,
  fontWeight:'200'
};

export default AgendaItem;