import { Box, Button, ButtonGroup, Chip, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

export default function DetailService() {
  const { id } = useParams();
  console.log({ id });
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: "90%" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            {" "}
            <CardMedia
              component="img"
              image="https://img5.thuthuatphanmem.vn/uploads/2021/12/27/hinh-nen-thu-cung-chat-luong-cao-2k-cho-may-tinh_050621563.jpg"
              alt="img service"
              height={700}
              // width={700}
              sx={{ objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Chăm sóc cho chó mèo
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Bao gồm:
              </Typography>
              <Typography
                sx={{ lineHeight: 3 }}
                variant="body2"
                color="text.secondary"
              >
                Bước 1: Thực hiện chăm sóc theo bước 1
              </Typography>
              <Typography
                sx={{ lineHeight: 3 }}
                variant="body2"
                color="text.secondary"
              >
                Bước 2: Thực hiện chăm sóc theo bước 2
              </Typography>
              <Typography
                sx={{ lineHeight: 3 }}
                variant="body2"
                color="text.secondary"
              >
                Bước 3: Thực hiện chăm sóc theo bước 3
              </Typography>
              <Typography
                sx={{ lineHeight: 3 }}
                variant="body2"
                color="text.secondary"
              >
                Bước 4: Thực hiện chăm sóc theo bước 4
              </Typography>
              <Typography
                sx={{ mt: 5 }}
                gutterBottom
                variant="h6"
                component="div"
              >
                Tổng giá tiền:
              </Typography>
              <Chip label={"100,000 VNĐ"}  style={{                  
                    backgroundColor: "#00e676",             
                  }} />
              <Box sx={{ mt: 10 }}>
                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                  <Button sx={{ width: 200 }} color="error" variant="outlined">
                    Ngưng hoạt động
                  </Button>
                  <Button
                    sx={{ width: 200 }}
                    style={{
                      backgroundColor: "#ffa733",
                      color:"black"
                    }}
                    variant="contained"
                  >
                    Cập nhật
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
