import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography
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
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hook/useDebounce";
import { FilterTaskType, TaskType } from "../../types/Task/TaskType";
import { UserType } from "../../types/User/UserType";
import TaskAPI from "../../utils/TaskAPI";
import UserAPI from "../../utils/UserAPI";

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

export const renderStatusTask = (status: string) => {
  switch (status) {
    case "PENDING":
      return <Chip sx={{minWidth:120}} label={"Đang chờ"} color="warning" size="small"/>
    case "ACCEPT":
        return <Chip sx={{minWidth:120}} label={"Đã nhận"} color="secondary" size="small"/>
    case "PROCESS":
      return <Chip sx={{minWidth:120}}  label={"Đang xử lí"} color="info" size="small"/>
    case "COMPLETED":
      return <Chip sx={{minWidth:120}}  label={"Hoàn Thành"} color="success" size="small"/>
    case "REJECT":
        return <Chip sx={{minWidth:120}} label={"Từ chối"} color="error" size="small"/>
  }
}
export default function ListTask() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false);
  const [listTask, setListTask] = React.useState<TaskType[] | []>(
    []
  );
  const [listStaff, setListStaff] = React.useState<UserType[] | []>([]);
  // const [pagination, setPagination] = React.useState<PaginationType>({
  //   page: 1,
  //   size: 10,
  //   total: 10,
  //   totalPages: 1,
  // });
  const [searchStaff, setSearchStaff] = React.useState("");
  const [filter, setFilter] = React.useState<FilterTaskType>({
    page: 1,
    size: 10,
  });
  const [searchCreateDate, setSearchCreateDate] = React.useState("");
  const debouncedInputValueStaff = useDebounce(searchStaff, 500); // Debounce with 500ms delay
  const debouncedInputValueDate = useDebounce(searchCreateDate, 500); // Debounce with 500ms delay
  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setFilter((prev) => ({ ...prev, page: newPage }));
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setFilter((prev) => ({ ...prev, page: 1, size: +event.target.value }));
  // };
  // const handleSearchStaff = (staffId: string) => {
  //   setSearchStaff(staffId);
  // };
  const handleSearchCreateDate = (date: string) => {
    setSearchCreateDate(date ? moment(date).format("YYYY-MM-DD") : "");
  };

  const fetchAllUser = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await TaskAPI.getAll(filter);
      console.log({ data });
      setListTask(data);
      // setPagination({
      //   page: 1,
      //   size: 10,
      //   total: 10,
      //   totalPages: 10,
      // });
    } catch (error) {
      console.log("Error get list User: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);
  React.useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);
  React.useEffect(() => {
    const fetchAllStaff = async () => {
      try {
        const data = await UserAPI.getAll({
          page: 1,
          size: 100,
          Role: "STAFF",
        });
        setListStaff(data.items);
      } catch (error) {
        console.log("Error get list staff: ", error);
      }
    };
    fetchAllStaff();
  }, []);

  React.useEffect(() => {
    setFilter((prev) => ({ ...prev, AccountId: debouncedInputValueStaff }));
  }, [debouncedInputValueStaff]);

  React.useEffect(() => {
    setFilter((prev) => ({ ...prev, ExcutionDate: debouncedInputValueDate }));
  }, [debouncedInputValueDate]);


  return (
    <Paper sx={{ p: 3, minHeight:"85vh" }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={3}
          sx={{ mb: 3, mt: 2 }}
        >
 <Autocomplete
      id="country-select-demo"
      sx={{ width: "300px" }}
      options={listStaff}
      autoHighlight
      size="small"
      getOptionLabel={(option) => option.fullName}
      onChange={(event, value) => {
        console.log(value, event);
        if (value) {
          setSearchStaff(value.id);
        } else {
          setSearchStaff("")
        }
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option.id}
        >
          <img
            loading="lazy"
            width="50"
            height={"50"}
            src={`${option.image}`}
            alt="imageProduct"
            style={{ objectFit: "contain" }}
          />
          {option.fullName}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tìm kiếm theo nhân viên"
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <SearchOutlinedIcon />
          //     </InputAdornment>
          //   ),
          // }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "off", // disable autocomplete and autofill
          }}
        />
      )}
    />
         <TextField
            size="small"
            placeholder="Nhập ngày thực thi..."
            label="Ngày thực thi"
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
          />
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
                <MenuItem value={"PENDING"}>Đang chờ</MenuItem>
                <MenuItem value={"PROCESS"}>Đang xử lí</MenuItem>
                <MenuItem value={"COMPLETED"}>Hoàn thành</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>


      <TableContainer component={Paper} sx={{ minHeight: 600 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">Tên Nhân Viên</StyledTableCell>
              <StyledTableCell align="center">Ngày Tạo</StyledTableCell>  
              <StyledTableCell align="center">Ngày Thực Thi</StyledTableCell>  
              <StyledTableCell align="center">Ngày Hoàn Thành</StyledTableCell>  
              <StyledTableCell align="center">Trạng thái</StyledTableCell>  
              <StyledTableCell align="center">Hóa Đơn</StyledTableCell>   
            </TableRow>
          </TableHead>
          <TableBody>
            {listTask.length === 0 && isLoading === false && (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="left">
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
                  
                </StyledTableRow>
              ))}
            {listTask.length > 0 &&
              isLoading === false &&
              listTask.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center" size="small">
                    {/* {(pagination.page - 1) * pagination.size + index + 1} */}
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    {row.staff.fullName}
                  </StyledTableCell>              
                  <StyledTableCell align="center" size="small">
                    {row.createDate ? moment(row.createDate).format("DD/MM/YYYY - HH:mm") :"-"}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                  {row.excutionDate ? moment(row.excutionDate).format("DD/MM/YYYY - HH:mm") :"-"}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                  {row.completedDate ? moment(row.completedDate).format("DD/MM/YYYY - HH:mm") :"-"}
                  </StyledTableCell>             
                  <StyledTableCell align="center" size="small">
                    {renderStatusTask(row.status)}
                  </StyledTableCell>
                  <StyledTableCell align="center" size="small">
                    <Tooltip title={"Xem chi tiết"} sx={{cursor:"pointer"}}
                    onClick={()=>navigate(`/manager-manage-order/${row.order.id}`)}
                    >
                      <VisibilityOutlinedIcon color="success"/>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
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
      /> */}
    </Paper>
  );
}
