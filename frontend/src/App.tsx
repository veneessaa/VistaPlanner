import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.tsx";
import Welcome from "./pages/Welcome/Welcome.tsx";
import Signin from "./pages/Signin/Signin.tsx";
// import Calendar from "./pages/Calendar.tsx";
import MySettings from "./pages/MySettings/MySettings.tsx";
import Signup from "./pages/Signup/Signup.tsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./middlewares/ProtectedRoute.tsx";
import Tasks from "./pages/Tasks/Tasks.tsx";
import Collab from "./pages/Collab/Collab.tsx";
import TaskDetail from "./pages/Task Detail/TaskDetail.tsx";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/tasks/:taskId" element={<ProtectedRoute><TaskDetail /></ProtectedRoute>} />
          <Route path="/collab" element={<ProtectedRoute><Collab /></ProtectedRoute>} />
          <Route path="/mysettings" element={<ProtectedRoute><MySettings /></ProtectedRoute>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
