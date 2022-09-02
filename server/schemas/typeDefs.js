const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    Pics: [Pic]  
  }

  type Pic {
    _id: ID
    pngString: String
    createdAt: String
    username: String
    comments: [Comment]
    collaborators: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

  type Query{
    me: User
    users: [User]
    user(username: String!): User
    pics(username: String) : [Pic]
    pic(_id: ID!): Pic

  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPic(pngString: String!): Pic
    addComment(picId: ID!, commentBody: String!): Pic
  }
`

module.exports = typeDefs;