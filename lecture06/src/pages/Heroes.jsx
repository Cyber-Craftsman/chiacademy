import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';

const API_URL = 'https://rickandmortyapi.com/api/character';

const Heroes = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCharacters = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?page=${page + 1}`);
      setRows(response.data.results);
      setRowCount(response.data.info.count);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(paginationModel.page);
  }, [paginationModel.page]);

  const handleRowClick = (params) => {
    navigate(`/heroes/${params.id}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3, height: 600, width: '100%' }}>
      <Toolbar />
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        paginationMode='server'
        pageSizeOptions={[20]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        getRowId={(row) => row.id}
        onRowClick={handleRowClick}
      />
      <Outlet />
    </Box>
  );
};

export default Heroes;
