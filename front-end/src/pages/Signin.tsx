import Logo from "../assets/images/logo_white.png";
import Button from "../components/Button.tsx" 
import Google from "../assets/images/google.png"
import Ms from "../assets/images/microsoft.png"
import "../styles/signin.css";
import "../styles/index.css";

function Signin(){
    return (
        <div className="container">
            <div className="sub-container" id="welcome">
                <img src={Logo} alt="Vista Planner" className="logo-image"/>
                <div className="welcome-text">
                    <div className="welcome-header">
                        <p>Hello, welcome to</p>
                        <h1>VISTA Planner</h1>
                    </div>

                    <p>VISTA helps you stay on top of your tasks, schedules, 
                        and study goals with powerful productivity tools. 
                        Track progress, collaborate with peers, and optimize 
                        your learning experience. All in one place.</p>

                    <h3>Sign in to access your personalized dashboard and 
                        supercharge your study routine!</h3>
                </div>
            </div>
            
            <div className="sub-container" id="login">
                <div className="form">
                    <h1>SIGN IN</h1>

                    <p>Connect with Open account</p>
                    <div className="options">
                        <div className="option-btn"><img src={Google} alt="Google" /></div>
                        <div className="option-btn"><img src={Ms} alt="Microsoft" /></div>
                    </div>

                    <div className="divider">
                        <div className="line"></div>
                        <p>or</p>
                        <div className="line"></div>
                    </div>

                    <div className="inputs">
                        <div className="username-input">
                            <p>Username</p>
                            <input type="text" placeholder="Enter username" />
                        </div>

                        <div className="password-input">
                            <p>Password</p>
                            <input type="password" placeholder="Enter password" />
                            <p>Show Password</p>
                        </div>
                    </div>

                    <div className="submit-container">
                        <Button text="SIGN IN" />
                        <div className="signup-option">
                            <p>Don't have an account yet?</p>
                            <a href="/signup">Sign up</a>   {/* belum perbaiki link path */}
                            <p>now</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Signin;