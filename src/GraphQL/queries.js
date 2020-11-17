
import gql from 'graphql-tag';


export const getAGallery = gql `
  query getGallery {
    getGallery(id:106) {
      id
      name
      logo
      phone
      address
      website
      ups
      downs
      exhibits{
        showHero
        title
        media
        date
        startDate
        endDate
        artist
        curator
        showTeaser
        showDescription
      }
    } 
  }
`;
export const getGalleryByName = gql `
  query GetGalleryByName($name: String) {
    getGalleryByName(name: $name) {
      galleries {
        id
        name
        logo
        phone
        address
        website
        ups
        downs
        tags
        exhibits {
          showHero
          title
          media
          date
          startDate
          endDate
          artist
          curator
          showTeaser
          showDescription
          tags
        }
      }
    }
  }
`;
export const getAllGalleries = gql `
  query GetGalleries {
    getGalleries {
      galleries {
        id
        name
        logo
        phone
        address
        website
        ups
        downs
        tags
        exhibits {
          showHero
          title
          media
          date
          startDate
          endDate
          artist
          curator
          showTeaser
          showDescription
          tags
        }
      }
    }
  }
`;
export const getGalleriesByTag = gql `
  query GetGalleriesByTag($tag: String) {
    getGalleriesByTag(tag: $tag) {
      galleries {
        id
        name
        logo
        phone
        address
        website
        ups
        downs
        tags
        exhibits {
          showHero
          title
          media
          date
          startDate
          endDate
          artist
          curator
          showTeaser
          showDescription
          tags
        }
      }
    }
  }
`;
export const getExhibits = gql `
  query GetExhibits {
    getExhibits {
      galleries {
        id
        name
        logo
        phone
        address
        website
        ups
        downs
        tags
        exhibits {
          showHero
          title
          media
          date
          startDate
          endDate
          artist
          curator
          showTeaser
          showDescription
          tags
        }
      }
    }
  }
`;
export const getExhibitByTitle = gql `
  query GetExhibitByTitle($title: String) {
    getExhibitByTitle(title: $title) {
      exhibits {
        showHero
        title
        media
        date
        startDate
        endDate
        artist
        curator
        showTeaser
        showDescription
        tags
      }
    }
  }
`;
