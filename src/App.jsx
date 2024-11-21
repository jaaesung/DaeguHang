import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InputScreen from "./pages/InputScreen";
import PlanPage from "./pages/PlanPage";
import Mainpage from "./pages/Mainpage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/mainpage" />} />
      <Route path="/mainpage" element={<Mainpage />} />{" "}
      <Route path="/input" element={<InputScreen />} />
      <Route path="/plan" element={<PlanPage />} />
    </Routes>
  </Router>
);

export default App;
