import Logo from "../assets/images/logo_white.png";
import Button from "../components/Button.tsx"
// import "../styles/signin.css";

function Signup(){
    return (
        <div className="container">
            <div className="welcome-container">
                <img src={Logo} alt="Vista Planner" className="logo-image"/>
                <h1>Hello, welcome to</h1>
                <h1>VISTA Planner</h1>
            </div>
            
            <div className="signin-container">
                <h1>SIGN UP</h1>
                <p>Connect with Open account</p>
                <div>
                    <p>Google</p>
                    <p>Microsoft</p>
                </div>
                <div className="divider">
                    <p>or</p>
                </div>
                <p>Name</p>
                <p>Username/Email</p>
                <p>Password</p>
                <p>Show Password</p>
                <Button text="SIGN IN" />
                <p>Don't have an account yet?</p>
                <a href="">Sign up</a>
                <p>now</p>
            </div>
        </div>
    );
}

export default Signup;