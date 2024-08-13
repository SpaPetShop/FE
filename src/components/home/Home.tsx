import React from "react";
import "./Home.css";
import PetCard from "./component/card/PetCard";
import FeaturedTitle from "./component/highlight/FeaturedTitle";
import PetImageGallery from "./component/gallery/PetImageGallery";
import petData from "../../assets/data/home/index.json";

const Home: React.FC = () => (
  <div className="container">
    <FeaturedTitle
      title={"BOSS DỊCH VỤ"}
      subtitle={"Các loại dịch vụ chăm sóc cho thú cưng của bạn"}
    />
    <section className="section">
      <h2 className="title">Dịch vụ cho cún</h2>
      <div className="card-grid">
        {petData.pets
          .filter((pet) => pet.type === "Chó")
          .map((pet) => (
            <PetCard key={pet.name} pet={pet} />
          ))}
      </div>
    </section>
    <section className="section">
      <h2 className="title">Dịch vụ cho mèo</h2>
      <div className="card-grid">
        {petData.pets
          .filter((pet) => pet.type === "Mèo")
          .map((pet) => (
            <PetCard key={pet.name} pet={pet} />
          ))}
      </div>
    </section>
    <FeaturedTitle
      title={"KHOẢNH KHẮC THÚ CƯNG"}
      subtitle={"PET LIKE US AND SO WILL YOU"}
    />
    <PetImageGallery />
  </div>
);

export default Home;
