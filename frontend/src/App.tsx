import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Welcome from "./pages/Welcome/Welcome.tsx";
import Signin from "./pages/Signin.tsx";
// import Calendar from "./pages/Calendar.tsx";
import MySettings from "./pages/MySettings.tsx";
import Signup from "./pages/Signup.tsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./middlewares/ProtectedRoute.tsx";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/mysettings" element={<ProtectedRoute><MySettings /></ProtectedRoute>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
