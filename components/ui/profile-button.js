import { goToNextPage } from '../../services/routing/redirect-service';

const ProfileButton = () => {
  const clickHandler = () => {
    goToNextPage('user-private-profile');
  }

  return (
    <button onClick={clickHandler}>Go to private Profile</button>
  )
}

export default ProfileButton;