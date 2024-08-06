import React from 'react';
import './PetCard.css';

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
    <div className="pet-card">
      <div className="pet-card-image">
        <img src={pet.image} alt={pet.name} />
        <div className="buttons">
          <button className="detail-button">Xem chi tiết</button>
          <button className="book-button">Đặt lịch ngay</button>
        </div>
      </div>
      <div className="pet-card-content">
        <h3>{pet.name}</h3>
        <p className="price">{pet.price}</p>
        <p className={`availability ${pet.availability === "Còn chỗ" ? "in-stock" : "out-of-stock"}`}>{pet.availability}</p>
      </div>
    </div>
  );
};

export default PetCard;