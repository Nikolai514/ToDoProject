import express from 'express';
import path from 'path';
import cors from 'cors';
const app = express();

import connectDB from './config/db.js';
import route from './routes/route.js';

app.use(cors());
app.use(express.json({ extended: false }));

connectDB();

app.use(route);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));