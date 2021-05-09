import React, { useEffect, useLayoutEffect } from 'react'
import { loginWithGooglePopup, loggedInCheck } from '../services/database/auth-services';
import { useSelector } from 'react-redux';
import { goToAuthorizedLandingPage } from '../services/routing/redirect-service';

const Index = () => {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);

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
    </div>
  )
}

export default Index;