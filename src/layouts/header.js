import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import logo from "../logo.svg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 1,
    overflow: "hidden",
  },
  toolbar: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <div data-testid="header" className={classes.root}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <RouterLink style={{ textDecoration: "none" }} to="/">
              <img id="logo" src={logo} width="60px" alt="logo" />
            </RouterLink>
            <div className={classes.toolbar}>
              <RouterLink style={{ textDecoration: "none" }} to="/">
                <Button style={{ marginRight: "20px", color: "#ffff" }}>
                  Home
                </Button>
              </RouterLink>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Header;
