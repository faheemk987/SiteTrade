const jwt = require("jsonwebtoken");

// Generates a signed JWT containing the user's id and role.
// Expires in 7 days.
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
