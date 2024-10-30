import Todo from '../models/Todo.js'; 
import User from "../models/User.js";

import { validationResult } from 'express-validator';

const getData = async (req, res) => {
    try {
        const todos = await Todo.find({
            user: req.user.id,
        }).sort({ date: -1 });
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const getDataByID = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (
            !req.params.id.match(/^[0-9a-fA-F]{24}$/) ||
            !todo ||
            todo.user.toString() !== req.user.id
        ) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const addData = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      
      const newTodo = new Todo({
        title: req.body.title,
        name: user.name,
        tags: req.body.tagId,
        text: req.body.text,
        user: req.user.id,
        categories: req.body.categories,
        due_date: req.body.due_date
      });

      const todo = await newTodo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
}

const upDateData = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const todo = await Todo.findById(req.params.id);
      // Check for ObjectId format and todo
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
        return res.status(404).json({ msg: "Todo not found" });
      }

      // Check user if the todo belongs to authenticated user
      if (todo.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      // Update the todo
      if (todo) {
        todo.text = req.body.text;
        todo.title = req.body.title;
        todo.tags = req.body.tagId;
        todo.categories = req.body.categories,
        todo.due_date = req.body.due_date,
        todo.created_at = new Date().now
        //todo.tags =
        //  tag._id.toString() === "5f5689a2d096a9b777ea4124"
        //    ? [createdTag]
        //    : [tag];
      }

      await todo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
}

const completeData = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    // Check for ObjectId format and todo
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    // Check user if the todo belongs to authenticated user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Check if the todo has already been completed
    if (todo) {
      todo.completed = !todo.completed;
    }

    await todo.save();

    res.json(todo.completed);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const deleteData = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    // Check for ObjectId format and todo
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    // Check user if the todo belongs to authenticated user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await todo.remove();

    res.json({ msg: "Todo removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

export default {
    getData,
    getDataByID,
    addData,
    upDateData,
    completeData,
    deleteData
};
