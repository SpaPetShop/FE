import React, { useState } from 'react';
import { DataGrid, GridColDef, GridToolbar, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface Manager {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
}

const mockManagers: Manager[] = [
  { id: 1, name: 'Michael Scott', email: 'michael.scott@dundermifflin.com', phone: '555-1234', department: 'Sales' },
  { id: 2, name: 'Jim Halpert', email: 'jim.halpert@dundermifflin.com', phone: '555-5678', department: 'Sales' },
  { id: 3, name: 'Pam Beesly', email: 'pam.beesly@dundermifflin.com', phone: '555-8765', department: 'Reception' },
  { id: 4, name: 'Dwight Schrute', email: 'dwight.schrute@dundermifflin.com', phone: '555-4321', department: 'Sales' },
  { id: 5, name: 'Stanley Hudson', email: 'stanley.hudson@dundermifflin.com', phone: '555-6789', department: 'Sales' },
];

const TotalManager = () => {
  const [managers, setManagers] = useState<Manager[]>(mockManagers);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [open, setOpen] = useState(false);
  const [newManager, setNewManager] = useState<Partial<Manager>>({
    name: '',
    email: '',
    phone: '',
    department: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    if (newManager.name && newManager.email && newManager.phone && newManager.department) {
      const newId = managers.length > 0 ? Math.max(...managers.map((m) => m.id)) + 1 : 1;
      setManagers([...managers, { ...newManager, id: newId } as Manager]);
      handleClose();
      setNewManager({ name: '', email: '', phone: '', department: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDelete = () => {
    setManagers((prevManagers) => prevManagers.filter((manager) => !selectionModel.includes(manager.id)));
    setSelectionModel([]);
  };

  const handleEdit = (id: number) => {
    // Logic for editing a manager account (e.g., open a dialog for editing)
    alert(`Editing manager with ID: ${id}`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    { field: 'department', headerName: 'Department', width: 150, editable: true },
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
        rows={managers}
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
        <DialogTitle>Create New Manager Account</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newManager.name}
            onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newManager.email}
            onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            value={newManager.phone}
            onChange={(e) => setNewManager({ ...newManager, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Department"
            type="text"
            fullWidth
            value={newManager.department}
            onChange={(e) => setNewManager({ ...newManager, department: e.target.value })}
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

export default TotalManager;
