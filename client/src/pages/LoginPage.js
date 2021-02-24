import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../util/authContext";

function LoginPage() {
  let auth = useAuth();
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const login = (event) => {
    event.preventDefault();
    auth.login(formState);
  };

  if (auth.isLoggedIn) {
    // redirect to /protected if user is logged in
    return <Redirect to="/protected" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formState.password}
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="submit" onClick={login}>
          Log in
        </button>
      </form>
      <p>
        Don't have an account yet? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginPage;
