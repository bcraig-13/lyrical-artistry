import { Link } from "react-router-dom";
import { useAuth } from "../util/authContext";
import "../components/myStyles.css";

function Navbar() {
  const auth = useAuth();

  const signOut = () => {
    auth.logout();
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light">
      <img
        src={process.env.PUBLIC_URL + "./img/lyrical-artistry2.png"}
        alt="Lyrical Artistry"
      ></img>
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="public" className= "nav">
                Gallery
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="searchLyrics" className= "nav">
                Search for Lyrics
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="protected" className= "nav">
                Edit Lyrics
              </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="login" className= "nav" onClick={signOut}>
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
