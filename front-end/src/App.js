import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Hidden from '@mui/material/Hidden';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardAdmin from "./components/BoardAdmin";
import Ticket from "./components/Ticket";
import { makeStyles } from 'tss-react/mui';
import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";

const useStyles = makeStyles()(theme => ({
	drawerPaper: {
    width: '100%',
  },
}));

const App = () => {
  const { classes } = useStyles();
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Event Betting
          </Link>
          <Hidden smDown>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {currentUser && !showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/ticket"} className="nav-link">
                    Ticket
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </Hidden>
          <Hidden smUp>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <IconButton aria-label="open meun" style={{color: 'white'}} onClick={() => setMenuOpen(true)}>
                  <MenuIcon />
                </IconButton>
              </li>
            </div>
            <Drawer
              anchor="left"
              classes={{
                paper: classes.drawerPaper
              }}
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
            >
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand" onClick={() => setMenuOpen(false)}>
                  Event Betting
                </Link>
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <IconButton aria-label="open meun" style={{color: 'white'}} onClick={() => setMenuOpen(false)}>
                      <MenuIcon />
                    </IconButton>
                  </li>
                </div>
              </nav>
              <div className="nav-item" onClick={() => setMenuOpen(false)}>
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </div>

              {currentUser && !showAdminBoard && (
                <div className="nav-item" onClick={() => setMenuOpen(false)}>
                  <Link to={"/ticket"} className="nav-link">
                    Ticket
                  </Link>
                </div>
              )}

              {showAdminBoard && (
                <div className="nav-item" onClick={() => setMenuOpen(false)}>
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </div>
              )}

              {currentUser ? (
                <React.Fragment>
                  <div className="nav-item" onClick={() => setMenuOpen(false)}>
                    <Link to={"/profile"} className="nav-link">
                      Profile
                    </Link>
                  </div>
                  <div className="nav-item" onClick={() => setMenuOpen(false)}>
                    <a href="/login" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="nav-item" onClick={() => setMenuOpen(false)}>
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </div>

                  <div className="nav-item" onClick={() => setMenuOpen(false)}>
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </div>
                </React.Fragment>
              )}
            </Drawer>
          </Hidden>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/ticket" element={<Ticket />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
