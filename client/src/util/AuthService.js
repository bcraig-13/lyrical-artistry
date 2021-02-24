import decode from "jwt-decode";
import axios from "axios";

class AuthService {
  login(email, password) {
    // Get a token
    return axios
      .post("/api/login", { email: email, password: password })
      .then((res) => {
        // set the token once the user logs in
        this.setToken(res.data.token);
        // return the rest of the response
        return res;
      });
  }

  getProfile() {
    const token = this.getToken();
    if (token) {
      return decode(token);
    }
    return null;
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  logout() {
    // Remove token from local storage
    localStorage.removeItem("id_token");
  }
}

export default AuthService;
