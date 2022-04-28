import React, { useEffect, useCallback } from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({
  movieState,
  movieData,
  setPage,
  setNoOfPages,
  itemsPerPage,
  noOfPages,
  page,
}) => {
  const handleChange = (event, value) => {
    setPage(value);
  };


  //Another way to stop missing dependancies in the useEffect hook
  const fetchBusinesses = useCallback(() => {
    if (movieData) {
      setNoOfPages(Math.ceil(movieData.length / itemsPerPage));
    }
  }, [itemsPerPage, movieData, setNoOfPages])

  useEffect(() => {
    fetchBusinesses()
  }, [fetchBusinesses])


  return (
    <div className="container-pagination">
      {movieState && (
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
        />
      )}
    </div>
  );
};

export default PaginationComponent;
