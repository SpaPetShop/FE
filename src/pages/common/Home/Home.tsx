import { Grid, IconButton } from "@mui/material";
import React from "react";
import PetCard from "../../../components/home/component/card/PetCard";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import FeaturedTitle from "../../../components/common/highlight/FeaturedTitle";
import "./Home.css";
import petData from "../../../assets/data/home/index.json";
import PetImageGallery from "../../../components/home/component/gallery/PetImageGallery";

const Home: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="container">
      <FeaturedTitle
        title={"BOSS DỊCH VỤ"}
        subtitle={"Các loại dịch vụ chăm sóc cho thú cưng của bạn"}
      />
      <section className="section">
        <h2 className="title">Dịch vụ cho cún</h2>
        <Grid container spacing={3}>
          {petData.pets
            .filter((pet) => pet.type === "Chó")
            .map((pet) => (
              <PetCard key={pet.name} pet={pet} />
            ))}
        </Grid>
      </section>
      <section className="section">
        <h2 className="title">Dịch vụ cho mèo</h2>
        <Grid container spacing={3}>
          {petData.pets
            .filter((pet) => pet.type === "Mèo")
            .map((pet) => (
              <PetCard key={pet.name} pet={pet} />
            ))}
        </Grid>
      </section>
      <FeaturedTitle
        title={"KHOẢNH KHẮC THÚ CƯNG"}
        subtitle={"PET LIKE US AND SO WILL YOU"}
      />
      <PetImageGallery />
    </div>
  );
};

export default Home;