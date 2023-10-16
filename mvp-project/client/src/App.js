import React, { useState} from "react";
import "./style.css";

const ShortenUrlForm = () => {
  const [origUrl, setOrigUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/api/short', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ origUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
        setError('');
      } else {
        setShortUrl('');
        setError(data);
      }
    } catch (err) {
      console.log(err);
      setError('Error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={origUrl}
          onChange={(e) => setOrigUrl(e.target.value)}
          placeholder="Enter URL to shorten"
        />
        <button type="submit">Shorten URL</button>
      </form>
      {error && <p>{error}</p>}
      {shortUrl && (
        <p>
          Shortened URL: <a href={origUrl}>{shortUrl}</a>
        </p>
      )}
    </div>
  );
};

export default ShortenUrlForm;