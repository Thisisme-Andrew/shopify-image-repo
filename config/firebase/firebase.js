import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDZhqFmt3F6LByqIPScBXsSRgoOOUUB1m8",
  authDomain: "shopify-be-project.firebaseapp.com",
  databaseURL: "https://shopify-be-project-default-rtdb.firebaseio.com",
  projectId: "shopify-be-project",
  storageBucket: "shopify-be-project.appspot.com",
  messagingSenderId: "76789579951",
  appId: "1:76789579951:web:ab154510ed0eb5cf65945a"
};
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

export default firebase;