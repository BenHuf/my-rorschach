const { Comment, User } = require('../models');

const commentController = {
  // add comment to User
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.UserId },
                { $push: { comments: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // remove comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deletedComment => {
                if (!deletedComment) {
                    return res.status(404).json({ message: 'No comment with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.UserId },
                    { $pull: { comments: params.commentId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
                }
                res.json(dbUserData);
            })
        .catch(err => res.json(err));
    },
    // TODO: add reply functionality?
};

module.exports = commentController;