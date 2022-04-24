import React, { useState } from "react";
import MovieArticle from "./MovieArticle";
import PaginationComponent from "./PaginationComponent";


const Home = ({ setFavorites, favorites }) => {
  const [movieState, setMovieState] = useState(false);
  const [movieData, setMovieData] = useState();
  const [movieInput, setMovieInput] = useState("");
  const [movieError, setMovieError] = useState(false);
  const itemsPerPage = 4;
  const [page, setPage] = React.useState(1);
  const [noOfPages, setNoOfPages] = React.useState(1);


  const movieSearch = (e) => {
    setMovieState(false);
    setMovieInput(e.target.value);
  };

  const handleSecondSubmit = (e) => {
    e.preventDefault();

    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=2a791d7b&s=${movieInput}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["Response"] !== "False") {
          setMovieData(data["Search"]);
          setMovieState(true);
          setMovieError(false);
        }

        if (data["Response"] === "False") {
          setMovieError(true);
        }

        console.log(data["Response"])
      });
  };

  return (
    <div className="container">
      <div className="container-search">
        <form onSubmit={(e) => handleSecondSubmit(e)}>
          <input
            value={movieInput}
            onChange={(e) => movieSearch(e)}
            type="text"
            placeholder="Search for movies..."
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
        
        <div className="container-movie">
          {movieState &&
            movieData
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((e) => (     
                <MovieArticle
                  key={movieData.indexOf(e)}
                  movieName={e["Title"]}
                  movieYear={e["Year"]}
                  id={e["imdbID"]}
                  movieImage={e["Poster"]}
                  setFavorites={setFavorites}
                  favorites={favorites}
                  movieData={movieData}
                />     
              ))} 
             <div>{movieError && <h1>Movie Not Found!</h1>}</div>  
        </div>

      <PaginationComponent
        movieState={movieState}
        setMovieState={setMovieState}
        movieData={movieData}
        setPage={setPage}
        setNoOfPages={setNoOfPages}
        itemsPerPage={itemsPerPage}
        noOfPages={noOfPages}
        page={page}
      />

     
    
    </div>
  );
};

export default Home;
