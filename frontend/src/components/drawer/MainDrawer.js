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
import SearchBar from "../SearchBar/SearchBar";
import InventoryIcon from "@mui/icons-material/Inventory";
import { getUporabnik, logoutUser, userByToken } from "../../util/utils";

const MainDrawer = () => {
  const drawerWidth = 240;
  let navigate = useNavigate();
  let location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const [username, setUsername] = useState("");

  const getPageTitle = (path) => {
    if (path === "/") return "Vsi Skiroji";
    else if (path === "/objavi") return "Objavi Skiro";
    else if (path === "/pomoc") return "Pomoc";
    else if (path === "/nastavitve") return "Nastavitve";
    else if (path === "/mojiOglasi") return "Moji Skiroji";
    else if (path === "/mojNajem") return "Moji Najemi";
    else if (path.startsWith("/posodobiOglas")) return "Posodobi Skiro";
  };

  useEffect(() => {
    setPageTitle(getPageTitle(location.pathname));
  }, [location]);

  useEffect(() => {
    userByToken().then((data) => {
      if (data) setUsername(data.charAt(0).toUpperCase());
    });
  }, []);

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
      text: "Vsi Skiroji",
      icon: <HomeIcon />,
      onClick: () => navigate("/"),
    },
    {
      text: "Objavi Skiro",
      icon: <ElectricScooterIcon />,
      onClick: () => navigate("/objavi"),
    },
    {
      text: "Moji Skiroji",
      icon: <LibraryBooksIcon />,
      onClick: () => navigate("/mojiOglasi"),
    },
    {
      text: "Moji Najemi",
      icon: <InventoryIcon />,
      onClick: () => navigate("/mojNajem"),
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
      onClick: () => {
        logoutUser();
        // navigate("/login");
      },
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
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              //   onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" noWrap component="div">
              Skiro Share
            </Typography>
            <Typography variant="h6" noWrap component="div">
              {pageTitle}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {location.pathname === "/" && <SearchBar />}
              <Avatar sx={{ bgcolor: deepOrange[500], marginLeft: 2 }}>
                {username}
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
            if (index < 4) {
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
            if (index >= 4) {
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
