const { jwtAuth } = require("../middleware");
const { storeImage } = require("../middleware");
const controller = require("../controllers/report.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // app.get("/api/reports", [jwtAuth.verifyToken], controller.getReports)

  app.get("/api/reports", controller.getReports);

  app.post("/api/reports", [storeImage.array("file",3)], controller.postReport);

  app.put(
    "/api/reports/:reportId",
    [jwtAuth.verifyToken],[storeImage.array("file",3)],
    controller.updateReport
  );

  app.delete(
    "/api/reports/:reportId",
    [jwtAuth.verifyToken],
    controller.deleteReport
  );
};
