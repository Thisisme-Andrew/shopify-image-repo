import styles from './tile.module.css';

const Tile = ({
  children,
  onClick,
}) => {
  return (
    <button className={styles.button} onClick={onClick}>{children}</button>
  );
};

export default Tile;
