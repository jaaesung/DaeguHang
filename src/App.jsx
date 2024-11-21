import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InputPage from "./pages/InputPage";
import PlanPage from "./pages/PlanPage";
import Mainpage from "./pages/MainPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/mainpage" />} />
      <Route path="/mainpage" element={<Mainpage />} />{" "}
      <Route path="/input" element={<InputPage />} />
      <Route path="/plan" element={<PlanPage />} />
    </Routes>
  </Router>
);

export default App;
