import { useAuth } from "../util/authContext";
import "../components/myStyles.css";

function Navbar() {
  const auth = useAuth();

  const signOut = () => {
    auth.logout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <img
        src={process.env.PUBLIC_URL + "./img/lyrical-artistry2.png"}
        alt="Lyrical Artistry"
      ></img>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link nav active" aria-current="page" href="gallery">
                Gallery
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav" href="searchLyrics">
                Search for Lyrics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav" href="protected">
                Edit Lyrics
              </a>
            </li>
            <li className="nav-item">
            <a className="nav-link nav" href="login" onClick={signOut}>
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
