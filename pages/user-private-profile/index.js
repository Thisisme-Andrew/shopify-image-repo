import { useState, useRef, useEffect } from 'react';
import LoginVerifier from "../../components/login-verifier/login-verifier";
import { useSelector } from 'react-redux';
import { uploadImage } from '../../services/database/image-services';
import { retrieveImagesFromUser } from '../../services/database/user-services';
import ImageTile from '../../components/image-tile/image-tile';
import { removeImageFromUser } from '../../services/database/user-services';
import { goToNextPage } from '../../services/routing/redirect-service';

const UserPrivateProfile = () => {
  const images = useSelector(state => state.fetchImages.images);
  const userData = useSelector(state => state.login.userData);
  const [imageTitle, setImageTitle] = useState('');
  const [imagePublicAccess, setImagePublicAccess] = useState(false);
  const [imagesDisplay, setImagesDisplay] = useState(null);
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  // const fileInput = useRef(null);

  useEffect(()=> {
    if(images){
      setImagesDisplay(
        images.map((image, index) => (
          <ImageTile image={image}>
            <div>Public Access: {image ? image.publicAccess.toString() : <div></div>}</div>
            <button onClick={() => removeImageFromUser(userData.id, image.id, index)}>
              Remove
            </button>
          </ImageTile>
        ))
      );
    }
  }, [images])

  useEffect(() => {
    if(userData){
      setUserName(userData.name);
      setUserEmail(userData.email);
      retrieveImagesFromUser(userData.id);
    }
  },[userData])

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    uploadImage(file, imageTitle, userData.id, imagePublicAccess);
  }

  return(
    <LoginVerifier>
      <div>
        This is the users profile that should contain title, desciprtion, social tag, images and collections
        <div></div>
        <button onClick={() => {goToNextPage('home')}}>Go to Authorized Home</button>
        <h1>{userName}</h1>
        <p>{userEmail}</p> 
        <button onClick={() => {
          setImagePublicAccess(!imagePublicAccess);
        }}>
          Change publicAccess to {(!imagePublicAccess).toString()}
        </button>
        <form>
          <span>Image Title here:</span>
          <input type="text" value={imageTitle} onChange={text => setImageTitle(text.target.value)}/>
        </form>
        <input type="file" onChange={handleFileInput}/>
        {imagesDisplay !== [] ? imagesDisplay : 'There are no images here'}
      </div>
    </LoginVerifier>  
  )
}

export default UserPrivateProfile;