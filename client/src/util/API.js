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
  deleteQuote: (quoteID) => {
    return axios.delete(`/api/user/quotes/${quoteID}`)
  },
  getAllUserQuotes: () => {
    return axios.get(`/api/user/quotes`);
  },
  postImage: (imageObject) => {
    // return axios.post(`/api/user/imageTemplate`, imageObject)
    return axios.post(`/api/user/images`, imageObject)
  },
  getAllUserImages: () => {
    return axios.get("/api/user/images");
  },
  deletePicture: (imageID) => {
    return axios.delete(`/api/user/images/${imageID}`);
  }
};

export default API;
