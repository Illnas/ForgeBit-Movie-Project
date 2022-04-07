import React, { useEffect } from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({ movieState, movieData, setPage, setNoOfPages, itemsPerPage, noOfPages, page, savedParsed, setMovieState }) => {

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (movieData) {
      setNoOfPages(Math.ceil(movieData.length / itemsPerPage));
    }
  }, [movieData]);

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
