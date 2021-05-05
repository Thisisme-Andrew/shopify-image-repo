  import { INDEX, HOME, ACCESS_DENIED } from './constants';
import Router from 'next/router';

export const goToUnauthorizedLandingPage = () => {
  Router.push('/');
}

export const goToAuthorizedLandingPage = () => {
  Router.push(HOME);
}

export const goToNextPage = (pageName) => {
  try {
    Router.push(pageName)
  } catch(error) {
    Router.push(ACCESS_DENIED);
  }
}
