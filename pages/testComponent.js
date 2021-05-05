import React, { useRef, useState } from "react";
import firebase from '../config/firebase/firebase';

const Test = () => {
  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileInput = (e) => {
      const file = e.target.files[0];
      const hardcodedId = '1234';
      uploadImageWithId(file, hardcodedId);
  }

  const uploadImageWithId = (file, id) => {
    const ref = firebase.storage().ref().child(id);
    ref.put(file).then(() => {
    });
  }

  const loadImageUrlById = (id) => {
    const ref = firebase.storage().ref().child(id);
    ref.getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      });
  }

  const test = () => {

  const numberOfUsers = 3;
  const randomIndex = Math.floor(Math.random() * numberOfUsers) + 1;
  
  var ref = firebase.database().ref('images');
  
  ref.limitToLast(1).limitToFirst(randomIndex).once('value').then(snapshot =>
  // ref.limitToFirst(randomIndex).limitToLast(1).once('value').then(snapshot =>
  {
      var user = snapshot.val();
  });
}

  return (
      <div className="file-uploader">
          <input type="file" onChange={handleFileInput}/>
          <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary">Upload</button>
          <button onClick={() => loadImageUrlById("1234")}>Load image 1234</button>
          <button onClick={test}/>
          <img src={imageUrl}/>
      </div>
  )
};

export default Test;