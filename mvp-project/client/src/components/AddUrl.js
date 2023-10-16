import { useState } from "react";
import axios from "axios";

function AddURL({ getAllURLs }) {
  const [url, setURL] = useState({
    origUrl: "", 
  });

  function handleInputChange(e) {
    setURL({ ...url, [e.target.name]: e.target.value });
  }

  const addNewURL = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/short", url) 
      .then((res) => {
        console.log(res.data);
        getAllURLs();
        setURL({ origUrl: "" }); 
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
        name="origUrl" 
        onChange={handleInputChange}
        value={url.origUrl} 
      />
      <button id="addbtn" onClick={addNewURL}>
        Add
      </button>
    </div>
  );
}

export default AddURL;