import styles from './top-bar.module.css';
import Tile from '../../components/tile/tile';
import { goToNextPage } from '../../services/routing/redirect-service';
import { userLogOut } from '../../services/database/auth-services';

const TopBar = () => {
  const homeTile = <Tile onClick={() => goToNextPage('home')}>Home</Tile>;
  const profileTile = <Tile onClick={() => goToNextPage('user-private-profile')}>My Profile</Tile>
  const logoutTile = <Tile onClick={userLogOut}>Logout</Tile>;
  return (
    <div className={styles.container}>
      {[homeTile, profileTile]}
      <div className={styles.trailing}>{logoutTile}</div>
    </div>
  );
};

export default TopBar;
