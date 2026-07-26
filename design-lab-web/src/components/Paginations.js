// components/CPagination.js
import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxPageButtons = 3, // max page buttons in middle
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // No need to show pagination

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const createPageItems = () => {
    const items = [];

    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    // Adjust bounds if we're near the start or end
    if (currentPage <= half) {
      end = Math.min(totalPages, maxPageButtons);
    } else if (currentPage + half > totalPages) {
      start = Math.max(1, totalPages - maxPageButtons + 1);
    }

    if (start > 1) {
      items.push(<Pagination.Item key={1} onClick={() => handleClick(1)}>{1}</Pagination.Item>);
      if (start > 2) items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    for (let i = start; i <= end; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handleClick(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      items.push(<Pagination.Item key={totalPages} onClick={() => handleClick(totalPages)}>{totalPages}</Pagination.Item>);
    }

    return items;
  };

  return (
    <Pagination className="justify-content-center mb-0 pt-2">
      {/* <Pagination.First onClick={() => handleClick(1)} disabled={currentPage === 1} /> */}
      <Pagination.Prev onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} />

      {createPageItems()}

      <Pagination.Next onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} />
      {/* <Pagination.Last onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages} /> */}
    </Pagination>
  );
};

export default Paginations;
