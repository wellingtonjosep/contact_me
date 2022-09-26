import "./styles.css";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { UserContext } from "../../Providers/user";
import {
  Avatar,
  Fade,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModalUser from "../ModalUser";
import Profile from "../Profile";

export default function Header() {

  const navigate = useNavigate()

  const { user, setModalUser, modalUser, ProfileUser, setProfileUser } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExit = () => {
    localStorage.clear()
    navigate("/")
  }

  const handleModalUser = () => {
    setModalUser(true)
    handleClose()
  }

  const handleProfileUser = () => {
    handleClose()
    setProfileUser(true)
  }


  return (
    <header className="header">
      <img className="logo-header" src={logo} alt="" />
      <h1 className="name-user">{user.name}</h1>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2, height: 45, marginTop: "21px", marginLeft: "auto", marginRight: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ color: "black" ,width: 42, height: 42 }}>{}</Avatar>
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleModalUser()}>Atualizar Perfil</MenuItem>
        <MenuItem onClick={() => handleProfileUser()}>Minha conta</MenuItem>
        <MenuItem onClick={() => handleExit()}>Sair</MenuItem>
      </Menu>
      {
        modalUser === true && <ModalUser/>
      }
      {
        ProfileUser === true && <Profile/>
      }
    </header>
  );
}
