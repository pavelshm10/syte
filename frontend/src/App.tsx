import React from "react";
import Catalogs from "./pages/Catalogs/Catalogs";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/catalogs" replace />} />
        <Route path="/catalogs" element={<Catalogs />} />
      </Routes>
    </Router>
  );
}

export default App;
