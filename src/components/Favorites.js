import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PaginationComponent from "./PaginationComponent";

const Favorites = ({ favorites, setFavorites }) => {
  const [movieState, setMovieState] = useState(false);
  const [local, setLocal] = useState();
  const itemsPerPage = 4;
  const [page, setPage] = React.useState(1);
  const [noOfPages, setNoOfPages] = React.useState(1);

  const removeFavorite = (favs) => {
    let filtered = favorites.filter((e) => e.id !== favs.id);
    setFavorites(filtered);
    localStorage.setItem("favorites", JSON.stringify(filtered));
  };


  useEffect(() => {
    if(localStorage.getItem("favorites")) {
      const saved = localStorage.getItem("favorites")
      const savedParse =  JSON.parse(saved);
      setLocal(savedParse)
      setMovieState(true)
    }
  }, [favorites]);

  return (
    <div className="container">
      <div className="container-title">
        <h1>Favorites</h1>
      </div>

      <div className="container-movie">
        {local &&
          local
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((e) => (
              <div className="card" key={uuidv4()}>
                <img src={e.movieImage} alt="movie" />
                <button className="close" onClick={() => removeFavorite(e)}>
                  X
                </button>
                <h1>{e.movieName}</h1>
              </div>
            ))}
      </div>

      <PaginationComponent
        movieState={movieState}
        movieData={local}
        setPage={setPage}
        setNoOfPages={setNoOfPages}
        itemsPerPage={itemsPerPage}
        noOfPages={noOfPages}
        page={page}
      />
    </div>
  );
};

export default Favorites;
