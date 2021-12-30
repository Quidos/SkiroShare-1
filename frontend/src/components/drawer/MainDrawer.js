import React, { useEffect, useState } from "react";

import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import ElectricScooterIcon from "@mui/icons-material/ElectricScooter";
import HelpIcon from "@mui/icons-material/Help";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer as MUIDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { deepOrange, deepPurple } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";

const MainDrawer = () => {
  const drawerWidth = 240;
  let navigate = useNavigate();
  let location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  const getPageTitle = (path) => {
    if (path === "/") return "Domov";
    else if (path === "/objavi") return "Objavi Oglas";
    else if (path === "/pomoc") return "Pomoc";
    else if (path === "/nastavitve") return "Nastavitve";
    else if (path === "/mojiOglasi") return "Moji Oglasi";
  };

  useEffect(() => {
    setPageTitle(getPageTitle(location.pathname));
  }, [location]);

  const classes = {
    drawer: {
      width: drawerWidth,
      ".MuiDrawer-paper": {
        width: drawerWidth,
      },
    },
  };

  const itemList = [
    {
      text: "Domov",
      icon: <HomeIcon />,
      onClick: () => navigate("/"),
    },
    {
      text: "Objavi",
      icon: <ElectricScooterIcon />,
      onClick: () => navigate("/objavi"),
    },
    {
      text: "Moji Oglasi",
      icon: <LibraryBooksIcon />,
      onClick: () => navigate("/mojiOglasi"),
    },
    {
      text: "Pomoc",
      icon: <HelpIcon />,
      onClick: () => navigate("/pomoc"),
    },
    {
      text: "Nastavitve",
      icon: <SettingsIcon />,
      onClick: () => navigate("/nastavitve"),
    },

    {
      text: "Odjava",
      icon: <LogoutIcon />,
      onClick: () => navigate("/login"),
    },
  ];

  return (
    <div>
      <MUIDrawer variant="permanent" sx={classes.drawer}>
        <AppBar position="fixed">
          <Toolbar
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              //   onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Skiro Share
            </Typography>
            <Typography variant="h6" noWrap component="div">
              {pageTitle}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 2 }}>
                D
              </Avatar>
              {/* <Button variant="outlined" style={{ backgroundColor: "white" }}>
                Prijava
              </Button> */}
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <List>
          {itemList.map(({ text, icon, onClick }, index) => {
            if (index < 3) {
              return (
                <ListItem button key={index} onClick={onClick}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              );
            }
          })}
        </List>
        <Divider />
        <List>
          {itemList.map(({ text, icon, onClick }, index) => {
            if (index >= 3) {
              return (
                <ListItem button key={index} onClick={onClick}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              );
            }
          })}
        </List>
      </MUIDrawer>
    </div>
  );
};

export default MainDrawer;
