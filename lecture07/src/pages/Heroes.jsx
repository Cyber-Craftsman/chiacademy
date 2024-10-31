import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Box, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { fetchCharacters } from '../api/characterApi';

const Heroes = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });
  const navigate = useNavigate();

  const { data, loading, error } = useRequest(() => fetchCharacters(paginationModel.page), {
    refreshDeps: [paginationModel.page],
    onError: (error) => console.error('Error fetching character list:', error),
  });

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
      {error ? (
        <Typography color='error'>Failed to load characters. Please try again later.</Typography>
      ) : (
        <DataGrid
          rows={data?.results || []}
          columns={columns}
          rowCount={data?.info?.count || 0}
          loading={loading}
          paginationMode='server'
          pageSizeOptions={[20]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          getRowId={(row) => row.id}
          onRowClick={handleRowClick}
        />
      )}
      <Outlet />
    </Box>
  );
};

export default Heroes;
