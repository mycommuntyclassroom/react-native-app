export default function eventsReducer(state = [' '], action) {
  switch(action.type) {
    case 'BROWSING_HOSTS':
      return {
        ...action.eventData
      };
    default:
      return state;
  }
}
