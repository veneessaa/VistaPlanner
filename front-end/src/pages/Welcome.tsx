import Button from "../components/Button.tsx";
import bookImage from "../assets/images/book.png";
import Logo from "../assets/images/logo_white.png";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="first-section">
        <nav className="navbar">
          <img src={Logo} alt="Vista Planner" className="logo" />
          <div className="nav-links">
            <a href="#">About Us</a>
            <Link to="/signin" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
                Sign In
            </Link>
          </div>
        </nav>

        <header className="header">
          <h2>ORGANIZE YOUR STUDY PLANS</h2>
          <div className="welcome-box">
            <div className="text-section">
              <h1>WELCOME TO VISTA PLANNER!</h1>
              <p>
                Unlock your full potential and take charge of your academic journey with
                VISTA PLANNER—the ultimate student planner and school organizer app.
                Effortlessly manage your study plans, track progress, and stay on top of deadlines.
              </p>
              <Button text="Get Started" />
            </div>
            <img src={bookImage} alt="Vista Planner Book" className="book-image" />
          </div>
        </header>
      </div>

      <div className="features">
        <div className="feature">
          <h3>📓 Smarter Studying</h3>
          <p>Work smarter, not harder. Our AI-powered scheduling helps you plan study sessions.</p>
        </div>
        <div className="feature">
          <h3>🤝 Collaborative Productivity</h3>
          <p>Plan, share tasks, and collaborate in group study with AI-assisted insights.</p>
        </div>
        <div className="feature">
          <h3>📊 Better Management</h3>
          <p>Track progress, organize tasks, and get deadline reminders.</p>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="extra-features">
        <div className="feature-box">
          <h3>🖥️ User Friendly Interface</h3>
          <p>Features a simple and easy-to-understand design, allowing users to quickly grasp how to use the application.</p>
          <p>Helps students organize their schedules without technical difficulties.</p>
        </div>
        <div className="feature-box">
          <h3>🔔 Reminder Feature</h3>
          <p>Provides notifications to remind users of scheduled tasks and activities.</p>
          <p>Helps students avoid missing deadlines and complete tasks on time.</p>
        </div>
        <div className="feature-box">
          <h3>📅 Schedule Customization</h3>
          <p>Allows users to adjust their schedules based on their needs, such as adding notes or using different colors.</p>
          <p>Enables students to manage their time more effectively according to their priorities.</p>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="social-media">
        <h2>Stay in the loop</h2>
        <p>Be part of a thriving student community and see how others maximize VISTA PLANNER to reach academic success</p>
        <div className="social-boxes">
          <div className="social-box">
            <h3>🎧 Tiktok</h3>
            <p>Looking for the best study tips, homework help, and more? Join our TikTok community for fun, success tips, and more.</p>
            <p>Come say Hi! →</p>
          </div>
          <div className="social-box">
            <h3>📱 Instagram</h3>
            <p>Follow our Instagram community of global students. Participate in contests, get featured, and find daily study inspiration.</p>
            <p>Follow Us! →</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
