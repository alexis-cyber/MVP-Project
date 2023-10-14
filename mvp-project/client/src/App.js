import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [allUrls, setAllUrls] = useState([]);

  
  async function getAllUrls() {
    try {
      const response = await axios.get("http://localhost:8000/urls");
      setAllUrls(response.data);
    } catch (error) {
      console.log(error);
    }
  }

 
  async function shortenUrl() {
    try {
      const response = await axios.post("http://localhost:8000/urls", {
        originalUrl,
      });
      setShortenedUrl(response.data.shortenedUrl);
      getAllUrls();
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    getAllUrls();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button onClick={shortenUrl}>Shorten</button>
      <p>Full URL: {originalUrl}</p>
      <p>Shortened URL: {shortenedUrl}</p>
      <ul>
        {allUrls.map((url) => (
          <li key={url.id}>
            <a href={url.originalUrl}>{url.shortenedUrl}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;