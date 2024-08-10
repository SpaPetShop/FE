import React from 'react';
import './PetCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Grid } from '@mui/material';

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
  return (
    // <div className="pet-card">
    //   <div className="pet-card-image">
    //     <img src={pet.image} alt={pet.name} />
    //     <div className="buttons">
    //       <button className="detail-button">Xem chi tiết</button>
    //       <button className="book-button">Đặt lịch ngay</button>
    //     </div>
    //   </div>
    //   <div className="pet-card-content">
    //     <h3>{pet.name}</h3>
    //     <p className="price">{pet.price}</p>
    //     <p className={`availability ${pet.availability === "Còn chỗ" ? "in-stock" : "out-of-stock"}`}>{pet.availability}</p>
    //   </div>
    // </div>
    <Grid item xs={6} sm={4} md={3} lg={2}>
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        sx={{ height: 200, objectFit:"cover" }}
        image={pet.image}
        title={pet.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"20px", height:"48px"}}>
        {pet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt:1, mb:1}}>
         Giá: {pet.price}
        </Typography>
        <Chip label={pet.availability} color={pet.availability === "Còn chỗ" ? "success" : "error"}/>
      </CardContent>
      <CardActions sx={{mb:2}}>
        <Button size="small" sx={{borderRadius:"20px", width:"120px"}} variant='outlined' color='warning'>Xem chi tiết</Button>
        <Button size="small" sx={{borderRadius:"20px", width:"120px"}} variant='contained' color='warning'>Đặt lịch</Button>
      </CardActions>
    </Card>
    </Grid>
  );
};

export default PetCard;