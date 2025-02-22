import "../styles/index.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">VISTA PLANNER</div>
      <div className="nav-links">
        <a href="#">About Us</a>
        <button className="sign-in">Sign In</button>
      </div>
    </nav>
  );
}

export default Navbar;