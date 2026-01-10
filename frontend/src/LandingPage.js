import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>Photo Sharing Web App</h1>
      <p>Please choose how to proceed:</p>

      <Link to="/creator/login">
        <button>Creator Login</button>
      </Link>

      <br /><br />

      <Link to="/consumer/login">
        <button>Consumer Login</button>
      </Link>
    </div>
  );
}

export default LandingPage;
