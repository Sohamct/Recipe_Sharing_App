import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Recipe Book
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/recipe">
                Recipe 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="#">
                Favourite recipe 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/newrecipe">
                  Add recipe

                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="myrecipe">
                My recipe

                </Link>
              </li>
              
            </ul>
            <div className="d-flex">
              <Link className="btn btn-outline-primary me-2" to="/signup">
                Sign Up
              </Link>
              <Link className="btn btn-outline-success mx-2" to="/login">
                Login
              </Link>
              <span> Logged in as: user1</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
