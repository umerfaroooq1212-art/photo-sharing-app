import { HashRouter as Router, Routes, Route } from "react-router-dom";

import CreatorLogin from "./creator/CreatorLogin";
import CreatorRegister from "./creator/CreatorRegister";
import CreatorDashboard from "./creator/CreatorDashboard";
import ConsumerGallery from "./consumer/ConsumerGallery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsumerGallery />} />
        <Route path="/creator/login" element={<CreatorLogin />} />
        <Route path="/creator/register" element={<CreatorRegister />} />
        <Route path="/creator/dashboard" element={<CreatorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
