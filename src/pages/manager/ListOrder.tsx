import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TablePagination,
  TextField,
  Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import MuiTab, { TabProps } from '@mui/material/Tab';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import useDebounce from "../../hook/useDebounce";
import { PaginationType } from "../../types/CommonType";
import { FilterOrderType, OrderType } from "../../types/Order/OrderType";
import { TabContext, TabList } from "@mui/lab";
import OrderAPI from "../../utils/OrderAPI";
import moment from "moment";
import MenuActionOrder from "../../components/manager/MenuAction/MenuActionOrder";

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
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
}))

export const renderStatusOrder = (status: string) => {
  switch (status) {
    case "UNPAID":
      return <Chip sx={{minWidth:120}} label={"Chưa Đặt Cọc"} color="warning" size="small"/>
    case "PAID":
      return <Chip sx={{minWidth:120}}  label={"Đã Đặt Cọc"} color="info" size="small"/>
    case "COMPLETED":
      return <Chip sx={{minWidth:120}}  label={"Hoàn Thành"} color="success" size="small"/>
    case "CANCELED":
      return <Chip sx={{minWidth:120}}  label={"Đã Hủy"} color="error" size="small"/>
  }
}
export default function ListOrder() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [listOrder, setListOrder] = React.useState<OrderType[] | []>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationType>({
    page: 1,
    size: 10,
    total: 10,
    totalPages: 1,
  });
  const [searchCreateDate, setSearchCreateDate] = React.useState("");
  const [filter, setFilter] = React.useState<FilterOrderType>({
    page: 1,
    size: 10,
  });
  const debouncedInputValueDate = useDebounce(searchCreateDate, 500); // Debounce with 500ms delay

  const [value, setValue] = React.useState<string>('ALL')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    setFilter((prev) => ({ ...prev, Type: newValue === "ALL" ? "" : newValue}))
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setFilter((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter((prev) => ({ ...prev, page: 1, size: +event.target.value }));
  };
  const handleSearchCreateDate = (date: string) => {
    setSearchCreateDate(date ? moment(date).format("YYYY-MM-DD") : "");
  };

  const fetchAllOrder = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await OrderAPI.getAll(filter);
      console.log({ data });
      setListOrder(data.items);
      setPagination({
        page: data.page,
        size: data.size,
        total: data.total,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.log("Error get list Order: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);
  React.useEffect(() => {
    fetchAllOrder();
  }, [fetchAllOrder]);

  React.useEffect(() => {
    setFilter((prev) => ({ ...prev, CreateDate: debouncedInputValueDate }));
  }, [debouncedInputValueDate]);


  return (
    <Paper sx={{ p: 3 }}>
       <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='ALL'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TabName>Tất Cả</TabName>
                </Box>
              }
            />       
            <Tab
              value='CUSTOMERREQUEST'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TabName>Nhân Viên Được Chọn Bởi Khách</TabName>
                </Box>
              }
            />
            <Tab
              value='MANAGERREQUEST'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TabName>Nhân Viên Do Quản Lý Chọn</TabName>
                </Box>
              }
            />
          </TabList>
          </TabContext>
          <Box mb={5}></Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={3}
          sx={{ mb: 3, mt: 2 }}
        >
          {/* <TextField
            size="small"
            placeholder="Nhập ngày tạo đơn..."
            label="Ngày tạo đơn"
            type="date"
            value={searchCreateDate}
            onChange={(e) => handleSearchCreateDate(e.target.value)}
            sx={{ width: "300px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          /> */}
           <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "300px" }} size="small">
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter.Status}
                label="Trạng thái"
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    Status: e.target.value as string,
                  }))
                }
              >
                <MenuItem value={""}>Tất cả</MenuItem>
                <MenuItem value={"UNPAID"}>Chưa thanh toán</MenuItem>
                <MenuItem value={"PAID"}>Đã thanh toán</MenuItem>
                <MenuItem value={"COMPLETED"}>Hoàn thành</MenuItem>
                <MenuItem value={"CANCELED"}>Đã hủy</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>


      <TableContainer component={Paper} sx={{ minHeight: 600 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">Tên Khách Hàng</StyledTableCell>
              <StyledTableCell align="center">Ngày Tạo</StyledTableCell>  
              <StyledTableCell align="center">Ngày Hoàn Thành</StyledTableCell>  
              <StyledTableCell align="center">Giá Tiền</StyledTableCell> 
              <StyledTableCell align="center">Loại</StyledTableCell> 
              <StyledTableCell align="center">Trạng thái</StyledTableCell>   
              <StyledTableCell align="center">Thao Tác</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOrder.length === 0 && isLoading === false && (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="left">
                  <Typography align="center">Không có dữ liệu!</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
            {isLoading &&
              Array.from({ length: 10 }).map((data, index) => (
                <StyledTableRow hover={true} key={index}>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            {listOrder.length > 0 &&
              isLoading === false &&
              listOrder.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center" size="small">
                    {(pagination.page - 1) * pagination.size + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {row.userInfo.fullName}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    size="small"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "250px",
                    }}
                  >
                    {moment(row.createdDate).format("DD/MM/YYYY - HH:mm:A")}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                  {row.excutionDate ? moment(row.excutionDate).format("DD/MM/YYYY - HH:mm:A") : "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {row.finalAmount.toLocaleString()} VNĐ
                  </StyledTableCell>  
                  <StyledTableCell align="center" size="small">
                    {row.petInfor.typePet.name}
                  </StyledTableCell>    
                  <StyledTableCell align="center" size="small">
                    {renderStatusOrder(row.status)}
                  </StyledTableCell> 
                  <StyledTableCell align="center" size="small"> 
                    <MenuActionOrder
                     data={row}
                  /></StyledTableCell>               
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.size}
        page={pagination.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Hàng trên trang"
        labelDisplayedRows={({ from, to, count }) => {
          return `${from}–${to} / ${count !== -1 ? count : `nhiều hơn ${to}`}`;
        }}
      />
    </Paper>
  );
}
