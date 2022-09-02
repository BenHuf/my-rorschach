const { faker } = require('@faker-js/faker')

const db = require('../config/connection');
const { Pic, User } = require('../models');

db.once('open', async () => {
  await Pic.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);
  console.log(createdUsers)
  const createdUserArray = await User.find().select('-__v -password').populate('pics')
  console.log(createdUserArray)
  // // create friends
  // for (let i = 0; i < 100; i += 1) {
  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { _id: userId } = createdUsers.ops[randomUserIndex];

  //   let friendId = userId;

  //   while (friendId === userId) {
  //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //     friendId = createdUsers.ops[randomUserIndex];
  //   }

  //   await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  // }

  // create Pics
  let createdPics = [];
  for (let i = 0; i < 100; i += 1) {
    const pngString = faker.random.alphaNumeric(100)

    const randomUserIndex = Math.floor(Math.random() * createdUserArray.length);
    const { username, _id: userId } = createdUserArray[randomUserIndex];

    const createdPic = await Pic.create({ pngString, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { pics: createdPic._id } }
    );

    createdPics.push(createdPic);
  }

  // create comments
  for (let i = 0; i < 100; i += 1) {
    const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUserArray.length);
    const { username } = createdUserArray[randomUserIndex];

    const randomPicIndex = Math.floor(Math.random() * createdPics.length);
    const { _id: picId } = createdPics[randomPicIndex];

    await Pic.updateOne(
      { _id: picId },
      { $push: { comments: { commentBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
