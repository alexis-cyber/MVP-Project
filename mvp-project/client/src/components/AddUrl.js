import { useState } from "react";
import axios from "axios";

function AddURL({ getAllURLs }) {
  const [url, setURL] = useState({
    originalURL: "",
    shortCode: "",
  });

  function handleInputChange(e) {
    setURL({ ...url, [e.target.name]: e.target.value });
  }

  const addNewURL = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/urls/create", url)
      .then((res) => {
        console.log(res.data);
        getAllURLs();
        setURL({ originalURL: "", shortCode: "" }); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the original URL..."
        name="originalURL"
        onChange={handleInputChange}
        value={url.originalURL}
      />
      <input
        type="text"
        placeholder="Enter a custom short code (optional)..."
        name="shortCode"
        onChange={handleInputChange}
        value={url.shortCode}
      />
      <button id="addbtn" onClick={addNewURL}>
        Add
      </button>
    </div>
  );
}

export default AddURL;
