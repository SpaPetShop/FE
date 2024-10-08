import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/images/home/logo.png";
import { UserContext } from "../../../context/AuthContext";
import { ROLES } from "../../../routes/roles";
import "./Header.css";
import useCart from "../../../hook/useCart";

const Header: React.FC = () => {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const {cartItems} = useCart()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    currentUser.setUser(null);
    localStorage.removeItem("userData");
    navigate("/");
  };
  const renderRole = () => {
    switch (currentUser.user?.role?.toUpperCase()) {
      case ROLES.ADMIN:
        return {
          name: "Quản trị viên",
          icon: <AdminPanelSettingsIcon fontSize="small" />,
        };
      case ROLES.MANAGER:
        return {
          name: "Quản lý",
          icon: <AdminPanelSettingsIcon fontSize="small" />,
        };
      case ROLES.CUSTOMER:
        return {
          name: "Khách hàng",
          icon: <PersonOutlineIcon fontSize="small" />,
        };
      case ROLES.STAFF:
        return { name: "Nhân viên", icon: <AccountBoxIcon fontSize="small" /> };
    }
  };
  const role = renderRole();

  return (
    <header className="header-container">
      <div className="logo" onClick={()=>navigate("/")}>
        <img src={logoImage} alt="Pet SPA" />
        <span style={{fontSize:20,  fontWeight:700}}>Pet SPA</span>
      </div>
      <nav>
        <ul>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Link to={"/"}>Trang chủ</Link>
          </Stack>
          {currentUser.user?.role === ROLES.MANAGER && (
            <Stack
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
              <Link to={"/manager-manage-order"}>Bảng điều khiển</Link>
            </Stack>
          )}
          {currentUser.user?.role === ROLES.ADMIN && (
            <li>
              <Link to={"/admin-dashboard"}>Bảng điều khiển</Link>
            </li>
          )}
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Link to={"/"}>Giới thiệu</Link>
          </Stack>

          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Link to={"/"}>Dịch vụ</Link>
          </Stack>

          {currentUser.user?.role === ROLES.CUSTOMER && (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Link to={"/booking"}>Đặt lịch</Link>
            </Stack>
          )}
           {currentUser.user?.role === ROLES.CUSTOMER && (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
                <Badge badgeContent={cartItems.listCombo.length + cartItems.listProduct.length} color="success">
                <Link to={"/cart"}>Giỏ hàng</Link>
                </Badge>
              
            </Stack>
          )}
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Link to={"/contact"}>Liên hệ</Link>
          </Stack>
          {currentUser.user ? (
            <Box>
              <Box>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    // sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={currentUser.user.image || "/logo.png"}
                    ></Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"cenetr"}
                  spacing={1}
                  sx={{ p: 1, minWidth:234 }}
                >
                  <img
                    src={currentUser.user.image || "/logo.png"}
                    alt="Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                  <Box>
                    <Typography sx={{ color: "black", fontWeight: 700 }}>
                      {currentUser.user?.name}
                    </Typography>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      {role?.icon}
                      <Typography sx={{ color: "#dd2c00", fontWeight: 600 }}>
                        {role?.name}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Thông tin cá nhân
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Đăng xuất
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link to={"/login"}>Đăng nhập</Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
