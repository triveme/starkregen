require("dotenv").config();
const jwt = require("jsonwebtoken");

// const { TokenExpiredError } = jwt;

// const catchError = (err, res) => {
//   if (err instanceof TokenExpiredError) {
//     return res.status(401).send({ message: "Access token expired!" });
//   }
//   return res.sendStatus(401).send({ message: "Unauthorized!" });
// }

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "Es wurde kein Token übergeben" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorisiert" });
    }

    req.userId = decoded.id;
    next();
  });
};

const jwtAuth = {
  verifyToken,
};
module.exports = jwtAuth;
