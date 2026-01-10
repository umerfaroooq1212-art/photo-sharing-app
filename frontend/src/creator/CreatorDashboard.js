import axios from "axios";
import { useEffect, useState } from "react";

function CreatorDashboard() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [people, setPeople] = useState("");
  const [photos, setPhotos] = useState([]);

  const token = localStorage.getItem("token");

  // ================= FETCH PHOTOS =================
  const fetchPhotos = async () => {
    const res = await axios.get("http://localhost:5000/api/photos/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPhotos(res.data);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // ================= UPLOAD =================
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("people", people);

    await axios.post("http://localhost:5000/api/photos", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    fetchPhotos(); // refresh gallery
  };

 return (
  <div className="page">
    <div className="card">
      <h2>Upload Photo</h2>

      <form className="upload-form" onSubmit={submitHandler}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
        <input placeholder="Caption" onChange={(e) => setCaption(e.target.value)} />
        <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
        <input placeholder="People Present" onChange={(e) => setPeople(e.target.value)} />

        <button type="submit">Upload Photo</button>
      </form>
    </div>

    <div className="card">
      <h2>My Gallery</h2>

      <div
      style={{justifyContent:"center",textAlign:"center"}} className="gallery">
        {photos.map((photo) => (
          <div key={photo._id} className="photo-card">
            <img style={{height: "300px",}}
            src={photo.imageUrl} alt={photo.title} />
            <h4>{photo.title}</h4>
            <p>{photo.caption}</p>
            <p><strong>Location:</strong> {photo.location}</p>
            <p><strong>People:</strong> {photo.people}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

export default CreatorDashboard;
