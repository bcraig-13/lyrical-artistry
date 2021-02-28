import axios from "axios";

const API = {
  // Gets a single user by id
  getUser: () => {
    return axios.get("/api/user");
  },
  // sign up a user to our service
  signUpUser: ({ username, password }) => {
    return axios.post("api/signup", {
      username,
      password
    });
  },
  
  getTracks: (trackName) => {
    return axios.get(`/api/tracks/${trackName}`);
  }
};

export default API;
