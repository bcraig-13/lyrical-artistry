import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../util/authContext";
import API from "../util/API";

function SignUpPage() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const auth = useAuth();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSignUpFormSubmit = (event) => {
    event.preventDefault();
    API.signUpUser(formState)
      .then(() => {
        auth.login({ username: formState.username, password: formState.password });
      })
      .catch((error) => {
        alert("Unable to sign up.");
        console.log(error);
      });
  };

  if (auth.isLoggedIn) {
    return <Redirect to="/gallery" />;
  }

  return (
    <div className='parent'>
      <img src={process.env.PUBLIC_URL + "./img/lyrical-artistry.png"} alt="Lyrical Artistry"></img>
      <h1 className='primary'>Sign Up</h1>
      <form onSubmit={handleSignUpFormSubmit}>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formState.firstName}
          onChange={handleInputChange}
          placeholder="First Name:"
          style={{ marginTop: "5px" }}
          required
        />
        <br />
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formState.lastName}
          onChange={handleInputChange}
          placeholder="Last Name:"
          style={{ marginTop: "5px" }}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={handleInputChange}
          placeholder="Email Address:"
          style={{ marginTop: "5px" }}
          required
        />
        <br />
        <input
          type="text"
          name="username"
          id="username"
          value={formState.username}
          onChange={handleInputChange}
          placeholder="Username:"
          style={{ marginTop: "5px" }}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          id="password"
          value={formState.password}
          onChange={handleInputChange}
          placeholder="Password:"
          style={{ marginTop: "5px" }}
          required
        />
        <br />

        <button type="submit" style={{marginTop: "5px"}}>Submit</button>
      </form>
      <p className='primary'>
        Have an account? <Link to="/login" style={{ color: "#DCDCDC" }}>Login</Link>
      </p>
    </div>
  );
}

export default SignUpPage;
