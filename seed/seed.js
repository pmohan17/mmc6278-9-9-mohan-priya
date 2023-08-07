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
  await User.create({ username: "banana", password: "meatloaf" });

  const posts = await Post.create([
    {body:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a rutrum lacus. Donec vitae ultrices nibh. Vestibulum dictum justo pretium, facilisis nulla a, commodo tortor. Quisque dictum elit nec elementum placerat. Integer malesuada, nisl quis ultrices tincidunt, sem enim pulvinar eros, ac blandit massa est non felis. Etiam congue diam at consequat lacinia. Curabitur bibendum neque dolor, eu lobortis quam malesuada vel.</p><p>Proin massa ligula, sollicitudin sit amet tortor sed, congue fringilla erat. Etiam pellentesque lectus ac neque gravida aliquet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet eros vitae metus vestibulum tempus ut sit amet orci. In eget porta nisl, sit amet semper urna. Praesent erat odio, tincidunt sit amet tincidunt in, efficitur sit amet libero. Suspendisse eu pulvinar massa. Nam pharetra leo purus, id dapibus orci molestie nec. Praesent ut mauris id sapien luctus molestie in vel diam. Donec dapibus tempus molestie. Etiam id nisi justo. Praesent vestibulum sem lectus, sed fringilla risus blandit a. Maecenas nunc purus, tristique tincidunt finibus eget, sollicitudin at lectus. Quisque vulputate sodales augue eget lacinia. Quisque nec tincidunt nibh, id aliquam justo.</p>",
      createdAt: new Date("08/06/2023")
    },
  ])
  await Promise.all(posts.map((post) => post.save()));
  connection.close();
});
