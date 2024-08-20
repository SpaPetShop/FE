import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { CustomerRequestType } from "../../../types/CustomerRequest/CustomerRequestType";

interface MenuProps {
    setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedRequest: React.Dispatch<React.SetStateAction<CustomerRequestType | null>>
    data:CustomerRequestType
    setTypeAction: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MenuActionCustomerRequest({data, setOpenConfirm, setSelectedRequest,setTypeAction}: MenuProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAccept = () => {
    setTypeAction(true)
    setAnchorEl(null);
    setOpenConfirm(true)
    setSelectedRequest(data)
  };
  const handleReject = () => {
    setTypeAction(false)
    setAnchorEl(null);
    setOpenConfirm(true)
    setSelectedRequest(data)
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ width: "20px" }}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleAccept}>
          <CheckCircleOutlineIcon sx={{ mr: "4px" }} color="success" />
          <span>Duyệt</span>
        </MenuItem>

        <MenuItem onClick={handleReject}>
          <HighlightOffIcon sx={{ mr: "4px" }} color="error" />
          <span>Hủy</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
