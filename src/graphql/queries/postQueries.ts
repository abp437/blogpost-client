import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      description
      content
      createdAt
      author {
        name
      }
    }
  }
`;

export const GET_MY_POSTS = gql`
  query GetMyPosts {
    myPosts {
      id
      title
      description
      content
      createdAt
      author {
        name
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    post(id: $id) {
      id
      title
      description
      content
      createdAt
      updatedAt
      author {
        name
      }
    }
  }
`;
