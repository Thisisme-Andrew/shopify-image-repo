import { fetchImagesActionTypes } from './actions';

const imagesInitialState = {
  images: null,
  errors: null
};

export default function reducer(state = imagesInitialState, action) {
  console.log(action);

  switch(action.type) {
    case fetchImagesActionTypes.FETCHING_IMAGES: {
      return {
        ...state,
        images: new Array(action.numImages).fill(null),
        errors: new Array(action.numImages).fill(null)
      };
    }
    
    case fetchImagesActionTypes.IMAGE_FETCHED: {
      let imagesCopy = [...state.images];

      if(!action.image){
        imagesCopy.splice(imagesCopy.length - 1, 1);
      }else {
        imagesCopy[action.imageIndex] = action.image;
      }
      console.log('READTHIS', imagesCopy);

      return {
        ...state,
        images: imagesCopy
      };
    }

    case fetchImagesActionTypes.IMAGE_FETCH_FAILED: {
      let errorsCopy = [...state.errors];
      errorsCopy[action.imageIndex] = action.error;

      return {
        ...state,
        errors: errorsCopy
      };
    }

    case fetchImagesActionTypes.REMOVE_IMAGE: {
      let imagesCopy = [...state.images];
      imagesCopy.splice(action.imageIndex, 1);
      let errorsCopy = [...state.errors];
      errorsCopy.splice(action.imageIndex, 1);

      return {
        ...state,
        images: imagesCopy
      };
    }
    
    case fetchImagesActionTypes.ADD_IMAGE: {
      let imagesCopy = [...state.images];
      imagesCopy.push(action.image);

      return {
        ...state,
        images: imagesCopy
      };
    }

    default:
      return state;
  }
}