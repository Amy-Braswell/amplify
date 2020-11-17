import gql from 'graphql-tag';

export const deleteExhibit = gql `
  mutation DeleteExhibit($id: ID!, $title: String) {
    deleteExhibit(id: $id, title: $title) {
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
`;
export const addTag = gql`
  mutation AddTag($id: ID!, $tag: String!) {
    addTag(id: $id, tag: $tag) {
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
`;
export const removeTag = gql `
  mutation RemoveTag($id: ID!, $tag: String!) {
    removeTag(id: $id, tag: $tag) {
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
`;
export const deleteGallery = gql `
  mutation DeleteGallery($id: ID!) {
    deleteGallery(id: $id) {
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
`;
export const upvoteGallery = gql `
  mutation UpvoteGallery($id: ID!) {
    upvoteGallery(id: $id) {
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
`;
export const downvoteGallery = gql `
  mutation DownvoteGallery($id: ID!) {
    downvoteGallery(id: $id) {
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
`;
export const addExhibitTag = gql `
  mutation AddExhibitTag($title: String!, $tag: String!) {
    addExhibitTag(title: $title, tag: $tag) {
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
`;
export const addExhibit = gql `
  mutation AddExhibit(
    $id: ID!
    $showHero: String
    $title: String
    $media: [String]
    $date: String
    $startDate: String
    $endDate: String
    $artist: [String]
    $curator: [String]
    $showTeaser: String
    $showDescription: String
  ) {
    addExhibit(
      id: $id
      showHero: $showHero
      title: $title
      media: $media
      date: $date
      startDate: $startDate
      endDate: $endDate
      artist: $artist
      curator: $curator
      showTeaser: $showTeaser
      showDescription: $showDescription
    ) {
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
`;
export const addGallery = gql `
  mutation AddGallery(
    $id: ID!
    $name: String!
    $logo: String
    $phone: String
    $address: String
    $website: String
  ) {
    addGallery(
      id: $id
      name: $name
      logo: $logo
      phone: $phone
      address: $address
      website: $website
    ) {
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
`;
export const updateGallery = gql `
  mutation UpdateGallery(
    $id: ID!
    $name: String
    $logo: String
    $phone: String
    $address: String
    $website: String
  ) {
    updateGallery(
      id: $id
      name: $name
      logo: $logo
      phone: $phone
      address: $address
      website: $website
    ) {
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
`;
