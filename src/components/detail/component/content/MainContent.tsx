import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../../types/Product/ProductType";
import styles from "./MainContent.module.css"; // Import CSS Module

interface MainContentProps {
  product: ProductType | null;
}

const MainContent: React.FC<MainContentProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    // Store the pet information in localStorage
    localStorage.setItem("selectedPet", JSON.stringify(product));

    // Navigate to the booking page
    navigate("/booking");
  };

  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.sellingPrice);

  return (
    <div className={styles.mainContent}>
      <div className={styles.productDetail}>
        <img
          src={product.image[0]?.imageURL}
          alt={product.name}
          className={styles.productImage} // Đảm bảo className này đang được áp dụng
        />
        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.productStatus}>
            <b>Tình trạng:</b>{" "}
            {product.status === "AVAILABLE" ? "Còn chỗ" : "Hết chỗ"}
          </p>
          <p className={styles.productStatus}>
            <b>Lượt đánh giá:</b> 1880
          </p>
          <p className={styles.productPrice}>
            <b>Giá bán:</b>{" "}
            <span className={styles.price}>{formattedPrice}</span>
          </p>
          <button onClick={handleBookingClick} className={styles.btnBuyNow}>
            Đặt lịch
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
