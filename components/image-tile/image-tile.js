import styles from './image-tile.module.css';

const ImageTile = ({
  image,
  children
}) => {
  if(!image) {
    return <div>waiting for image</div>
  }
  const url = image.url;
  const title = image.title;
  const publicAccess = image.publicAccess;

  return(
    <div className={styles.mainContainer}>
      <img className={styles.image} src={url}></img>
      <div>
        <div>Title: {title}</div>
        <div>Public Access: {publicAccess}</div>
        {children}
      </div>
    </div>
  )  
}

export default ImageTile;