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
  },
  getLyrics: (trackID) => {
    return axios.get(`/api/lyrics/${trackID}`)
  },
  postQuotes: (quoteObject) => {
    return axios.post(`/api/user/quotes`, quoteObject)
  },
  getAllUserQuotes: () => {
    return axios.get(`/api/quotes`);
  },
  postImage: (imageObject) => {
    // return axios.post(`/api/user/imageTemplate`, imageObject)
    return axios.post(`/api/user/images`, imageObject)
  },
  getAllUserImages: () => {
    return axios.get("/api/user/images");
  }
};

export default API;
