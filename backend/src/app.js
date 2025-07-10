import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { summarize } from './summarizer.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/summarize', async (req, res) => {
  const { text, length } = req.body;
  try {
    const summary = await summarize(text, length || 3); // Default to 3 sentences if length not provided
    res.json({ summary });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to summarize.' });
  }
  // res.json({ summary });
});

export default app;
