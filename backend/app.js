require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./db/models");
const Admin = db.admin;

global.__basedir = __dirname;

// TODO: disable force for production
db.sequelize.sync({ force: true }).then(() => {
  console.log(
    "Database re-synced. This message should never be seen in production!"
  );
  // Create initial admin if it doesn't exist
  createInitialAdminIfNeeded();
});
// TODO: uncomment for deployment
// db.sequelize.sync().then(() => {
//   console.log(
//     "Database synced."
//   );
//   // Create initial admin if it doesn't exist
//   createInitialAdminIfNeeded();
// });

createInitialAdminIfNeeded = async () => {
  let admin = await Admin.findOne({
    where: {
      username: "admin",
    },
  });
  if (admin) {
    console.log("admin account exists already and was therefore not created.");
    return;
  }

  Admin.create({
    username: process.env.DEFAULT_ADMIN_USERNAME,
    password: bcrypt.hashSync(process.env.DEFAULT_ADMIN_PASSWORD, 10),
  });
  console.log("");
  console.log(
    "Created inital admin with username: " +
      process.env.DEFAULT_ADMIN_USERNAME +
      " and password: " +
      process.env.DEFAULT_ADMIN_PASSWORD
  );
  console.log("PLEASE CHANGE THE PASSWORD IMMEDIATELY!");
  console.log("");
};

const app = express();

const FRONTEND_HOST = process.env.FRONTEND_HOST || "*";
var corsOptions = {
  origin: FRONTEND_HOST,
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// serve the report images
app.use("/public/images", express.static("public/images"));

require("./routes/auth.routes")(app);
require("./routes/admin.routes")(app);
require("./routes/report.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
