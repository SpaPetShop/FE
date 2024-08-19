import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import petAPI from "../../../utils/PetAPI";
import bookingAPI from "../../../utils/BookingAPI";

const Profile: React.FC = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const [view, setView] = useState<"pets" | "bookings">("pets");
  const [petList, setPetList] = useState<any[]>([]);
  const [bookingList, setBookingList] = useState<any[]>([]);

  useEffect(() => {
    const fetchPetList = async () => {
      try {
        const response = await petAPI.getPetsByCustomerId(userData.id);
        setPetList(response.items);
      } catch (error) {
        console.error("Error fetching pet list:", error);
      }
    };
    fetchPetList();
  }, [userData.id]);

  useEffect(() => {
    const fetchBookingList = async () => {
      try {
        const response: any = await bookingAPI.getBookingsByCustomerId(userData.id);
        setBookingList(response.items);
      } catch (error) {
        console.error("Error fetching booking list:", error);
      }
    };
    fetchBookingList();
  }, [userData.id]);

  const convertTypeToText = (type: string) => {
    switch (type) {
      case "UNPAID":
        return "Chưa thanh toán";
      case "PAID":
        return "Đã thanh toán";
      case "COMPLETED":
        return "Đã hoàn thành";
      case "CANCELED":
        return "Đã hủy";
      default:
        return type;
    }
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box sx={{ backgroundColor: "#e89305", p: 2, borderRadius: 1 }}>
            <Typography variant="h6" color="white">
              Profile Menu
            </Typography>
            <List component="nav">
              <ListItem button onClick={() => setView("pets")}>
                <ListItemText primary="My Pets" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => setView("bookings")}>
                <ListItemText primary="My Bookings" />
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          {view === "pets" ? (
            <Box>
              <Typography variant="h4" gutterBottom>
                My Pets
              </Typography>
              <Grid container spacing={2}>
                {petList.map((pet) => (
                  <Grid item xs={12} sm={6} md={4} key={pet.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={
                          pet.image ||
                          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        }
                        alt={pet.name}
                      />
                      <CardContent>
                        <Typography variant="h5">{pet.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {pet.typePet.name} - {pet.age} years old - {pet.weight} kg
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" gutterBottom>
                My Bookings
              </Typography>
              <List>
                {bookingList.map((booking) => (
                  <React.Fragment key={booking.orderId}>
                    <ListItem alignItems="flex-start">
                      <Avatar
                        alt={booking.petInfor.name}
                        src={booking.petInfor.image}
                        sx={{ mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6">
                          {booking.petInfor.name} - {booking.invoiceCode}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Ghi chú: {booking.description}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          Trạng thái: {convertTypeToText(booking.status)} 
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Nhân viên chăm sóc: {booking.staff.fullName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Tổng tiền: {booking.finalAmount.toLocaleString()} VND
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;