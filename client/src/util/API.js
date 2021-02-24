import axios from "axios";
const API = {
  // Gets a single user by id
  getUser: () => {
    return axios.get("/api/user");
  },
  // sign up a user to our service
  signUpUser: ({ username, email, password }) => {
    return axios.post("api/signup", {
      username,
      email,
      password
    });
  }
};

export default API;
