import React, { useState, useEffect } from "react";

const MovieArticle = (props) => {
  const [favoriteState, setFavoriteState] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    const savedParsed = JSON.parse(saved);
    if (savedParsed) {
      props.setFavorites(savedParsed);
    }
    
    const exists = props.favorites.some((x) => x.id === props.id);

    if (exists) {
      setFavoriteState(!favoriteState);
    }
  }, []);

  const addFavorite = (event) => {
    const exists = props.favorites.some((x) => x.id === event.id);
    if (exists) {
      setFavoriteState(!favoriteState);
      let filtered = props.favorites.filter((e) => e.id !== event.id);
      props.setFavorites(filtered);
      localStorage.removeItem("favorites");
      localStorage.setItem("favorites", JSON.stringify(filtered));
    }

    if (!exists) {
      props.setFavorites((oldArr) => [...oldArr, event]);
      localStorage.setItem(
        "favorites",
        JSON.stringify([...props.favorites, event])
      );
      setFavoriteState(!favoriteState);
    }

  };

  const didWatch = () => {
    return (
      <svg
        width="30"
        height="26"
        viewBox="0 0 30 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8.71569V8.37584C0 4.28014 2.96016 0.786778 6.99609 0.114121C9.61523 -0.330605 12.3867 0.540098 14.2969 2.45318L15 3.15514L15.6504 2.45318C17.6133 0.540098 20.332 -0.330605 23.0039 0.114121C27.041 0.786778 30 4.28014 30 8.37584V8.71569C30 11.1473 28.9922 13.4735 27.2109 15.1317L16.623 25.0165C16.1836 25.4266 15.6035 25.6551 15 25.6551C14.3965 25.6551 13.8164 25.4266 13.377 25.0165L2.78848 15.1317C1.00957 13.4735 1.75781e-05 11.1473 1.75781e-05 8.71569H0Z"
          fill="#f74d4d"
        />
      </svg>
    );
  };

  const didNotWatch = () => {
    return (
      <svg
        width="30"
        height="27"
        viewBox="0 0 30 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 9.18555V8.84571C0 4.75 2.96016 1.25664 6.99609 0.583985C9.61523 0.139259 12.3867 1.00996 14.2969 2.92305L15 3.625L15.6504 2.92305C17.6133 1.00996 20.332 0.139259 23.0039 0.583985C27.041 1.25664 30 4.75 30 8.84571V9.18555C30 11.6172 28.9922 13.9434 27.2109 15.6016L16.623 25.4863C16.1836 25.8965 15.6035 26.125 15 26.125C14.3965 26.125 13.8164 25.8965 13.377 25.4863L2.78848 15.6016C1.00957 13.9434 1.75781e-05 11.6172 1.75781e-05 9.18555H0Z"
          fill="#fff"
          stroke="#ccc"
        />
      </svg>
    );
  };

  return (
    <div className="card">
      <img src={props.movieImage} alt="movie" />
      <div className="svg-container" onClick={() => addFavorite(props)}>
        {favoriteState ? didWatch() : didNotWatch()}
      </div>
      <h1>{props.movieName}</h1>
    </div>
  );
};

export default MovieArticle;
