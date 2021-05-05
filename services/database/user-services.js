import firebase from '../../config/firebase/firebase';
import { fetchingUserData, fetchingUserDataSuccess, fetchingUserDataFailed } from '../../redux/fetch-user-data/actions';
import { fetchingImages } from '../../redux/fetch-images/actions';
import { IMAGES_PATH, USER_PATH } from './constants';
import { store } from '../../redux/store';
import User from '../../models/back-end-models/user';
import { getImagesFromIdList, deleteImage } from './image-services';
import PersonalInfo from '../../models/back-end-models/personal-info';

export const loadUser = (userId) => {
  store.dispatch(fetchingUserData());
  firebase.database().ref(USER_PATH + userId).once("value").then( snapshot => {
    const data = snapshot.val();
    console.log('user data is',data);
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
  firebase.database().ref(USER_PATH + id).set(userData);
}

export const removeImageFromUser = (userId, imageId, imageIndex) => {
  firebase.database().ref(USER_PATH + userId + '/' + IMAGES_PATH).orderByValue().equalTo(imageId)
    .on('child_added', snapshot => {
      const imageID = snapshot.val();
      console.log('snapshot')
      snapshot.ref.remove();
      deleteImage(imageId, imageIndex);
  });
}

export const retrieveImagesFromUser = (userId) => {
  console.log('retreiveingimagesfromuser');
  firebase.database().ref(USER_PATH + userId + '/' + IMAGES_PATH)
    .once('value').then( snapshot => {
      const data = snapshot.val();
      const imageIds = data ? Object.values(data) : [];
      getImagesFromIdList(imageIds);
    })
}