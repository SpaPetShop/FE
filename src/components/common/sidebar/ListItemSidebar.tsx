import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
export const managerSidebarItems = [
  {
    title: "Bảng điều khiển",
    path: "/manager-dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Quản lý nhân viên",
    path: "/manager-manage-staff",
    icon: <GroupAddIcon />,
  },
  {
    title: "Quản lý khách hàng",
    path: "/manager-manage-customer",
    icon: <PeopleIcon />,
  },
  {
    title: "Quản lý dịch vụ",
    path: "/manager-manage-service",
    icon: <SellOutlinedIcon />,
  },
  {
    title: "Quản lý đơn hàng",
    path: "/manager-manage-order",
    icon: <InventoryOutlinedIcon />,
  },
];

export const adminSidebarItems = [
  {
    title: "Bảng điều khiển",
    path: "/admin-dashboard",
    icon: <DashboardIcon />,

  },
  {
    title: "Quản lý đơn hàng",
    path: "/admin-manage-oderList",
    icon: <InventoryOutlinedIcon />,
    
  },
  {
    title: "Quản lý Account Manager",
    path: "/admin-manage-totalManager",
    icon: <InventoryOutlinedIcon />,
    
  },
  {
    title: "Quản lý Account Staff",
    path: "/admin-manage-totalStaff",
    icon: <InventoryOutlinedIcon />,
    
  },
  {
    title: "Quản lý Account Customer",
    path: "/admin-manage-totalCustomer",
    icon: <InventoryOutlinedIcon />,
    
  },
];
