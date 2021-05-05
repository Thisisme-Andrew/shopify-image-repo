import { fetchUserDataActionTypes } from './actions';

const fetchUserDataInitialState = {
  isFetchingUserData: false,
  user: null,
  error: null,
};

export default function reducer(state = fetchUserDataInitialState, action) {
  switch(action.type) {
    case fetchUserDataActionTypes.FETCHING_USER_DATA: {
      return {
        ...state,
        isFetchingUserData: true,
      };
    }

    case fetchUserDataActionTypes.FETCHING_USER_DATA_SUCCESS: {
      console.log('is user being stored?', action.user);
      return {
        ...state,
        isFetchingUserData: false,
        user: action.user,
      };
    }

    case fetchUserDataActionTypes.FETCHING_USER_DATA_FAILED: {
      return {
        ...state,
        isFetchingUserData: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}