if (process.env.MONGODB_URI) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "SEEDING MONGODB PRODUCTION DATABASE!!!\n".repeat(3)
  );
  console.log("\x1b[31m%s\x1b[0m", "Don't forget to clear MONGODB_URI!\n");
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Run 'export MONGODB_URI=' or close this terminal after seeding.",
    "\n"
  );
} else {
  console.log("\x1b[33m%s\x1b[0m", "SEEDING MONGODB LOCAL DB");
}

const { User } = require("../models");
const { connection } = require("../config/connection");
const { Post } = require ("../models");

connection.once("open", async function () {
  // insert a sample user
  await User.create({ username: "banana", password: "meatloaf" });//

  const post = await Post.create([
    {body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: new Date("08/06/2023")
    },
    {body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: new Date("08/08/2023")
  },
  {body:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  createdAt: new Date("09/08/2023")
},
  ])
  await Promise.all([...post.map(post => post.save())
  ]);
  connection.close();
});
