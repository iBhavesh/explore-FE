import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {
  Badge,
  Drawer,
  Hidden,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openAddPostModal } from "../../features/uiSlice/uiSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: "block",
      fontFamily: "Eagle Lake",
      color: "white",
      fontWeight: 700,
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    titleDrawer: {
      // display: "block",
      fontFamily: "Eagle Lake",
      [theme.breakpoints.up("sm")]: {
        // display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      //   maxWidth: "50%",
      width: "auto",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 1),
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2.5)}px)`,
      transition: theme.transitions.create("width"),
      width: "0ch",
      "&:focus": {
        width: "15ch",
      },
      [theme.breakpoints.up("sm")]: {
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: "20ch",
        "&:focus": {
          width: "25ch",
        },
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
      background: "linear-gradient(#ffffff,#ededed) no-repeat center fixed",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    titleDiv: {
      // paddingLeft: theme.spacing(2),
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    appBar: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user_id = useAppSelector((state) => state.auth.accessToken!.user_id);
  const follow_requests = useAppSelector(
    (state) => state.follower.follow_requests
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleNotificationsClick = () => {
    if (!matches) handleDrawerToggle();
    history.push("/notifications");
  };
  const handleProfileClick = () => {
    if (!matches) handleDrawerToggle();
    history.push("/user/" + user_id);
  };
  const handleAccountClick = () => {
    if (!matches) handleDrawerToggle();
    history.push("/account");
  };
  const handleRequestsClick = () => {
    if (!matches) handleDrawerToggle();
    history.push("/requests");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddPostClick = () => {
    if (!matches) handleDrawerToggle();
    dispatch(openAddPostModal());
  };

  const drawer = (
    <div>
      <div style={{ display: "flex" }} className={classes.toolbar}>
        <div className={classes.titleDiv}>
          <Link
            component={RouterLink}
            to="/"
            onClick={() => {
              if (!matches) handleDrawerToggle();
            }}
            className={classes.titleDrawer}
            variant="h4"
            // underline="none"
            noWrap
          >
            Explore
          </Link>
        </div>
      </div>
      <List>
        <Divider />
        <ListItem onClick={handleAddPostClick} button key="AddPost">
          <ListItemIcon>
            <AddAPhotoOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Add Post" />
        </ListItem>
        <Divider />
        <ListItem onClick={handleRequestsClick} button key="Requests">
          <ListItemIcon>
            <Badge
              variant="standard"
              badgeContent={follow_requests?.length ?? null}
            >
              <PersonAddIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Requests" />
        </ListItem>
        <Divider />
        <ListItem onClick={handleProfileClick} button key="Profile">
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <Divider />
        <ListItem onClick={handleNotificationsClick} button key="Notifications">
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <Divider />
        <ListItem onClick={handleAccountClick} button key="Account">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Badge badgeContent={follow_requests?.length ?? null}>
              <MenuIcon />
            </Badge>
          </IconButton>
          <Link
            component={RouterLink}
            to="/"
            className={classes.title}
            variant="h6"
            underline="none"
            noWrap
          >
            Explore
          </Link>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}
