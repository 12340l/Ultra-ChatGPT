const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing ?url=");

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Proxy Error: " + err.message);
  }
});

app.listen(PORT, () => console.log(`UV proxy running on port ${PORT}`));
