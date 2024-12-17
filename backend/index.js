// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

// API to get rating from Codeforces
app.get('/api/rating/:username', async (req, res) => {
  const { username } = req.params;
  const url = `https://codeforces.com/api/user.info?handles=${username}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 'OK') {
      const user = data.result[0];
      res.json({
        username: user.handle,
        rating: user.rating,
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
