import Navbar from "../components/Navbar.tsx";
import Button from "../components/Button.tsx";
import bookImage from "../assets/images/book.png";

function Welcome() {
  return (
    <div className="welcome-container">
      <Navbar />
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

      <div className="features">
        <div className="feature">
          <h3>📚 Smarter Studying</h3>
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
    </div>
  );
}

export default Welcome;
