const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  logUserIn: function (username, password) {
    return new Promise((resolve, reject) => {
      db.User.findOne({
        username: username
      })
        .select("+password")
        .then((user) => {
          user.verifyPassword(password, (err, isMatch) => {
            if (isMatch && !err) {
              let token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.SERVER_SECRET,
                { expiresIn: 100000 }
              ); // Sigining the token
              resolve({
                success: true,
                message: "Token Issued!",
                token: token,
                user: user
              });
            } else {
              reject({
                success: false,
                message: "Authentication failed. Wrong password."
              });
            }
          });
        })
        .catch((err) =>
          reject({ success: false, message: "User not found", error: err })
        );
    });
  }
};
