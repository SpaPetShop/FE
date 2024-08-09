import React, { useState } from 'react';
import { DataGrid, GridColDef, GridToolbar, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const mockStaff: Staff[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@company.com', phone: '555-1234',  },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@company.com', phone: '555-5678', },
  { id: 3, name: 'Robert Johnson', email: 'robert.johnson@company.com', phone: '555-8765', },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', phone: '555-4321',  },
  { id: 5, name: 'Michael Brown', email: 'michael.brown@company.com', phone: '555-6789', },
];

const TotalStaff = () => {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [open, setOpen] = useState(false);
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    name: '',
    email: '',
    phone: '',
    
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    if (newStaff.name && newStaff.email && newStaff.phone ) {
      const newId = staff.length > 0 ? Math.max(...staff.map((s) => s.id)) + 1 : 1;
      setStaff([...staff, { ...newStaff, id: newId } as Staff]);
      handleClose();
      setNewStaff({ name: '', email: '', phone: '', });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDelete = () => {
    setStaff((prevStaff) => prevStaff.filter((s) => !selectionModel.includes(s.id)));
    setSelectionModel([]);
  };

  const handleEdit = (id: number) => {
    // Logic for editing a staff account (e.g., open a dialog for editing)
    alert(`Editing staff with ID: ${id}`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
 
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Account
        </Button>
        {selectionModel.length > 0 && (
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete Selected
          </Button>
        )}
      </Box>

      <DataGrid
        rows={staff}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Staff Account</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newStaff.email}
            onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            value={newStaff.phone}
            onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TotalStaff;
