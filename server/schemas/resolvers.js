const { User, Pic, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')



const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('pics')
          
    
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },
    pics: async (parent, { username }) => {
      const params = username ? { username } : {};
      return (await Pic.find(params).sort({ createdAt: -1 }).populate('comments'));
    },
    pic: async (parent, { _id }) => {
      return Pic.findOne({ _id })
        .populate('comments')
    },
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('pics')
        
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('pics')
        
    },
  },
  Mutation: {
    addUser: async (parent,args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent,{ email,password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addPic: async (parent, args, context) => {
      if (context.user) {
        const pic = await Pic.create({ ...args, username: context.user.username });
    
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { pics: pic._id } },
          { new: true }
        );
    
        return pic;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, args, context) => {
      if (context.user) {
        const updatedPic = await Pic.findByIdAndUpdate(
          { _id: args.picId },
          { $push: {comments: { commentBody: args.commentBody, username: context.user.username } } },
          { new: true }
        );
        return updatedPic;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addReply: async (parent, { commentId, replyBody }, context) => {
      if (context.user) {
        const updatedComment = await Comment.findOneAndUpdate(
          { _id: commentId },
          { $push: { replies: { replyBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedComment;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    deleteComment: async (parent, args, context) => {
      console.log("here")
      if (context.user) {
        console.log(args.picId)
        const updatedPic = await Pic.findByIdAndUpdate(
          { _id: args.picId },
          { $pull: {comments: { _id: args.commentId } } },
          { new: true }
        );
        return updatedPic;
      }
    }
  }
};

module.exports = resolvers;