import React, { useContext } from "react";
import "./Header.css";
import logoImage from "../../../assets/images/home/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/AuthContext";
import { Button } from "@mui/material";

const Header: React.FC = () => {
  const currentUser = useContext(UserContext);
  const handleLogout = () => {
    currentUser.setUser(null);
    localStorage.removeItem("userData");
  };
  return (
    <header className="header-container">
      <div className="logo">
        <img src={logoImage} alt="Pet Station" />
        <span>Pet Station</span>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#home">Trang chủ</a>
          </li>
          <li>
            <a href="#about">Giới thiệu</a>
          </li>
          <li>
            <a href="#products">Sản phẩm</a>
          </li>
          <li>
            <a href="#services">Dịch vụ</a>
          </li>
          <li>
            <a href="#booking">Đặt lịch</a>
          </li>
          <li>
            <a href="#events">Sự kiện</a>
          </li>
          <li>
            <a href="#contact">Liên hệ</a>
          </li>
          {currentUser.user ? (
            <Button onClick={handleLogout}>Đăng xuất</Button>
          ) : (
            <Link to={"/login"}>Đăng nhập</Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
