import { GET_GALLERIES, GET_GALLERY, FILTER_GALLERIES_BY_MEDIA, ORDER_GALLERIES_BY_DATE } from './actions'


const initialState = {
  galleries: [],
  gallery: '',
  galleriesLoaded: false,
  filteredItems: [],
  media: '',
  items: [],
  sort: ''
};


export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case GET_GALLERIES:
      return {
        ...state,
        galleries: data,
        galleriesLoaded: true,
        items: data,
        filteredItems: data,  
      };
    case GET_GALLERY:
      return {
        ...state,
        gallery: data,
        galleriesLoaded: true, 
      };
    case FILTER_GALLERIES_BY_MEDIA:
      return {
        ...state,
        filteredItems: action.payload.items,
        size: action.payload.size,
      };
    case ORDER_GALLERIES_BY_DATE:
      return {
        ...state,
        filteredItems: data.items,
        sort: data.sort,
      };
    default:
      return state;
  }
}







