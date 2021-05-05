import { store } from '../../redux/store';
import firebase from '../../config/firebase/firebase';
import {
  fetchingLoginStatus,
  fetchingLoginStatusComplete,
  loginSuccess,
  loginFailed,
  logout,
} from '../../redux/login/actions';
import { goToUnauthorizedLandingPage } from '../routing/redirect-service';
import ServiceAccessError from '../errors/service-access-error';


const createProvider = () => new firebase.auth.GoogleAuthProvider();

export const loginWithGooglePopup = () => {
  const provider = createProvider();
  firebase.auth().signInWithPopup(provider)
    .then((user) => {
      store.dispatch(loginSuccess(user));
      // executeSuccessAction();
    }).catch((error) => {
      store.dispatch(loginFailed());
      // executeFailureAction();
    });
}
export const loggedInCheck = () => {
  store.dispatch(fetchingLoginStatus());
  firebase.auth().onAuthStateChanged((user) => {
    store.dispatch(fetchingLoginStatusComplete(user));
  })
}

export const userLogOut = () => {
  firebase.auth()
    .signOut()
    .then(() => {
      store.dispatch(logout());
      goToUnauthorizedLandingPage();
      // executeSuccessAction();
    }).catch((error) => {
      // executeFailureAction();
    })
}


// const authService =  {
//   // if(!firebase) {
//   //   throw new ServiceAccessError('Please access AuthService through DatabaseService');
//   // }

//   this._successAction = null;
//   this._failureAction = null;
  
//   // const executeSuccessAction = () => {
//   //   if(this._successAction) {
//   //     this._successAction();
//   //   }
//   // }

//   // const executeFailureAction = () => {
//   //   if(this._failureAction) {
//   //     this._failureAction();
//   //   }
//   // }

//   const createProvider = () => new firebase.auth.GoogleAuthProvider();

//   // this.withSuccessAction = (action) => {
//   //   this._successAction = action;
//   //   return this;
//   // }

//   // this.withFailureAction = (action) => {
//   //   this._failureAction = action;
//   //   return this;
//   // }

// }

// export 