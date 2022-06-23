import { Card, Divider } from "@mui/material";
import { CardContent } from "@mui/material";

const imageStyle = {
  width: "100%",
  height: "300px",
  objectFit: "cover",
  marginLeft: "auto",
};

const cardContentStyle = {
  mb: 2,
};

const dividerStyle = {
  ml: 2,
  mr: 2,
};

export function ImageCard({ img, title, description }) {
  return (
    <Card key={`image-card-${title}`} sx={{ width: "100%" }}>
      <img src={img} style={imageStyle} alt={title} />
      {title === "Sonstiges" ? <Divider sx={{ dividerStyle }} /> : null}
      <CardContent sx={cardContentStyle}>
        <strong>{title}</strong> <br /> <br />
        {description}
      </CardContent>
    </Card>
  );
}
