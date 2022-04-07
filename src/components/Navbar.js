import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  return (
    <nav>
      <ol>
        <li>
          <NavLink value="/" label="Home" to="/">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink value="/favorites" label="Favorites" to="/favorites">
            Favorites
          </NavLink>
        </li>
      </ol>
    </nav>
  );
};

export default Navbar;
