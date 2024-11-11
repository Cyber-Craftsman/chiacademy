import React, { useCallback } from 'react';
import { Pagination } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const PaginationComponent = ({ count, page, onPageChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = useCallback(
    (event, value) => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', value);
      const newUrl = `${location.pathname}?${searchParams.toString()}`;
      navigate(newUrl);

      if (onPageChange) {
        onPageChange(event, value);
      }
    },
    [navigate, location, onPageChange]
  );

  return <Pagination count={count} page={page} onChange={handlePageChange} />;
};

export default PaginationComponent;
