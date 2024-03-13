const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function createPassword(txt, length) {
  return await bcrypt.hash(txt, length);
}

const comparePassword = (password, userPassword) => {
  console.log("pass", password, "userpass", userPassword);

  return bcrypt.compare(password, userPassword);
};

const generateAuthToken = async (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const secret = process.env.SECRET_KEY;
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
};

module.exports = {
  createPassword,
  comparePassword,
  generateAuthToken,
};
