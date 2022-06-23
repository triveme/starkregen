require("dotenv").config();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const imageFilter = (req, file, cb) => {
  if (!file) {
    cb(null, true);
  }

  if (
    !file.mimetype.startsWith("image") ||
    !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)
  ) {
    snackActions.error(
      "Zur Zeit werden nur folgende Bildformate unterstüzt: jpg, jpeg, png"
    );
  }

  if (parseInt(req.headers["content-length"]) > 10485760) {
    cb("Das Bild ist zu groß (max. 10 MB)", false);
  }

  cb(null, true);
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    file ? cb(null, __basedir + process.env.IMAGE_DIR) : cb(null, "");
  },
  filename: (req, file, cb) => {
    file
      ? cb(null, `${uuidv4()}-starkregenmelder.${file.mimetype.substring(6)}`)
      : cb(null, "");
  },
});

var storeImage = multer({ storage: storage, fileFilter: imageFilter });

module.exports = storeImage;
