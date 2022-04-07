import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";


function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    const savedParsed = JSON.parse(saved);
    if (savedParsed) {
      setFavorites(savedParsed);
    }
  }, [])


  return (
    <>
      <Navbar />
      <main>
        <Routes>
         
          <Route
            path="/"
            element={
              <>
                <Home setFavorites={setFavorites} favorites={favorites}/>
              </>
            }
          />

          <Route
            path="/favorites"
            element={
              <>
                <Favorites setFavorites={setFavorites} favorites={favorites}/>
              </>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
