const jwt = require("jsonwebtoken");

const ensureAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = await jwt.verify(authHeader, process.env.JWT_SECRET);
    req.userInfo = decoded;
    // console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ error: "Token invalid" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" });
  }
};

module.exports = ensureAuthenticated;
