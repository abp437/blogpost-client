import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation AddPost($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: ID!
    $title: String!
    $content: String!
  ) {
    updatePost(
      id: $id
      title: $title
      content: $content
    ) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;
