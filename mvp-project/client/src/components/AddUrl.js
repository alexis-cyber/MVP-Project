import { useState } from "react";
import axios from "axios";

function AddURL({ getAllURLs }) {
  const [url, setURL] = useState({
    origUrl: "", // Change this to match the backend
  });

  function handleInputChange(e) {
    setURL({ ...url, [e.target.name]: e.target.value });
  }

  const addNewURL = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/short", url) // Update the API endpoint
      .then((res) => {
        console.log(res.data);
        getAllURLs();
        setURL({ origUrl: "" }); // Update the field name
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
        name="origUrl" // Update the field name
        onChange={handleInputChange}
        value={url.origUrl} // Update the field name
      />
      <button id="addbtn" onClick={addNewURL}>
        Add
      </button>
    </div>
  );
}

export default AddURL;