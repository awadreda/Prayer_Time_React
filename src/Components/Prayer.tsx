import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

type PrayerProps = {
  nameOfPrayer: string;
  timeOfPreyer: string;
  image:string
};

export default function Prayer({ nameOfPrayer, timeOfPreyer , image }: PrayerProps) {
  return (
    <Card
      sx={{
        Width: 250,
        backgroundColor: "whitesmoke",
        marginTop: 5,
        marginBottom: 6,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.6)", // Add box shadow
       
        transition: "transform 0.4s ease, box-shadow 0.3s ease , background-color 0.4s ease",// Smooth animation
        ":hover": {
          transform: "scale(1.03)", // Slightly increase size
          boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.8)", // Enhance shadow
          backgroundColor: "wheat",
          
        },
      }}
    >
      <CardMedia
        sx={{ height: 150, width: 200 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <h2 style={{fontSize:"34px"}}>
          {nameOfPrayer}
        </h2>
        <Typography variant="h4" sx={{ color: "text.secondary" }}>
          {timeOfPreyer}
        </Typography>
      </CardContent>
    </Card>
  );
}
