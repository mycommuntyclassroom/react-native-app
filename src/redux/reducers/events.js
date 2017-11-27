export default function eventsReducer(state = [' '], action) {
  console.log('eventsReducer action: ', action);
  switch(action.type) {
    case 'BROWSING_HOSTS':
      return {
        ...action.eventData
      };
    default:
      return state;
  }
}
