import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  due_date: {
    type: Date
  },
  categories: {
    type: Array
  }
});

const Todo = mongoose.model('todo', TodoSchema);

export default Todo;
