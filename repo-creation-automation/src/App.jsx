import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [repoData, setRepoData] = useState({
    name: '',
    description: '',
    private: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepoData({
      ...repoData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // specify the backend's URL
      const response = await axios.post('http://localhost:3001/api/create-repo', repoData);
      console.log('Repository Created:', response.data);
    } catch (error) {
      console.error('Error creating repository:', error);
    }
  };
  

  return (
    <div className="App">
      <h1>Create GitHub Repository</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Repository Name"
          value={repoData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={repoData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          Private
          <input
            type="checkbox"
            name="private"
            checked={repoData.private}
            onChange={(e) => setRepoData({ ...repoData, private: e.target.checked })}
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Create Repository</button>
    </div>
  );
}

export default App;
