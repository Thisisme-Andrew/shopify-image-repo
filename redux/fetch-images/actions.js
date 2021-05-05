export const fetchImagesActionTypes = {
  FETCHING_IMAGES: 'FECTHING_IMAGES',
  IMAGE_FETCHED: 'IMAGE_FETCHED',
  IMAGE_FETCH_FAILED: 'IMAGE_FETCH_FAILED',
  REMOVE_IMAGE: 'REMOVE_IMAGE',
  ADD_IMAGE: 'ADD_IMAGE'
}

export const fetchingImages = (numImages) => (dispatch) => {
  return dispatch({
    type: fetchImagesActionTypes.FETCHING_IMAGES,
    numImages: numImages
  });
}

export const imageFetched = (image, imageIndex) => (dispatch) => {
  return dispatch({
    type: fetchImagesActionTypes.IMAGE_FETCHED,
    image: image,
    imageIndex: imageIndex
  });
}

export const imageFetchFailed = (error, imageIndex) => (dispatch) => {
  return dispatch({
    type: fetchImagesActionTypes.IMAGE_FETCH_FAILED,
    error: error,
    imageIndex: imageIndex
  });
}

export const removeImage = (imageIndex) => (dispatch) => {
  return dispatch({
    type: fetchImagesActionTypes.REMOVE_IMAGE,
    imageIndex: imageIndex
  });
}

export const addImage = (image) => (dispatch) => {
  return dispatch({
    type: fetchImagesActionTypes.ADD_IMAGE,
    image: image
  })
}