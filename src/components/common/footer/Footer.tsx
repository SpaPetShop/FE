import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography
} from "@mui/material";

function Footer() {
  return (
    <Box sx={{ zIndex: -1200 }}>
      {/* infomation */}
      <Box
        sx={{
          bgcolor: "#f57c00",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={10}
          sx={{ width: "85%", m: { xs: 0, md: "auto" } }}
        >
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography
              sx={{
                fontSize: { md: 26, lg: 26 },
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Pet Spa Service
            </Typography>
            <Typography
              sx={{
                fontSize: { md: 20, lg: 20 },
                mt: 2,
                color: "#fff",
              }}
            >
              14.14 Đường số 6, KĐT Hà Quang 2 P. Phước Hải, TP. Nha Trang
            </Typography>
            <Typography
              sx={{
                fontSize: { md: 18, lg: 18 },
                mt: 4,
                color: "#fff",
              }}
            >
              Alway Open
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography
              sx={{
                fontSize: { md: 26, lg: 26 },
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Liên hệ qua SĐT:
            </Typography>

            <Typography
              sx={{
                fontSize: { md: 18, lg: 18 },
                mt: 4,
                color: "#fff",
              }}
            >
              {" "}
              0258.3812078
              <br />
              0258.3812077
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography
              sx={{
                fontSize: { md: 26, lg: 26 },
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Customer Support Email.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: 20, lg: 20 },
                mt: 2,
                color: "#fff",
              }}
            >
              Send us an email with your thoughts.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: 18, lg: 18 },
                mt: 4,
                color: "#fff",
              }}
            >
              Master_FE_HaThanhDat@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/* social media contact */}
      <Box sx={{ bgcolor: "#1de9b6", pb: 1 }}>
        <Stack
          direction={"row"}
          spacing={3}
          justifyContent={"center"}
          sx={{ pt: 1, pb: 1 }}
        >
          <IconButton
            aria-label="delete"
            size="large"
            sx={{
              bgcolor: "#fff",
              "&:hover": {
                bgcolor: "#00C9C8",
              },
            }}
          >
            <FacebookIcon sx={{ color: "black" }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            sx={{
              bgcolor: "#fff",
              "&:hover": {
                bgcolor: "#00C9C8",
              },
            }}
          >
            <YouTubeIcon sx={{ color: "black" }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            sx={{
              bgcolor: "#fff",
              "&:hover": {
                bgcolor: "#00C9C8",
              },
            }}
          >
            <InstagramIcon sx={{ color: "black" }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            sx={{
              bgcolor: "#fff",
              "&:hover": {
                bgcolor: "#00C9C8",
              },
            }}
          >
            <TwitterIcon sx={{ color: "black" }} />
          </IconButton>
        </Stack>

        <Typography
          sx={{
            color: "#fff",
            fontSize: { lg: 24 },
            fontWeight: 550,
          }}
          align="center"
        >
          ©Copyright | Pet Spa Service 2019. All Right Reserved
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
