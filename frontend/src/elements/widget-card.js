import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";

let cardStyle = {
  margin: 15,
  marginBottom: 15,
  borderRadius: 5,
};

const cardContentStyle = {
  padding: 16,
};

export function WidgetCard(props) {
  const { children } = props;

  return (
    <Card style={{ ...cardStyle }} elevation={0}>
      <CardContent style={cardContentStyle}>{children}</CardContent>
    </Card>
  );
}
