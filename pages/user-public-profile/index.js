import { useEffect, useState } from 'react';
import LoginVerifier from '../../components/login-verifier/login-verifier';
import { useSelector } from 'react-redux';
import { retrieveImagesFromUser } from '../../services/database/user-services';
import ImageTile from '../../components/image-tile/image-tile';
import { goToNextPage } from '../../services/routing/redirect-service';

const UserPublicProfile = () => {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [imagesDisplay, setImagesDisplay] = useState();
  const images = useSelector(state => state.fetchImages.images);
  const userData = useSelector(state => state.fetchUserData.user);

  useEffect(() => {
    if(userData){
      setUserName(userData.personalInfo.name);
      setUserEmail(userData.personalInfo.email);
      retrieveImagesFromUser(userData.id);
    }  
  }, [userData]);

  useEffect(()=> {
    if(images){
      setImagesDisplay(
        images.map(image => {
          console.log('this is what image is', image)
          if(image && image.publicAccess) {
            return <ImageTile image={image}/>
          }
          return null;
        }
        )
      );
    }
  }, [images])

  return(
    <LoginVerifier>
      <div>
        This is the users profile that should contain title, desciprtion, social tag, images and collections
        <div></div>
        <button onClick={() => {goToNextPage('home')}}>Go to Authorized Home</button>
        <h1>{userName}</h1>
        <p>{userEmail}</p>
        {imagesDisplay}
      </div>
    </LoginVerifier>  
  )
}

export default UserPublicProfile;