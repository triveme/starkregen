const { jwtAuth } = require("../middleware");
const controller = require("../controllers/admin.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/admins", [jwtAuth.verifyToken], controller.getAdmins);

  app.post("/api/admins", [jwtAuth.verifyToken], controller.postAdmin);

  app.put(
    "/api/admins/:adminId",
    [jwtAuth.verifyToken],
    controller.updateAdmin
  );

  app.delete(
    "/api/admins/:adminId",
    [jwtAuth.verifyToken],
    controller.deleteAdmin
  );
};
