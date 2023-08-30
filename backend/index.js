const express = require("express");
const axios = require("axios");
const cors = require("cors");  // import CORS
const { Octokit, App } = require("octokit");
const app = express();

app.use(cors());  // use CORS middleware
app.use(express.json());

app.use(express.json());

app.post("/api/create-repo", async (req, res) => {
  const { name, description, private } = req.body;

  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: '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-TOKEN'
  })

  // await octokit.request('POST /user/repos', {
  //   name: 'Hello-World',
  //   description: 'This is your first repo!',
  //   homepage: 'https://github.com',
  //   'private': false,
  //   is_template: true,
  //   headers: {
  //     'X-GitHub-Api-Version': '2022-11-28'
  //   }
  // })

  // Get the GitHub token for the user (this should be securely handled and stored)
  const token = "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";

  try {
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version" : "2022-11-28",
      },
    };

    const payload = {
      name,
      description,
      private,
    };

    const response = await axios.post("https://api.github.com/user/repos", payload, config);
    res.json(response.data);
  } catch (error) {
    console.error("Error creating repository:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

