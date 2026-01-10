import { useEffect, useState } from "react";
import axios from "axios";

function ConsumerGallery() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/photos");
      setPhotos(res.data);
    } catch (err) {
      setError("Failed to load photos");
    }
  };

  const filteredPhotos = photos.filter((photo) => {
    const text = `${photo.title} ${photo.caption} ${photo.location} ${photo.people}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div style={{ padding: "40px", background: "#f4f6f8", minHeight: "100vh" }}>
      
      {/* CREATOR ACCESS BUTTONS */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <a
          href="/creator/login"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            marginRight: "10px",
          }}
        >
          Creator Login
        </a>

        <a
          href="/creator/register"
          style={{
            padding: "10px 20px",
            background: "#28a745",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
          }}
        >
          Creator Register
        </a>
      </div>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        📸 Public Photo Gallery
      </h1>

      {/* SEARCH */}
      <input
        placeholder="Search by title, caption, location or people"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "25px",
          fontSize: "16px",
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {filteredPhotos.length === 0 ? (
        <p>No photos available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "25px",
          }}
        >
          {filteredPhotos.map((photo) => (
            <div
              key={photo._id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                onClick={() =>
                  alert(
                    `Title: ${photo.title}\nCaption: ${photo.caption}\nLocation: ${photo.location}\nPeople: ${photo.people}`
                  )
                }
                style={{
                  cursor: "pointer",
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "15px" }}>
                <h3>{photo.title}</h3>
                <p>{photo.caption}</p>
                <small>📍 {photo.location}</small><br />
                <small>👥 {photo.people}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConsumerGallery;
