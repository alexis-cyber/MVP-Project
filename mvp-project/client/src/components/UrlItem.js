import axios from "axios";
import { useState } from "react";

function UrlShortener({ getAllUrls, urls }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  async function deleteUrl(id) {
    try {
      await axios.delete(`http://localhost:8000/urls/${id}`);
      getAllUrls();
    } catch (error) {
      console.log("Error deleting URL:", error);
    }
  }

  async function updateUrl(id, newUrl) {
    try {
      await axios.put(`http://localhost:8000/urls/${id}`, {
        origUrl: newUrl,
      });
      getAllUrls();
    } catch (error) {
      console.error("Error updating URL:", error);
    }
  }

  async function shortenUrl() {
    try {
      const response = await axios.post("http://localhost:8000/short", {
        origUrl: originalUrl,
      });
      setOriginalUrl("");
      setShortenedUrl(response.data.shortUrl);
      getAllUrls();
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the original URL..."
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button onClick={shortenUrl}>Shorten</button>
      <p>Shortened URL: {shortenedUrl}</p>

      {urls.map((u) => (
        <div className="serverDiv" key={u._id}> {/* Use _id as the key */}
          <h1 className="returnUrl1">{u.origUrl}</h1> {/* Change to origUrl */}
          <h1 className="returnUrl2">{u.shortUrl}</h1>
          <button onClick={() => deleteUrl(u._id)}>Delete</button>
          <button
            onClick={() => {
              const newUrl = prompt("Enter a new URL:", u.origUrl);
              if (newUrl !== null) {
                updateUrl(u._id, newUrl);
              }
            }}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
}

export default UrlShortener;














//(
//   <div>
//     <div>
//       <input
//         type="text"
//         value={originalUrl}
//         onChange={(e) => setOriginalUrl(e.target.value)}
//       />
//       <button onClick={shortenUrl}>Shorten URL</button>
//     </div>

//     {urls.map((url) => (
//       <div key={url._id}>
//         <div>
//           <span>{url.url}</span>
//           <span>{url.shortUrl}</span>
//           <button onClick={() => deleteUrl(url._id)}>
//             <i className="material-icons">delete</i>
//           </button>
//           <button
//             onClick={() => {
//               setOriginalUrl(url.url);
//               setShortenedUrl(url.shortUrl);
//             }}
//           >
//             <i className="material-icons">edit</i>
//           </button>
//         </div>

//         {}
//         {shortenedUrl === url.shortUrl && (
//           <div>
//             <input
//               type="text"
//               value={originalUrl}
//               onChange={(e) => setOriginalUrl(e.target.value)}
//             />
//             <button
//               onClick={() => {
//                 updateUrl(url._id, originalUrl);
//               }}
//             >
//               Save
//             </button>
//           </div>
//         )}
//       </div>
//     ))}
//   </div>
// );
//}
