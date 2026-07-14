import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation AddPost($input: AddPostInput!) {
    addPost(input: $input) {
      id
      title
      description
      content
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      id
      title
      description
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
