import styleVariables from '../../styles/variables';

const summary = {};

summary.container = {
  backgroundColor: 'white',
  paddingLeft: 16,
  paddingRight: 16
}

summary.raitingsAndComments = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 6
}

summary.raitings = {
  display: 'flex',
  flexDirection: 'row'
}

summary.comments = {
  display: 'flex',
  flexDirection: 'row'
}

summary.summaryCopy = {
  color: styleVariables.mc2fontGray
}

summary.tagItem = {
  backgroundColor: styleVariables.mc2medGray,
  padding: 8,
  paddingLeft: 15,
  paddingRight: 15,
  borderRadius: 16
}

summary.tagItemCopy = {
  color: 'black'
}

export default summary;