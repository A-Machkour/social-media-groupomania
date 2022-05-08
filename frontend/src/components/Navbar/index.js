import React, { useEffect, useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import navLogo from "../iconResize.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import axios from "axios";
import CreatePost from "./createPost";

const pages = [{ title: "Accueil", route: "/" }];

let theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff2a00",
      contrastText: "#fff",
    },
  },
});

const Input = styled("input")({
  display: "none",
});

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Navbar = props => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [dataUser, setDataUser] = useState({});
  const [file, setFile] = useState();
  const [openNewPost, setOpenNewPost] = React.useState(false);
  const userData = useSelector(state => state.userReducer);
  const uid = useContext(UidContext);

  const handleClickOpenNewPost = () => {
    setOpenNewPost(true);
  };

  const handleCloseNewPost = () => {
    setOpenNewPost(false);
  };

  const handleSubmitPost = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      content: data.get("content"),
      post_image: file,
    });
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/posts/${uid}`,
      withCredentials: true,
      data: {
        content: data.get("content"),
        post_image: file,
      },
    }).then(res => {
      handleCloseNewPost();
    });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
      withCredentials: true,
    }).then(res => {
      setDataUser(res.data[0]);
    });
  }, []);

  function setCookie(
    key,
    value,
    expireDays,
    expireHours,
    expireMinutes,
    expireSeconds
  ) {
    var expireDate = new Date();
    if (expireDays) {
      expireDate.setDate(expireDate.getDate() + expireDays);
    }
    if (expireHours) {
      expireDate.setHours(expireDate.getHours() + expireHours);
    }
    if (expireMinutes) {
      expireDate.setMinutes(expireDate.getMinutes() + expireMinutes);
    }
    if (expireSeconds) {
      expireDate.setSeconds(expireDate.getSeconds() + expireSeconds);
    }
    document.cookie =
      key +
      "=" +
      escape(value) +
      ";domain=" +
      window.location.hostname +
      ";path=/" +
      ";expires=" +
      expireDate.toUTCString();
  }

  function deleteCookie(name) {
    setCookie(name, "", null, null, null, 1);
  }

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = e => {
    e.preventDefault();
    console.log(userData[0].id, "id");
    // dispatch(deleteUser(userData[0].id));
    deleteCookie("jwt");
    window.location.href = "/";
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 5, display: { xs: "none", md: "flex" } }}
            >
              <img src={navLogo} className="Navbar-logo" alt="logo" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map(page => (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Link to={page.route}>{page.title}</Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <img src={navLogo} className="Navbar-logo" alt="logo" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(page => (
                <Button
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href={page.route}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            {/* <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              sx={{ mr: 5, display: { xs: "none", md: "flex" } }}
              onClick={handleClickOpenNewPost}
            >
              Créer un post
            </Button>

            <IconButton
              color="secondary"
              aria-label="add post"
              component="span"
              sx={{ mr: 4, display: { xs: "flex", md: "none" } }}
              onClick={handleClickOpenNewPost}
            >
              <AddIcon />
            </IconButton> */}

            <CreatePost />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Paramètres">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={dataUser.username} src={dataUser.images} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="Profil" onClick={handleCloseUserMenu}>
                  <Link to="/profile">Profil</Link>
                </MenuItem>
                <MenuItem key="Deconnexion" onClick={handleLogout}>
                  <Link to="">Déconnexion</Link>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      {/* <Dialog open={openNewPost} onClose={handleCloseNewPost}>
        <DialogTitle>Créer un post</DialogTitle>
        <Box component="form" onSubmit={handleSubmitPost} noValidate>
          <DialogContent>
            <label htmlFor="post_image">
              <Input
                accept="image/*"
                id="post_image"
                multiple
                type="file"
                name="post_image"
                onChange={e => setFile(e.target.files[0])}
              />
              <Button variant="contained" component="span" color="secondary">
                Upload
              </Button>
            </label>
            <TextField
              autoFocus
              margin="dense"
              id="content"
              name="content"
              label="Contenu"
              type="text"
              fullWidth
              variant="standard"
              color="secondary"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewPost} color="secondary">
              Annuler
            </Button>
            <Button type="submit" color="secondary">
              Créer
            </Button>
          </DialogActions>
        </Box>
      </Dialog> */}
    </ThemeProvider>
  );
};
// export default Navbar;
// import React, { useContext } from "react";
// // import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { UidContext } from "../AppContext";
// // import Logout from "../Log/logout";

// const Navbar = () => {
//   const uid = useContext(UidContext);
//   // const userData = useSelector(state => state.userReducer);

//   return (
//     <nav>
//       <div className="nav-container">
//         <div className="logo">
//           <NavLink exact to="/">
//             <div className="logo">
//               <img src={navLogo} alt="icon" />
//               <h3>Raccoont</h3>
//             </div>
//           </NavLink>
//         </div>
//         {uid ? (
//           <ul>
//             <li></li>
//             <li className="welcome">
//               <NavLink exact to="/profil">
//                 <h5>Bienvenue </h5>
//                 {/* <h5>Bienvenue {userData.pseudo}</h5> */}
//               </NavLink>
//             </li>
//             {/* <Logout /> */}
//           </ul>
//         ) : (
//           <ul>
//             <li></li>
//             <li>
//               <NavLink exact to="/profil">
//                 <img src="./img/icons/login.svg" alt="login" />
//               </NavLink>
//             </li>
//           </ul>
//         )}
//       </div>
//     </nav>
//   );
// };

export default Navbar;
