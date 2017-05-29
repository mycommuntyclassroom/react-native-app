export const validate = (value, type) => {
  let isValid = true;
  let regex = null;

  /* eslint-disable no-useless-escape */
  switch (type) {
    case 'email':
      regex = new RegExp(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/);
    break;
    default:
  }
  /* eslint-enable no-useless-escape */

  if (regex) {
    isValid = regex.exec(value);
  }

  return isValid;
};
