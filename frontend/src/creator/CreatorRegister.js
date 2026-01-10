import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatorRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/creator/register", {
        name,
        email,
        password,
      });

      alert("Registration successful. Please login.");
      navigate("/creator/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Creator Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
<br>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
</br>
<br>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
</br>
<br>
          <button type="submit">Register</button>
          </br>
        </form>
      </div>
    </div>
  );
}

export default CreatorRegister;
