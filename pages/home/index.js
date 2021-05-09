import styles from './index.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginVerifier from '../../components/login-verifier/login-verifier';
import ImageTile from '../../components/image-tile/image-tile';
import { retrieveHomePageImages } from '../../services/database/image-services';
import { goToNextPage } from '../../services/routing/redirect-service';
import TopBar from '../../components/top-bar/top-bar';

const Home = () => {
  const images = useSelector(state => state.fetchImages.images);
  const userData = useSelector(state => state.login.userData);
  const [imagesDisplay, setImagesDisplay] = useState(null);

  useEffect(()=> {
    if(images){
      setImagesDisplay(
        images.map((image) => 
          <ImageTile image={image}>
            <button onClick={() => {
              goToNextPage('user-public-profile', { userId: image.userId });
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
      retrieveHomePageImages();
    }
  },[userData])

  return (
    <LoginVerifier>
      <TopBar/>
      <div>
        <h1>Home</h1>
      </div>
      <div className={styles.imagesDisplay}>
        {imagesDisplay !== [] ? imagesDisplay : 'There are no images here'}
      </div>
    </LoginVerifier>
  )
}

export default Home;