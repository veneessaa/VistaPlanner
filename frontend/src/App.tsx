import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Welcome from "./pages/Welcome/Welcome.tsx";
import Signin from "./pages/Signin.tsx";
// import Calendar from "./pages/Calendar.tsx";
import MySettings from "./pages/MySettings.tsx";
import Signup from "./pages/Signup.tsx";
import { SidebarLayout } from "./components/layout/SidebarLayout.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={
          <SidebarLayout>
          <Homepage />
          </SidebarLayout>
        } />
        <Route path="/mysettings" element={<SidebarLayout><MySettings /></SidebarLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
