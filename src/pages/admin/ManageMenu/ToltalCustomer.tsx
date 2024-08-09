import React, { useState } from 'react';
import { DataGrid, GridColDef, GridToolbar, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const mockCustomers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234', address: '123 Main St' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678', address: '456 Elm St' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-8765', address: '789 Oak St' },
  { id: 4, name: 'Alice Davis', email: 'alice.davis@example.com', phone: '555-4321', address: '101 Maple St' },
  { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', phone: '555-6789', address: '202 Pine St' },
];

const TotalCustomer = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);

  const handleDelete = () => {
    setCustomers((prevCustomers) => prevCustomers.filter((customer) => !selectionModel.includes(customer.id)));
    setSelectionModel([]);
  };

  const handleEdit = (id: number) => {
    // Logic for editing a customer (e.g., open a dialog for editing)
    alert(`Editing customer with ID: ${id}`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    { field: 'address', headerName: 'Address', width: 250, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEdit(params.id as number)}
        >
          Edit
        </Button>
      ),
      width: 150,
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={customers}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newSelection: GridRowSelectionModel) => {
          setSelectionModel(newSelection as number[]);
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />
      {selectionModel.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          sx={{ mt: 2 }}
        >
          Delete Selected
        </Button>
      )}
    </Box>
  );
};

export default TotalCustomer;
