import AWSAppSyncClient from 'aws-appsync'
import appSyncConfig from '../../aws-exports'

import {getAllGalleries, getAGallery} from '../../GraphQL/queries'

export const GET_GALLERIES = 'GET_GALLERIES';
export const GET_GALLERY = 'GET_GALLERY';
export const RESET_GALLERY = 'RESET_GALLERY';
export const ORDER_GALLERIES_BY_DATE = 'ORDER_GALLERIES_BY_DATE'
export const FILTER_GALLERIES_BY_MEDIA = 'FILTER_GALLERIES_BY_MEDIA'


// 
// Set up Apollo Client
// const client = new AWSAppSyncClient({
//   url: appSyncConfig.aws_appsync_graphqlEndpoint,
//   region: appSyncConfig.aws_appsync_region,
//   auth: {
//     type: appSyncConfig.aws_appsync_authenticationType,
//     apiKey: appSyncConfig.aws_appsync_apiKey,
//   },
  // TODO - look up how to set cacheOptions correctly
//   cacheOptions: { }     
// })


export function getGalleries() {
  // const query = getAllGalleries
  return async function (dispatch) {
    // const data = await client.query({ query: query })
    //  const galleries =  await {data}.data.data.getGalleries.galleries
    return dispatch(
      {
      type: 'GET_GALLERIES',
      // data: galleries,
      }
    );
  };
}

export const filterGalleries = (galleries, media) => (dispatch) => {
  dispatch({
    type: FILTER_GALLERIES_BY_MEDIA,
    payload: {
      media: media,
      items:
        media === ""
          ? galleries
          : galleries.filter(
              (x) => x.media.indexOf(media.toLowerCase()) >= 0
            ),
    },
  });
};

export const sortGalleries = (items, sort) => (dispatch) => {
  const galleries = items.slice();
  if (sort !== "") {
    galleries.sort((a, b) =>
      sort === "newestdate"
        ? a.startDate > b.startDate
          ? 1
          : -1
        : a.startDate < b.startDate
        ? 1
        : -1
    );
  } else {
    sortGalleries.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  dispatch({
    type: ORDER_GALLERIES_BY_DATE,
    payload: {
      sort: sort,
      items: galleries,
    },
  });
};


export function getGallery(id) {
  // const query = getAGallery
  return async function (dispatch) {
    // const data = await client.query({ query: query })
    // const gallery =  {data}.data.data.getGallery
    return dispatch({
      type: 'GET_GALLERY',
      // data: gallery,
    });
  };
}




