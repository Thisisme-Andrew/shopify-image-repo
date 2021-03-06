import styles from './index.module.css'
import { useState, useEffect } from 'react';
import LoginVerifier from "../../components/login-verifier/login-verifier";
import { useSelector } from 'react-redux';
import { uploadImage } from '../../services/database/image-services';
import { retrieveImagesFromUser } from '../../services/database/user-services';
import ImageTile from '../../components/image-tile/image-tile';
import { removeImageFromUser } from '../../services/database/user-services';
import TopBar from '../../components/top-bar/top-bar';

const UserPrivateProfile = () => {
  const images = useSelector(state => state.fetchImages.images);
  const userData = useSelector(state => state.login.userData);
  const [imageTitle, setImageTitle] = useState('');
  const [imagePublicAccess, setImagePublicAccess] = useState(false);
  const [imagesDisplay, setImagesDisplay] = useState(null);
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [imageFile, setImageFile] = useState();
  const [pageMessage, setPageMessage] = useState();

  useEffect(()=> {
    if(images){
      setPageMessage('Image Uploaded');
      setImagesDisplay(
        images.map((image, index) => (
          <ImageTile image={image}>
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
    setImageFile(file);
  }

  const imageUploader = () => {
    if(imageTitle && imageFile){
      uploadImage(imageFile, imageTitle, userData.id, imagePublicAccess) 
      setPageMessage('Uploading...');
    }else {
      setPageMessage(missingInfoFinder(imageTitle, imageFile))
    }
  }

  const missingInfoFinder = (imageTitle, imageFile) => {
    if(!imageTitle && !imageFile){
      return 'Image Title and Image is missing'
    }else if(imageFile){
      return 'Image Title is Missing'
    }else if(imageTitle){
      return 'No Image was uploaded'
    }
    return 'something went wrong'
  }


  return(
    <LoginVerifier>
      <TopBar/>
      <div>
        <h1>{userName}</h1>
        <p>{userEmail}</p>
        <div>{pageMessage}</div>
        <div>
          <input type="file" onChange={handleFileInput}/>
          <span>Image Title here:</span>
          <input type="text" value={imageTitle} onChange={text => setImageTitle(text.target.value)}/>
          <button onClick={() => {
            setImagePublicAccess(!imagePublicAccess);
          }}>
            Change publicAccess to {(!imagePublicAccess).toString()}
          </button>
          <button onClick={imageUploader}>Upload Image</button>
        </div>
        <div className={styles.imageDisplay}>
          {imagesDisplay !== [] ? imagesDisplay : 'There are no images here'}
        </div>
      </div>
    </LoginVerifier>  
  )
}

export default UserPrivateProfile;