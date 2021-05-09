import firebase from '../../config/firebase/firebase';
import { fetchingUserData, fetchingUserDataSuccess } from '../../redux/fetch-user-data/actions';
import { IMAGES_PATH, USER_PATH } from './constants';
import { store } from '../../redux/store';
import User from '../../models/back-end-models/user';
import { getImagesFromIdList, getPublicImagesFromIdList, deleteImage } from './image-services';
import PersonalInfo from '../../models/back-end-models/personal-info';
import { MAX_IMAGES_PER_PAGE } from './constants';

export const loadUser = (userId) => {
  store.dispatch(fetchingUserData());
  firebase.database().ref(USER_PATH + userId).once("value").then( snapshot => {
    const data = snapshot.val();
    store.dispatch(fetchingUserDataSuccess(data));
  })
}

export const addUserIfNew = (userId, name, email) => {
  firebase.database().ref(USER_PATH + userId).once("value", snapshot => {
    if(!snapshot.exists()){
      const newUser = User({ 
        id: userId,
        personalInfo: PersonalInfo({
          name: name,
          email: email
        })
      });
      addUser(newUser);
    }
 });
}

export const addUser = (userData) => {
  const id = userData.id;
  firebase.database().ref(USER_PATH + id)
    .set(userData);
}

export const removeImageFromUser = (userId, imageId, imageIndex) => {
  firebase.database().ref(USER_PATH + userId + '/' + IMAGES_PATH)
    .orderByValue()
    .equalTo(imageId)
    .on('child_added', snapshot => {
      const imageID = snapshot.val();
      snapshot.ref.remove();
      deleteImage(imageId, imageIndex);
  });
}

export const retrieveImagesFromUser = (userId) => {
  firebase.database().ref(USER_PATH + userId + '/' + IMAGES_PATH)
    .once('value')
    .then( snapshot => {
      const data = snapshot.val();
      const imageIds = data ? Object.values(data) : [];
      getImagesFromIdList(imageIds);
    })
}

export const retrievePublicImagesFromUser = (userId) => {
  const numImagesToDisplay = MAX_IMAGES_PER_PAGE;

  firebase.database().ref(USER_PATH + userId + '/' + IMAGES_PATH)
    .limitToLast(numImagesToDisplay)
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      const images = Object.values(data);

      getPublicImagesFromIdList(images)
    })
}