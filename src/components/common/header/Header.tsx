import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logoImage from "../../../assets/images/home/logo.png";

const Header: React.FC = () => (
  <header className="header-container">
    <div className="logo">
      <Link to="/">
        <img src={logoImage} alt="Pet Station" />
      </Link>
    </div>
    <nav>
      <ul>
        <li>
          <Link to="/">Trang chủ</Link>
        </li>
        {/* <li><a href="#about">Giới thiệu</a></li> */}
        <li>
          <Link to="/detail">Sản phẩm</Link>
        </li>
        {/* <li><a href="#services">Dịch vụ</a></li> */}
        <li>
          <Link to="/booking">Đặt lịch</Link>
        </li>
        {/* <li><a href="#events">Sự kiện</a></li> */}
        {/* <li><a href="#contact">Liên hệ</a></li> */}
      </ul>
    </nav>
  </header>
);

export default Header;
