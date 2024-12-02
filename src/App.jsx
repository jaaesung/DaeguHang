import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InputPage from "./pages/InputPage";
import PlanPage from "./pages/PlanPage";
import Mainpage from "./pages/Mainpage";
import Mypage from "./pages/MyPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/mainpage" />} />
      <Route path="/mainpage" element={<Mainpage />} />
      <Route path="/input" element={<InputPage />} />
      <Route path="/plan" element={<PlanPage />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  </Router>
);

export default App;
