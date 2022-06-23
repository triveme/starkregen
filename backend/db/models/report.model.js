module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define("report", {
    location: DataTypes.JSON,
    category: DataTypes.ENUM(
      "Überschwemmung",
      "Überstau Kanal",
      "Verstopfter Durchlass",
      "Gewässerengstellen",
      "Überlastete Gräben", 
      "Sonstiges"
    ),
    county: DataTypes.ENUM( 
      "Bad Salzschlirf",
      "Burghaun",
      "Dipperz",
      "Ebersburg",
      "Ehrenburg",
      "Eichenzell",
      "Eiterfeld",
      "Flieden",
      "Fulda",
      "Gersfeld",
      "Großenlüder",
      "Hilders",
      "Hofbieber",
      "Hosenfeld",
      "Hünfeld",
      "Kalbach",
      "Künzell",
      "Neuhof",
      "Nüsttal",
      "Petersberg",
      "Poppenhausen",
      "Rasdorf",
      "Tann",
      "Außerhalb"
    ),
    comment: DataTypes.STRING(400),
    adminComment:DataTypes.STRING(200),
    description: DataTypes.STRING(400),
    date: DataTypes.DATE,
    email: DataTypes.STRING,
    imgPath: DataTypes.JSON,
    status: DataTypes.ENUM("pending", "active", "hidden"),
    lastModifiedBy: DataTypes.INTEGER,
  });
  return Report;
};
