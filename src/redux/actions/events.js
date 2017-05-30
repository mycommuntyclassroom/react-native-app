export const setHostEvents = (eventData) => {
  return (dispatch) => {
    dispatch({ 
      type: 'BROWSING_HOSTS',
      eventData 
    });
  };
};
