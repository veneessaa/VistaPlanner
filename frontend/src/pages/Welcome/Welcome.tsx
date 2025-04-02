import Logo from "../../assets/images/logo_white.png";
import { Link } from "react-router-dom";
import { WelcomeCard } from "./components/WelcomeCard.tsx";
import bookImage from "../../assets/images/book.png";
import { SocialMediaCard } from "./components/SocialMediaCard.tsx";
import { WhiteCard } from "./components/WhiteCard.tsx";
import LogoBlack from "../../assets/images/logoblack.png"
import facebook from '../../assets/images/facebook.png'
import instagram from '../../assets/images/instagram.png'
import tiktok from '../../assets/images/tiktok.png'
import satuA from "../../assets/images/satuA.png"
import satuB from "../../assets/images/satuB.png"
import satuC from "../../assets/images/satuC.png"
import welcomeA from "../../assets/images/welcomeA.png"
import welcomeB from "../../assets/images/welcomeB.png"
import welcomeC from "../../assets/images/welcomeC.png"
import socialA from "../../assets/images/socialA.png"
import socialB from "../../assets/images/socialB.png"

function Welcome() {
  return (
    <div className="flex flex-col min-h-screen">

      <nav className="navbar bg-primary z-10 flex justify-between items-center px-[80px] sticky top-0 shadow-[1px_10px_16px_-8px_rgba(0,0,0,0.58)] py-4">
        <img src={Logo} alt="Vista Planner" className="h-[60px]" />
        <div className="nav-links flex gap-8 items-center">
          <a className="text-white" href="#">About Us</a>
          <Link to="/signin" className="px-8 py-2 bg-button-primary text-white rounded-lg hover:bg-button-hover">
            Sign In
          </Link>
        </div>
      </nav>

      <div className="flex flex-col bg-sec">
        <div className="container mx-auto flex justify-between">
          <div className="left flex-1 p-20">
            <h1 className="font-bold text-white text-[60px] mb-4">WELCOME TO VISTA PLANNER!</h1>
            <p className="text-white text-lg leading-8">Unlock your potential with VISTA PLANNER—the ultimate student planner. Organize study plans, track progress, meet deadlines, and collaborate, all in one smart platform for academic success!</p>
          </div>

          <div className="right flex flex-col justify-end">
            <img src={bookImage} className="w-[600px]" alt="" />
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-20">
            <WhiteCard image={satuA} title="Smarter Studying" description="Work smarter, not harder. Our innovative productivity tools will help you plan your study sessions efficiently." />
            <WhiteCard image={satuB} title="Collaborative Productivity" description="Work smarter with group study planning, task sharing, and discussion spaces, all powered by AI-assisted insights." />
            <WhiteCard image={satuC} title="Better Management" description="Stay on top of assignments with categorized tasks, progress tracking, and deadline reminders to ensure timely completion." />
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-section py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-20">
            <WelcomeCard image={welcomeA} title="User Friendly Interface" description="Features a simple and easy-to-understand design, allowing users to quickly grasp how to use the application. Helps students organize their schedules without technical difficulties." />
            <WelcomeCard image={welcomeB} title="Reminder Feature" description="Provides notifications to remind users of scheduled tasks and activities. Helps students avoid missing deadlines and complete tasks on time." />
            <WelcomeCard image={welcomeC} title="Schedule Customization" description="Allows users to adjust their schedules based on their needs, such as adding notes or using different colors. Enables students to manage their time more effectively according to their priorities." />
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-40 px-40">
            <SocialMediaCard image={socialA} title="Tiktok" description="Looking for the best study tips, homework help, and more? Join our TikTok community for fun, success tips and more." />
            <SocialMediaCard image={socialB} title="Instagram" description="Follow our Instagram community of global students. Participate in contests, get featured, and find daily study inspiration." />
          </div>
        </div>
      </div>
      <footer className="flex flex-col bg-section py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-[100px]">
            <div className="flex flex-col">
              <div>
                <img src={LogoBlack} alt="" className="w-3/4" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold mb-2">About</h1>
              <Link to="/">FAQs</Link>
              <Link to="/">About Us</Link>
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold mb-2">Legal</h1>
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Terms And Conditions</Link>
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold mb-2">Follow Us</h1>
              <div className="flex gap-2">
                <div>
                  <img src={facebook} alt="" className="w-[35px]" />
                </div>
                <div>
                  <img src={instagram} alt="" className="w-[35px]" />
                </div>
                <div>
                  <img src={tiktok} alt="" className="w-[35px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Welcome;
