import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, info }) => {
  return (
    <div className='pagination'>
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={!info.prev}>
        Prev
      </button>
      <span id='currentPage'>{currentPage}</span>
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={!info.next}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
