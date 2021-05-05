import React, { useEffect, useLayoutEffect } from 'react'
import Test from './testComponent';
import { loginWithGooglePopup, loggedInCheck } from '../services/database/auth-services';
import { useSelector } from 'react-redux';
import { goToAuthorizedLandingPage } from '../services/routing/redirect-service';
// import { loggedInCheck } from '../services/database/auth-service';

const Index = () => {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const isFetchingLoginStatus = useSelector(state => state.login.isFetchingLoginStatus);

  useLayoutEffect(() => {
    if(isLoggedIn === null) {
      loggedInCheck();
    }
  }, []);

  useEffect(() => {
    if(isLoggedIn) {
      goToAuthorizedLandingPage();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <button onClick={loginWithGooglePopup}>Login</button>
      {/* <Test></Test> */}
    </div>
  )
}

export default Index;

// Auth
// How to keep user data when page is refreshed. (probably just check with firebase if they still logged in)
// add user to realtime database when someone logs in.
// This is in the components 