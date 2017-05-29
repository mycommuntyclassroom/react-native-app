import Firebase from './firebase';

const User = {};

User.logOut = () => {
  localStorage.removeItem('user-token');
  location.href = '/';
};

User.logIn = () => {
  return new Promise((resolve, reject) => {

    const token = localStorage.getItem('user-token');
    const loginError = localStorage.getItem('login-error');

    const loginWithRedirect = () => {
      Firebase.getGithubToken(
        result => {
          const { user, credential } = result;

          // Cache user token
          if (credential) {
            const { accessToken } = credential;
            localStorage.setItem('user-token', accessToken);
          }

          resolve(user);
        },
        error => {
          localStorage.setItem('login-error', error.message);
          resolve();
        }
      );
    };

    const loginWithToken = () => {
      Firebase.githubLoginWithToken(
        token,
        user => {
          resolve(user);
        },
        error => {
          localStorage.setItem('login-error', error.message);
          resolve();
        }
      );
    };

    // Check for login error (from github redirect)
    if (loginError) {
      console.error('Login Error:', loginError);
      localStorage.removeItem('login-error');
      localStorage.removeItem('user-token');
      resolve();
    }

    // Set user from token (if already logged in)
    // Otherwise set user from Github Redirect
    token ? loginWithToken() : loginWithRedirect();
  });
};

User.save = (users, user) => {

  // Scrape user object (provided by github)
  const { uid, displayName, email, photoURL } = user;

  // If this is a first-time login, create a record for this user
  let newUserData = {
    uid,
    displayName,
    email,
    photoURL
  };

  // If a user already exists, update the fields from github we care about
  const existingUser = users[uid];
  if (existingUser) {
    newUserData = { ...existingUser, ...newUserData };
  }

  // Save user in firebase
  Firebase.set(`users/${uid}`, newUserData);
};

export default User;
