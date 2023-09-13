import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./containers/LoginPage/LoginPage";
import Dashboard from "./containers/Dashboard/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="dashboard" element={<Dashboard />} />

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
