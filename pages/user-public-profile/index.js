import styles from './index.module.css';
import { useEffect, useState } from 'react';
import LoginVerifier from '../../components/login-verifier/login-verifier';
import { useSelector } from 'react-redux';
import { retrievePublicImagesFromUser } from '../../services/database/user-services';
import ImageTile from '../../components/image-tile/image-tile';
import { useRouter } from 'next/router'
import { loadUser } from '../../services/database/user-services';
import TopBar from '../../components/top-bar/top-bar';

const UserPublicProfile = () => {
  const router = useRouter();
  const userId = router.query.userId;

  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState(null);
  const [imagesDisplay, setImagesDisplay] = useState();
  const images = useSelector(state => state.fetchImages.images);
  const userData = useSelector(state => state.fetchUserData.user);
  if(!userData) {
    loadUser(userId);
  }
  useEffect(() => {
    if(userData){
      setUserName(userData.personalInfo.name);
      setUserEmail(userData.personalInfo.email);
      retrievePublicImagesFromUser(userData.id);
    }  
  }, [userData]);

  useEffect(()=> {
    if(images){
      setImagesDisplay(
        images.map(image => {
          if(image){
            return <ImageTile image={image}/>
          }
          return null;
        })
      );
    }
  }, [images])

  return(
    <LoginVerifier>
      <TopBar/>
      <div>
        <h1>{userName}</h1>
        <p>{userEmail}</p>
        <div className={styles.imagesDisplay}>
          {imagesDisplay ? imagesDisplay : 'There are no images here'}
        </div>
      </div>
    </LoginVerifier>  
  )
}

export default UserPublicProfile;