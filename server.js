const express = require("express");
const storiesRouter = require("./routes/stories");
const mongoose = require("mongoose");
const app = express();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const stories = [
    {
      title: "Mom Story 1",
      createdAt: new Date(),
      content: "This is Mom Story 1",
    },
    {
      title: "Mom Story 2",
      createdAt: new Date(),
      content: "This is Mom Story 2",
    },
  ];

  res.render("stories/index", { stories: stories });
});

app.use("/stories", storiesRouter);

app.listen(process.env.PORT || 3000, () =>
  console.log("App available on http://localhost:3000")
);
