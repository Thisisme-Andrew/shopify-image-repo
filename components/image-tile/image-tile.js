import styles from './image-tile.module.css';

const ImageTile = ({
  image,
  children
}) => {
  if(!image) {
    return <div>waiting for image</div>
  }
  const url = image.url;

  return(
    <div>
      <img className={styles.image} src={url}></img>
      {children}
    </div>
  )  
}

export default ImageTile;