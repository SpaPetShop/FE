import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Chip,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  TablePagination,
  tableCellClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  UserType,
} from "../../../types/User/UserType"
import AdminManageStaffAPI from '../../../utils/AdminMangeStaffAPI';
import ModalUpdateUser from "../../../components/manager/Modal/User/ModalUpdateUser";
import ModalDeleteUser from "../../../components/manager/Modal/User/ModalDeleteUser";
import MenuActionManageCustomer from '../../../components/manager/MenuAction/MenuActionManageCustomer';
import ModalUpdateCustomer from '../../../components/manager/Modal/Customer/ModalUpdateCustomer';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f4511e',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: '#81d4fa',
  },
}));


const TotalCustomer = () => {
  const [customers, setCustomers] = useState<UserType[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
 
  const [showModalUpdate, setShowModalUpdate] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);

  const [selectedUser, setSelectedUser] = React.useState<UserType | null>(null);

  const formatGender = (gender: string) => {
    switch (gender.toUpperCase()) {
      case 'MALE':
        return 'Nam';
      case 'FEMALE':
        return 'Nữ';
      default:
        return 'Khác'; // You can use this for any other gender values or as a fallback
    }
  };
  const fetchAllUser = async () => {
    try {
      const response: any = await AdminManageStaffAPI.getAll({ role: 'User' });
      setCustomers(response.items);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleSearchName = (name: string) => {
    setSearchTerm(name);
  };
  const filteredCustomers = customers.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedStaff = filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField
          size="small"
          placeholder="Nhập tên nhân viên ..."
          label="Tìm kiếm"
          onChange={(e) => handleSearchName(e.target.value)}
          sx={{ mt: 2, mb: 3, ml: 3, width: '345px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
       
      </Stack>
      <TableContainer component={Paper} sx={{ minHeight: 600 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">Tên nhân viên</StyledTableCell>
              <StyledTableCell align="center">Số điện thoại</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Giới tính</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell align="center">Thao tác</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaff.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center" size="small">
                  {page * rowsPerPage + index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" size="small">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar src={row.image || '/default-avatar.png'} />
                    <Typography>{row.fullName}</Typography>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="center" size="small">
                  {row.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="center" size="small">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell align="center" size="small">
                  {formatGender(row.gender)}
                </StyledTableCell>
                <StyledTableCell align="center" size="small">
                  {row.status === 'ACTIVE' ? (
                    <Chip label="Đang hoạt động" color="success" />
                  ) : (
                    <Chip label="Ngưng hoạt động" color="error" />
                  )}
                </StyledTableCell>
                <StyledTableCell align="center" size="small">
                  <MenuActionManageCustomer
                   setOpenUpdate={setShowModalUpdate}                  
                   setOpenDelete={setShowModalDelete}
                   setSelectedUser={setSelectedUser}
                   data={row}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCustomers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    {selectedUser && <ModalUpdateCustomer
      open={showModalUpdate}
      setOpen={setShowModalUpdate}
      fetchAllUser={fetchAllUser}  
      data={selectedUser}
    />}
    {selectedUser && <ModalDeleteUser
      open={showModalDelete}
      setOpen={setShowModalDelete}
      fetchAllUser={fetchAllUser}  
      data={selectedUser}
    />}
    </Paper>
  );
};

export default TotalCustomer;
