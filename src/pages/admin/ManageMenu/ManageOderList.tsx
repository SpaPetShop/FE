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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import moment from 'moment';
import AdminManageStaffAPI from '../../../utils/AdminMangeStaffAPI';
import ModalCreateManager from '../ModalCreateManager';
import MenuActionManageManager from '../../../components/manager/MenuAction/MenuActionManageManager';
import AdminMangeOderAPi from '../../../utils/AdminManageOrderAPI';

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

interface Order {
  id: number;
  invoiceCode: string;
  createdDate: string;
  completedDate: string;
  finalAmount: string | null;
 
  status: string;
}



const ManageOrderList = () => {
 
  const [adminMangageOrder, setAdminMangageOrder] = useState<Order[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModalCreate, setShowModalCreate] = useState(false);

  // const handleDetail = (order: Order) => {
  //   setSelectedOrder(order);
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setSelectedOrder(null);
  // };
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response:any = await AdminMangeOderAPi.getAll({ status: '' });
        setAdminMangageOrder(response.items);
        console.log(response);
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      }
    };

    fetchOrder();
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
  const fillterOrder = adminMangageOrder.filter((oder) =>
    oder.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedStaff = fillterOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);



  return (
    <Paper sx={{ p: 2 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <TextField
        size="small"
        placeholder="Nhập mã đơn hàng ..."
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
            <StyledTableCell align="center">Mã đơn hàng</StyledTableCell>
            <StyledTableCell align="center">Ngày tạo</StyledTableCell>
            <StyledTableCell align="center">Ngày hoàn thanh</StyledTableCell>
            <StyledTableCell align="center">Tổng tiền</StyledTableCell>
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
              <StyledTableCell align="center" size="small">
                {row.invoiceCode}
              </StyledTableCell>
              
              <StyledTableCell align="center" size="small">
                {row.createdDate}
              </StyledTableCell>
              <StyledTableCell align="center" size="small">
                {row.completedDate}
              </StyledTableCell>
              <StyledTableCell align="center" size="small">
                {row.finalAmount}
              </StyledTableCell>
               
              
              <StyledTableCell align="center" size="small">
                {row.status === 'COMPLETED' ? (
                  <Chip label="Đã thanh toán" color="success" />
                ) : (
                  <Chip label="Chưa thanh " color="error" />
                )}
              </StyledTableCell>
              <StyledTableCell align="center" size="small">
                <MenuActionManageManager  /> 
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={fillterOrder.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />


  </Paper>
  );
};

export default ManageOrderList;
