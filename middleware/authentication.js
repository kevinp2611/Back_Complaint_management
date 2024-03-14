const { decodeAuthToken } = require("../services/utils");
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token", token);
  if (!token)
    return res.status(401).send({ status: 401, error: "Access denied" });

  try {
    const decoded = await decodeAuthToken(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: 401, error: "Invalid token" });
  }
};

module.exports = {
  verifyToken,
};
