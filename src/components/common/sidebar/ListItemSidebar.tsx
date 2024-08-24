import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PeopleIcon from "@mui/icons-material/People";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import PetsIcon from '@mui/icons-material/Pets';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const managerSidebarItems = [
  {
    title: "Danh sách đơn hàng",
    path: "/manager-manage-order",
    icon: <InventoryOutlinedIcon />,
  },
  {
    title: "Danh sách khách hàng",
    path: "/manager-manage-customer",
    icon: <PeopleIcon />,
  },
  {
    title: "Danh sách yều cầu",
    path: "/manage-customer-request",
    icon: <InfoOutlinedIcon />,
  },
  {
    title: "Danh sách loại gói",
    path: "/manager-manage-category",
    icon: <ListAltOutlinedIcon />,
  },
  {
    title: "Danh sách loại thú cưng",
    path: "/manager-manage-pet-type",
    icon: <PetsIcon />,
  },
  {
    title: "Quản lý sản phẩm",
    path: "/manager-manage-product",
    icon: <StyleOutlinedIcon />,
  },
  {
    title: "Quản lý gói",
    path: "/manager-manage-combo",
    icon: <CardGiftcardOutlinedIcon />,
  },
  {
    title: "Quản lý nhân viên",
    path: "/manager-manage-staff",
    icon: <GroupAddIcon />,
  },
  {
    title: "Danh sách công việc",
    path: "/manager-manage-task",
    icon: <FormatListNumberedOutlinedIcon />,
  },
];

export const staffSidebarItems = [
  {
    title: "Danh sách công việc",
    path: "/staff-manage-task",
    icon: <FormatListNumberedOutlinedIcon />,
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

