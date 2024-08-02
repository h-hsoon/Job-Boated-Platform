import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function Header({ handleLogout, loggedIn, Datatoken }) {
  let url;
  if (loggedIn && Datatoken) {
    url =
      Datatoken.userType === "employee"
        ? `/employee/${Datatoken.id}`
        : `/employer/${Datatoken.id}`;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {loggedIn ? (
            <>
              <Button
                color="inherit"
                onClick={handleLogout}
                component={Link}
                to="/"
              >
                Logout
              </Button>
              <Button color="inherit" component={Link} to={url}>
                Profile
              </Button>
              {Datatoken.userType === "employer" && (
                <>
                  <Button color="inherit" component={Link} to={"/companyposts"}>
                    Company's Posts
                  </Button>
                  <Button color="inherit" component={Link} to="/post">
                    Add post
                  </Button>
                </>
              )}
              {Datatoken.userType === "employee" && (
                <>
                  <Button color="inherit" component={Link} to={"/follow"}>
                    following
                  </Button>
                  <Button color="inherit" component={Link} to="/favorites">
                    Favorites
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/registerEmployer">
                Register Employer
              </Button>
              <Button color="inherit" component={Link} to="/registerEmployee">
                Register Employee
              </Button>
            </>
          )}
          <Button color="inherit" component={Link} to="/allposts">
            All Posts
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
