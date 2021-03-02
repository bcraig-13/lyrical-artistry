import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../util/authContext";
import API from "../util/API";
import '../components/myStyles.css'

function SignUpPage() {
  const [formState, setFormState] = useState({
    username: "",
    password: ""
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
    return <Redirect to="/protected" />;
  }

  return (
    <div className= 'parent'>
      <img src= {process.env.PUBLIC_URL + "./img/lyrical-artistry.png"} alt="Lyrical Artistry"></img>
      <h1 className='primary'>Sign Up</h1>
      <form onSubmit={handleSignUpFormSubmit}>
        <label htmlFor="username" className='primary'>Username:</label>
        <input className='username'
          type="text"
          name="username"
          id="username"
          value={formState.username}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="password" className='primary'>Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formState.password}
          onChange={handleInputChange}
          required
        />
        <br />
        <button className= 'button' type="submit">Submit</button>
      </form>
      <p className='primary'>
        Have an account? <Link to="/login" style={{color: "#DCDCDC"}}>Login</Link>
      </p>
    </div>
  );
}

export default SignUpPage;
