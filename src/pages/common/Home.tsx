import { Grid, IconButton } from "@mui/material";
import React from "react";
import { Container, Section, Title } from "../../components/home/Home.styles";
import PetCard from "../../components/home/component/card/PetCard";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const pets = [
  {
    type: "Chó",
    name: "Tắm cho chó",
    image:
      "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2023/01/4b70035a-cach-tam-cho-cho-3.jpg",
    price: "100,000 VND",
    duration: "30 phút",
    rate: "4.5",
    availability: "Còn chỗ",
  },
  {
    type: "Chó",
    name: "Cắt tỉa lông cho chó",
    image:
      "https://th.bing.com/th/id/OIP.niBP202iUFEcJTpPtagp2QHaF2?rs=1&pid=ImgDetMain",
    price: "150,000 VND",
    duration: "45 phút",
    rate: "4.8",
    availability: "Còn chỗ",
  },
  {
    type: "Chó",
    name: "Chăm sóc móng cho chó",
    image:
      "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2021/05/66f0d6ec-image.jpeg",
    price: "80,000 VND",
    duration: "20 phút",
    rate: "4.6",
    availability: "Còn chỗ",
  },
  {
    type: "Chó",
    name: "Tắm trị liệu cho chó",
    image:
      "https://th.bing.com/th/id/R.a9da928d4d3adc606d35dd66a29b5f22?rik=cejxSoWjAW07BA&pid=ImgRaw&r=0",
    price: "200,000 VND",
    duration: "40 phút",
    rate: "4.7",
    availability: "Còn chỗ",
  },
  {
    type: "Chó",
    name: "Chăm sóc răng miệng cho chó",
    image:
      "https://animalmedicalnc.com/wp-content/uploads/2017/01/amnc-brushing-dog-teeth-6.jpg",
    price: "120,000 VND",
    duration: "25 phút",
    rate: "4.9",
    availability: "Còn chỗ",
  },
  {
    type: "Chó",
    name: "Chăm sóc răng miệng cho chó",
    image:
      "https://animalmedicalnc.com/wp-content/uploads/2017/01/amnc-brushing-dog-teeth-6.jpg",
    price: "120,000 VND",
    duration: "25 phút",
    rate: "4.9",
    availability: "Còn chỗ",
  },
  {
    type: "Mèo",
    name: "Tắm cho mèo",
    image:
      "https://th.bing.com/th/id/OIP.HomFNHqDSGoXgZNMTcdjEQHaE8?rs=1&pid=ImgDetMain",
    price: "90,000 VND",
    duration: "30 phút",
    rate: "4.4",
    availability: "Còn chỗ",
  },
  {
    type: "Mèo",
    name: "Cắt tỉa lông cho mèo",
    image:
      "https://admin.petpro.com.vn/images/uploaded/1%20hanh%20luu/grooming-cat-with-clipper_BY-_-BY_Shutterstock.jpg",
    price: "130,000 VND",
    duration: "40 phút",
    rate: "4.7",
    availability: "Còn chỗ",
  },
  {
    type: "Mèo",
    name: "Chăm sóc móng cho mèo",
    image:
      "https://giadinhpet.com/wp-content/uploads/2021/07/cat-mong-cho-meo-min-1.jpg",
    price: "70,000 VND",
    duration: "15 phút",
    rate: "4.5",
    availability: "Còn chỗ",
  },
  {
    type: "Mèo",
    name: "Tắm trị liệu cho mèo",
    image:
      "https://cdn.tgdd.vn/Files/2023/03/27/1521829/huong-dan-cach-tu-lam-sua-tam-cho-meo-don-gian-tai-nha-202303280818439102.jpg",
    price: "180,000 VND",
    duration: "35 phút",
    rate: "4.8",
    availability: "Còn chỗ",
  },
  {
    type: "Mèo",
    name: "Chăm sóc răng miệng cho mèo",
    image:
      "https://happypaws.vn/wp-content/uploads/cham-soc-cho-meo-con-443-1200x800.jpg",
    price: "110,000 VND",
    duration: "20 phút",
    rate: "4.6",
    availability: "Còn chỗ",
  },
  {
    type: "Mèo",
    name: "Chăm sóc răng miệng cho mèo",
    image:
      "https://happypaws.vn/wp-content/uploads/cham-soc-cho-meo-con-443-1200x800.jpg",
    price: "110,000 VND",
    duration: "20 phút",
    rate: "4.6",
    availability: "Còn chỗ",
  },
];

const Home: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Container>
      <Title>Your Boss Our Care</Title>
      <Section>
        <h2>Chó</h2>
        <Grid container spacing={3}>
          {pets
            .filter((pet) => pet.type === "Chó")
            .map((pet) => (
              <PetCard key={pet.name} pet={pet} />
            ))}
        </Grid>
      </Section>
      <Section>
        <h2>Mèo</h2>
        <Grid container spacing={3}>
          {pets
            .filter((pet) => pet.type === "Mèo")
            .map((pet) => (
              <PetCard key={pet.name} pet={pet} />
            ))}
        </Grid>
      </Section>
      <IconButton
        aria-label="delete"
        size="large"
        sx={{ position: "fixed", bottom: 5, right: 5 }}
        onClick={handleScrollToTop}
      >
        <ArrowCircleUpIcon fontSize="inherit" color="success" />
      </IconButton>
    </Container>
  );
};

export default Home;
