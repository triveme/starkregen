const jwt = require("jsonwebtoken");
const db = require("../db/models");
const Report = db.report;

const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

getIsAdmin = (req, res) => {
  let token = req.headers["x-access-token"];
  if (!token || token === "undefined") {
    return false;
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return false;
    }
  });

  return true;
};


exports.getReports = async (req, res) => {
  const isAdmin = getIsAdmin(req, res);
  // get all report data
  if (isAdmin) {
    Report.findAll()
      .then((reportData) => {
        res.status(200).send(reportData);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Beim Abrufen der Meldungen ist ein Fehler aufgetreten",
        });
      });
    return;
  }

  // get report data suitable for the public
  Report.findAll({
    attributes: ["id", "location", "status"],
    where: { status: "pending" },
  })
    .then((reportDataPending) => {
      Report.findAll({
        attributes: [
          "id",
          "location",
          "category",
          "comment",
          "county",
          "description",
          "date",
          "imgPath",
          "status",
        ],
        where: { status: "active" },
      })
        .then((reportDataActive) => {
          let combinedReportData = reportDataPending;
          combinedReportData.push(...reportDataActive);
          res.status(200).send(combinedReportData);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Beim Abrufen der aktiven, öffentlichen Meldungen ist ein Fehler aufgetreten",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Beim Abrufen der ausstehenden, öffentlichen Meldungen ist ein Fehler aufgetreten",
      });
    });
};

exports.postReport = async (req, res) => {

  if (
    !req.body.lat ||
    !req.body.lng ||
    !req.body.category ||
    !req.body.description ||
    !req.body.date ||
    !req.body.county
  ) {
    res.status(400).send({
      message: "Fehlende(r) Parameter",
    });
    return;
  }

  let imagePaths= [];

  if (req.files && req.files.length > 0){
    
    req.files.forEach(image => {
      if (image.filename){
        imagePaths.push(process.env.IMAGE_DIR + "/" + image.filename)
      }
    });
  }

  const report = {
    location: {
      coordinates: {
        lat: req.body.lat,
        lng: req.body.lng,
      },
    },
    category: req.body.category,
    county: req.body.county,
    comment: req.body.comment? req.body.comment : "",
    adminComment: req.body.adminComment ? req.body.adminComment :"",
    description: req.body.description,
    date: req.body.date,
    email: req.body.email ? req.body.email : "",
    imgPath:
      imagePaths,
    status: "pending",
    lastModifiedBy: null,
  };
  Report.create(report)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Während der Erzeugung der Meldung ist ein Datenbankfehler aufgetreten",
      });
    });
};

exports.updateReport = async (req, res) => {
  if (!req.params.reportId) {
    res.status(400).send({
      message: "Fehlende reportId",
    });
    return;
  }

  const report = await Report.findByPk(req.params.reportId);
  if (!report) {
    res.status(400).send({
      message: "Meldung wurde nicht gefunden",
    });
    return;
  }


  let updateFields = req.body


  // if (req.file){
  //   updateFields = {...updateFields, imgPath:
  //     req.file && req.file.filename
  //       ? process.env.IMAGE_DIR + "/" + req.file.filename
  //       : "",}
  // }

  //decode image paths
  let removedImages= [];
  if (req.body.removedImage ){
    removedImages = JSON.parse(req.body.removedImage)
  }

  //remove image paths in DB
  if (removedImages.length > 0){
    let newImgPaths = [...report.imgPath]
    removedImages.forEach((imagePath) => {
      const index = newImgPaths.indexOf(imagePath);
      if (index !== -1 && newImgPaths.length > index ){
        newImgPaths.splice(index,1);
      }
    })
    updateFields = {...updateFields, imgPath:newImgPaths,}
  }


  //remove image-files 
  if(removedImages.length > 0){
    for (const imagePath of removedImages){
      try {
        await unlinkAsync(__basedir + imagePath);
      } catch (err) {
        console.log(err);
        res.status(400).send({
          message: "Beim Löschen des Meldungsbilds ist ein Fehler aufgetreten",
        });
        return;
      }
    }
  }

    //add new images to DB
  if (req.files && req.files.length > 0){
      let imagePaths= [];
    req.files.forEach(image => {
      if (image.filename){
        imagePaths.push(process.env.IMAGE_DIR + "/" + image.filename)
      }
    });
    if (updateFields.imgPath  ){
      updateFields = {...updateFields, imgPath:[...updateFields.imgPath,...imagePaths],}
    } else {
      updateFields = {...updateFields, imgPath:[...report.imgPath,...imagePaths],}
    }
   
  }

  if (updateFields.lat && updateFields.lng ){
    updateFields = {...updateFields,location:{coordinates: {
      lat:updateFields.lat,
      lng:updateFields.lng
    }}}
  }
 

  report
    .update(updateFields)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message:
          err.message ||
          "Inkorrekte Meldungsdaten, die Aktualisierung funktioniert nicht",
      });
    });
};

exports.deleteReport = async (req, res) => {
  if (!req.params.reportId) {
    res.status(400).send({
      message: "Fehlende reportId",
    });
    return;
  }

  const report = await Report.findByPk(req.params.reportId);
  if (!report) {
    res.status(400).send({
      message: "Meldung wurde nicht gefunden",
    });
    return;
  }

  if (report.imgPath && report.imgPath.length > 0) {
    for (const imagePath of report.imgPath){
    try {
      await unlinkAsync(__basedir + imagePath);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        message: "Beim Löschen des Meldungsbilds ist ein Fehler aufgetreten",
      });
      return;
    }
  }
  }

  report
    .destroy()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message:
          err.message ||
          "Während des Löschens der Meldung ist ein Datenbankfehler aufgetreten",
      });
    });
};
