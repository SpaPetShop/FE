import React, { useContext } from "react";
import "./PetCard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { ROLES } from "../../../../routes/roles";
import { UserContext } from "../../../../context/AuthContext";

interface Pet {
  type: string;
  name: string;
  image: string;
  price: string;
  duration: string;
  rate: string;
  availability: string;
}

const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  const currentUser = useContext(UserContext)
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
            {pet.price}
          </Typography>
          <Chip
            label={pet.availability}
            color={pet.availability === "Còn chỗ" ? "success" : "error"}
          />
        </CardContent>
        <CardActions sx={{ mb: 2 }}>
          <Link to="/detail" className="detail-button">
            <Button
              size="small"
              sx={{
                borderRadius: "5px",
                width: "120px",
                fontSize: "8px",
              }}
              variant="outlined"
              color="warning"
            >
              Xem chi tiết
            </Button>
          </Link>
          {currentUser.user?.role === ROLES.CUSTOMER &&<Button
            size="small"
            sx={{
              borderRadius: "5px",
              width: "120px",
              fontSize: "8px",
            }}
            variant="contained"
            color="warning"
          >
            Đặt lịch
          </Button>}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PetCard;
