const User = require("../models/User")
const connection = require("../config/connection")

const seedUsers = [
{ username: "test1", email: "test1@gmail.com", password: "test123" },
{ username: "test2", email: "test2@gmail.com", password: "test123" },
{ username: "test3", email: "test3@gmail.com", password: "test123" },
{ username: "test4", email: "test4@gmail.com", password: "test123" },
{ username: "test5", email: "test5@gmail.com", password: "test123" },
{ username: "test6", email: "test6@gmail.com", password: "test123" },
{ username: "test7", email: "test7@gmail.com", password: "test123" },
{ username: "test8", email: "test8@gmail.com", password: "test123" },
{ username: "test9", email: "test9@gmail.com", password: "test123" }
]

const seed = async () => {
  const queryFirst = await User.deleteMany({})
  if( queryFirst ){
    console.log("seeding users...")

    const seed = await Promise.all(seedUsers.map( async (user) => await User.create(user) ) )

    console.log("seeding done")
    process.exit()
  } else {
    console.log("no seeding needed")
    process.exit()
  }
}


seed();