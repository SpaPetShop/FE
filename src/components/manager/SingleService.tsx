import { Chip, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ServiceType } from '../../types/ServiceType';

export type SingleCardServiceProps = {
  service: ServiceType
}

export default function SingleService({service}: SingleCardServiceProps) {
  return (
    <Grid item xs={4} sm={3} md={3} lg={2}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200, objectFit:"cover" }}
        image="/logo.png"
        title="Service Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt:1, mb:1}}>
         Giá: {service.price.toLocaleString()} VNĐ
        </Typography>
        <Chip label={service.status === "ACTIVE" ? "Đang hoạt động" : "Ngưng hoạt động"} color={service.status === "ACTIVE" ? "success" : "error"}/>
      </CardContent>
      <CardActions>
      <Button size="small" sx={{borderRadius:"20px", width:"120px"}} variant='outlined' color='warning'>Xem chi tiết</Button>
      </CardActions>
    </Card>
    </Grid>
  );
}
