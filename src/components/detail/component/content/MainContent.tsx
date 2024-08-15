import React from "react";
import "./MainContent.css";

const MainContent: React.FC = () => (
  <div className="main-content">
    <div className="product-detail">
      <img
        src="https://th.bing.com/th/id/OIP.niBP202iUFEcJTpPtagp2QHaF2?rs=1&pid=ImgDetMain"
        alt="Cắt tỉa lông cho cún"
      />
      <div className="product-info">
        <h1>Cắt tỉa lông cho cún</h1>
        <p><b>Mã dịch vụ:</b> SP0000299</p>
        <p><b>Tình trạng:</b> Còn chỗ</p>
        <p><b>Lượt đánh giá:</b> 1880</p>
        <p><b>Giá bán:</b> <span className="price">150.000 VNĐ</span></p>
        <button className="btn btn-add-cart"><span>Thêm vào giỏ hàng</span></button>
        <button className="btn btn-buy-now"><span>Mua ngay</span></button>
      </div>
    </div>
  </div>
);

export default MainContent;
