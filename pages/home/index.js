import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginVerifier from '../../components/login-verifier/login-verifier';
import { userLogOut } from '../../services/database/auth-services';
import ProfileButton from '../../components/ui/profile-button';
import ImageTile from '../../components/image-tile/image-tile';
import { retrieveImagesFromImages } from '../../services/database/image-services';
import { goToNextPage } from '../../services/routing/redirect-service';
import { loadUser } from '../../services/database/user-services';

const Home = () => {
  const images = useSelector(state => state.fetchImages.images);
  const userData = useSelector(state => state.login.userData);
  const [imagesDisplay, setImagesDisplay] = useState(null);

  useEffect(()=> {
    if(images){
      console.log('imagedisplay')
      setImagesDisplay(
        images.map((image) => 
          <ImageTile image={image}>
            <button onClick={() => {
              goToNextPage('user-public-profile');
              loadUser(image.userId);
            }}>
              Go to AuthorPage
            </button>
          </ImageTile>
        )
      );
    }
  }, [images])

  useEffect(() => {
    if(userData){
      console.log('retrieveImages');
      retrieveImagesFromImages();
    }
  },[userData])

  return (
    <LoginVerifier>
      <div>
        something here
      </div>
      <button onClick={userLogOut}>Logout</button>
      <ProfileButton/>
      {imagesDisplay}
    </LoginVerifier>
  )
}

export default Home;