import firebase from '../../config/firebase/firebase';
import uniqid from 'uniqid';
import Image from '../../models/back-end-models/image';
import { store } from '../../redux/store';
import { 
  fetchingImages, 
  imageFetched, 
  removeImage, 
  addImage 
} from '../../redux/fetch-images/actions';
import { MAX_IMAGES_PER_PAGE } from './constants';

export const uploadImage = (file, title, userId, publicAccess) => {
  const id = uniqid();
  const ref = firebase.storage().ref('images/').child(id);

  ref.put(file).then(() => {

    ref.getDownloadURL()
      .then((downloadUrl) => {
        const newImage = Image({
          id: id,
          title: title,
          userId: userId,
          publicAccess: publicAccess,
          url: downloadUrl,
          dateAdded: Date.now()
        })
        firebase.database().ref('users/' + userId + '/images').push().set(id);
        firebase.database().ref('images/' + id).set(newImage);
        store.dispatch(addImage(newImage));
      });
  });
}

export const getImage = (imageId, imageIndex) => {
  firebase.database().ref('images/' + imageId)
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      store.dispatch(imageFetched(data, imageIndex));
    })
}

export const getImagesFromIdList = (idList) => {
  const numImages = idList.length;
  
  store.dispatch(fetchingImages(numImages));
  for(let i = 0; i < numImages; i++){
    getImage(idList[i], i);
  }
}

export const getPublicImage = (imageId, imageIndex) => {
  firebase.database().ref('images/')
    .orderByChild('publicAccess')
    .equalTo(true)
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      store.dispatch(imageFetched(data, imageIndex));
    })
}

export const getPublicImagesFromIdList = (idList) => {
  const numImages = idList.length;
  
  store.dispatch(fetchingImages(numImages));
  for(let i = 0; i < numImages; i++){
    getImage(idList[i], i);
  }
}

export const deleteImage = (imageId, imageIndex) => {
  firebase.database().ref('images/' + imageId).remove();
  firebase.storage().ref('images/' + imageId).delete();
  store.dispatch(removeImage(imageIndex));
}

export const retrieveHomePageImages = () => {
  const numImagesToDisplay = MAX_IMAGES_PER_PAGE;

  firebase.database().ref('images/')
    .orderByChild('publicAccess')
    .equalTo(true)
    .limitToLast(numImagesToDisplay)
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      const images = Object.values(data);
      store.dispatch(fetchingImages(images.length));

      for(let i = 0; i < images.length; i++) {
        store.dispatch(imageFetched(images[i], i));
      }
    })
}
