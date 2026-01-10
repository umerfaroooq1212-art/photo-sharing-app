import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/creator/login",
      { email, password }
    );

    // ✅ SAVE TOKEN
    localStorage.setItem("token", response.data.token);

    navigate("/creator/dashboard");
  } catch (error) {
    alert("Invalid email or password");
  }
};


  return (
    <div className="page-container">
      <div className="card">
        <h2>Creator Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default CreatorLogin;
