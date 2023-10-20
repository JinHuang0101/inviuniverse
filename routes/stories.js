const express = require("express");
const Story = require("./../models/stories");
const router = express.Router();

router.get("/new", async (req, res) => {
  res.render("stories/new", { story: new Story() });
});
router.get("/:id", async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (story == null) res.redirect("/");
  res.render("stories/show", { story: story });
});

router.post("/", async (req, res) => {
  let story = new Story({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    story = await story.save();
    res.redirect(`/stories/${story.id}`);
  } catch (e) {
    res.render("stories/new", { story: story });
  }
});

module.exports = router;
