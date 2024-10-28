import express from "express";
const router = express.Router();

import { auth } from '../../middleware/auth.js';;

import Tag from "../../models/Tag.js";

// @route    GET api/tags
// @desc     Get all tags
// @access   Private
router.get("/", auth, async (req, res) => {
  console.log("get tags")
  try {
    console.log("OK tags")
    const tags = await Tag.find();
    console.log(tages)
    res.json(tags);
  } catch (err) {
    console.log("tags err")
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
