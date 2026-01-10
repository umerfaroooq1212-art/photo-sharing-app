import { useState } from "react";
import axios from "axios";

// ✅ AZURE BACKEND URL (NOT localhost)
const API_BASE = "https://photosharing.azurewebsites.net";

function UploadPhoto({ onUpload }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);
      formData.append("location", location);
      formData.append("title", title);

      await axios.post(
        `${API_BASE}/api/photos`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Photo uploaded successfully");
      onUpload();

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="file" required onChange={(e) => setImage(e.target.files[0])} />
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
      <input placeholder="Caption" onChange={(e) => setCaption(e.target.value)} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadPhoto;
 