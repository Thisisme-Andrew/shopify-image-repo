import { useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { goToUnauthorizedLandingPage } from '../../services/routing/redirect-service';
import { loggedInCheck } from '../../services/database/auth-services';

const LoginVerifier = ({
  children
}) => {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const isFetchingLoginStatus = useSelector(state => state.login.isFetchingLoginStatus);

  useLayoutEffect(() => {
    if(isLoggedIn === null) {
      loggedInCheck();
    }
  }, []);

  useEffect(() => {
    if(isFetchingLoginStatus === false && isLoggedIn === false) {
      goToUnauthorizedLandingPage();
    }
  }, [isFetchingLoginStatus]);

  if(isFetchingLoginStatus || !isLoggedIn) {
    return null;
  }

  return (<div>{children}</div>);
}

export default LoginVerifier;