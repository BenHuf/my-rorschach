import { gql } from '@apollo/client';

export const QUERY_PICS = gql`
  query pics($username: String) {
    pics(username: $username) {
      _id
      pngString
      createdAt
      username
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;


export const QUERY_PIC = gql`
  query pic($id: ID!) {
    pic(_id: $id) {
      _id
      pngString
      createdAt
      username
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      pics {
        _id
        pngString
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      pics {
        _id
        pngString
        createdAt
        comments {
          _id
          createdAt
          commentBody
          username
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;