const db = require("../db/models");
const Admin = db.admin;

checkDuplicateUsername = async (req, res, next) => {
  try {
    let admin = await Admin.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (admin) {
      return res.status(400).send({
        message: "Nutzername wird bereits verwendet",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      message: "Nutzername kann nicht validiert werden",
    });
  }
};

const verifySignUp = {
  checkDuplicateUsername,
};
module.exports = verifySignUp;
