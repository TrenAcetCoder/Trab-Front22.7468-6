import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FilmesPopulares from "./pages/FilmesPopulares";
import EmBreve from "./pages/EmBreve";

const App = () => {
  return (
    <Router>
      <div>
        <div style={{ flex: "1", marginLeft: "200px", padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<FilmesPopulares />} />
            <Route path="/emBreve" element={<EmBreve />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
