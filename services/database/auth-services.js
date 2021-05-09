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

const createProvider = () => new firebase.auth.GoogleAuthProvider();

export const loginWithGooglePopup = () => {
  const provider = createProvider();
  firebase.auth().signInWithPopup(provider)
    .then((user) => {
      store.dispatch(loginSuccess(user));
    }).catch((error) => {
      store.dispatch(loginFailed());
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
    })
}
