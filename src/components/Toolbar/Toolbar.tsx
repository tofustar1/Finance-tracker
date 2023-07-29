import React from 'react';
import {NavLink} from "react-router-dom";
import './Toolbar.css';

const Toolbar = () => {
  return (
      <nav className="container nav">
        <NavLink className="nav-link main-nav-link" to='/transactions'>Finance Tracker</NavLink>
        <ul className="nav-list">
          <li>
            <NavLink className="nav-link" to='/categories'>Categories</NavLink>
          </li>
          <li>
            <a href="#" className="nav-link">Add</a>
          </li>
        </ul>
      </nav>
  );
};

export default Toolbar;