import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Avatar,
  Button,
  Chip,
  InputAdornment,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import * as React from "react";
import MenuActionManageStaff from "../../components/manager/MenuActionManageStaff";
import ModalCreateStaff from "../../components/manager/ModalCreateStaff";
import { UserType } from "../../types/UserType";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f4511e",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#81d4fa",
  },
}));

const dataUsers: UserType[] = [
  {
    id: "1",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt 2",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "2",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "3",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "4",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "5",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "5",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "6",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "7",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "8",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "9",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "10",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "11",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
  {
    id: "12",
    avatar: "/",
    createdDate: "8/8/2024",
    name: "Hà Thành Đạt",
    phone: "0123456789",
    status: "ACTIVE",
  },
];

export default function ListStaff() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [listUser, setListUser] = React.useState<UserType[] | []>(dataUsers)
  const [showModalCreate, setShowModalCreate] = React.useState(false)

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchName = (name: string) => {
    if (name) setListUser(dataUsers.filter((user) => user.name.includes(name)));
    else setListUser(dataUsers.slice(startIndex, endIndex));
  };

  React.useEffect(() => {
    const newData = dataUsers.slice(startIndex, endIndex);
    setListUser(newData);
  }, [page, rowsPerPage, startIndex, endIndex]);
  console.log(Math.ceil(dataUsers.length / rowsPerPage));
  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <TextField
          size="small"
          placeholder="Nhập tên nhân viên ..."
          label="Tìm kiếm"
          onChange={(e) => handleSearchName(e.target.value)}
          sx={{ mt: 2, mb: 3, ml: 3, width: "345px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="info" startIcon={<PersonAddAltIcon/>}
        onClick={()=>setShowModalCreate(true)}
        >
          Tạo nhân viên
        </Button>
      </Stack>
      <TableContainer component={Paper} sx={{ minHeight: 600 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">Tên nhân viên</StyledTableCell>
              <StyledTableCell align="center">Số điện thoại</StyledTableCell>
              <StyledTableCell align="center">Ngày tham gia</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell align="center">Thao tác</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUser.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" size="small">
                  {page * rowsPerPage + index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" size="small">
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <Avatar src={row.avatar} />
                    <Typography>{row.name}</Typography>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="center" size="small">
                  {row.phone}
                </StyledTableCell>
                <StyledTableCell align="center" size="small">
                  {moment(row.createdDate).format("DD/MM/YYYY")}
                </StyledTableCell>
                <StyledTableCell align="center" size="small">
                  {row.status === "ACTIVE" ? (
                    <Chip label={"Đang hoạt động"} color="success"/>
                  ) : (
                    <Chip label={"Ngưng hoạt động"} color="error"/>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center" size="small">
                  <MenuActionManageStaff/>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ModalCreateStaff
      open={showModalCreate}
      setOpen={setShowModalCreate}
      />
      
    </Paper>
  );
}
