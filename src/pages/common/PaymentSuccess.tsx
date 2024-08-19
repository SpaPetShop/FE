import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate()
  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        // paddingTop: "20vh",
        backgroundImage: 'url("/background_login.jpg")',
        backgroundSize: "cover",
        justifyContent: 'center',
        display: "flex",
        alignItems: "center",     
      }}
    >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 10,
            textAlign: 'center',
            backgroundColor: "rgba(255, 255, 255, 0.8)"
          }}
        >
          <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
          <Typography variant="h4" sx={{ mt: 2 }}>
            Thanh toán thành công!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            style={{
                borderRadius: 35,
                backgroundColor: "#e65100",             
                fontSize: "15px",
              }}
            onClick={() => navigate('/')}
          >
            Quay về trang chủ
          </Button>
        </Box>
        </Box>
      );
    };

export default PaymentSuccess