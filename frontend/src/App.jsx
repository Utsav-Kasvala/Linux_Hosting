// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/api/rating/${username}`);
      setRating(response.data.rating);
      setError('');
    } catch (err) {
      setError('User not found or an error occurred');
      setRating(null);
    }
  };

  return (
    <div className="App">
      <h1>Codeforces Rating Checker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Codeforces username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Get Rating</button>
      </form>

      {rating !== null && (
        <div>
          <h2>Rating for {username}: {rating}</h2>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <h3>{error}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
