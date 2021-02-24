import { Link } from "react-router-dom";
import { useAuth } from "../util/authContext";

const styles = {
  ul: {
    display: "flex",
    justifyContent: "flex-start",
    listStyleType: "none",
    margin: 0,
    padding: 0
  },
  li: { display: "block", padding: "0.5em" }
};

function Navbar() {
  const auth = useAuth();

  const signOut = () => {
    auth.logout();
  };
  return (
    <ul style={styles.ul}>
      <li style={styles.li}>
        <Link to="/public">Public Page</Link>
      </li>
      <li style={styles.li}>
        <Link to="/protected">Protected Page</Link>
      </li>
      {auth.isLoggedIn && (
        <li style={styles.li}>
          <Link to="/profile">Profile Page</Link>
        </li>
      )}
      <li style={styles.li}>
        {auth.isLoggedIn ? (
          <button type="button" onClick={signOut}>
            Sign Out
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
    </ul>
  );
}

export default Navbar;
