import React from "react";
import "./MainContent.css";
import { ProductType } from "../../../../types/Product/ProductType";

interface MainContentProps {
  product: ProductType | null;
}

const MainContent: React.FC<MainContentProps> = ({ product }) => {
  if (!product) return null;
  return (
    <div className="main-content">
      <div className="product-detail">
        <img
          src={product?.image[0]?.imageURL}
          alt="Cắt tỉa lông cho cún"
        />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p>
            <b>Mã dịch vụ:</b> {product.id}
          </p>
          <p>
            <b>Tình trạng:</b>{" "}
            {product.status === "AVAILABLE" ? "Còn chỗ" : "Hết chỗ"}
          </p>
          <p>
            <b>Lượt đánh giá:</b> 1880
          </p>
          <p>
            <b>Giá bán:</b>{" "}
            <span className="price">{product.sellingPrice} VNĐ</span>
          </p>
          <button className="btn btn-add-cart">
            <span>Thêm vào giỏ hàng</span>
          </button>
          <button className="btn btn-buy-now">
            <span>Mua ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;