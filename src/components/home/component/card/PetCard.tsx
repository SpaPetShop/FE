import React from "react";
import "./PetCard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Grid } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

interface Pet {
  id: string;
  name: string;
  stockPrice: number;
  sellingPrice: number;
  description?: string;
  status: string;
  priority?: string;
  category: {
    id: string;
    name: string;
  };
  image: any;
}

const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    // Store the pet information in localStorage
    localStorage.setItem("selectedPet", JSON.stringify(pet));

    // Navigate to the booking page
    navigate("/booking");
  };

  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Card sx={{ maxWidth: 400, textAlign: "center" }}>
        <CardMedia
          sx={{ height: 200, objectFit: "cover" }}
          image={pet.image}
          title={pet.name}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: "16px",
              height: "40px",
              color: "#272727",
              lineHeight: "20px",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            {pet.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              fontSize: "14px",
              fontWeight: "bold",
              color: "#e67e22",
            }}
          >
            {pet.sellingPrice.toLocaleString()} VNĐ
          </Typography>
          <Chip
            label={pet.status === "AVAILABLE" ? "Còn chỗ" : "Hết chỗ"}
            color={pet.status === "AVAILABLE" ? "success" : "error"}
          />
        </CardContent>
        <CardActions sx={{ mb: 2, placeContent: "center" }}>
          <Link to={`/${pet.id}`} className="detail-button">
            <Button
              size="small"
              sx={{
                borderRadius: "5px",
                width: "90px",
                fontSize: "8px",
              }}
              variant="outlined"
              color="warning"
            >
              Xem chi tiết
            </Button>
          </Link>
          <Button
            size="small"
            sx={{
              borderRadius: "5px",
              width: "90px",
              fontSize: "8px",
            }}
            variant="contained"
            color="warning"
            onClick={handleBookingClick}
          >
            Đặt lịch
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PetCard;