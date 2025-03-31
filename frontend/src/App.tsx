import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Welcome from "./pages/Welcome.tsx";
import Signin from "./pages/Signin.tsx";
// import Calendar from "./pages/Calendar.tsx";
import MySettings from "./pages/MySettings.tsx";
import Signup from "./pages/Signup.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/mysettings" element={<MySettings />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
