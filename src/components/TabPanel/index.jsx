import * as React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, Fab } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { ContactContext } from "../../Providers/contact";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{ display: "flex", flexDirection: "column" }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Table() {
  const [value, setValue] = React.useState(0);

  const { getContacts, contacts, setModalCreate, setModalUpdate, deleteContact, setContact } =
    React.useContext(ContactContext);

  function openUpdate(data) {
    setContact(data)
    setModalUpdate(true);
  }

  React.useEffect(() => {
    getContacts();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        height: 324,
        maxWidth: 700,
        backgroundColor: "lightgray",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 5,
        borderRadius: 2,
        position: "relative",
      }}
      variant="contained"
    >
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        sx={{ color: "black" ,borderColor: "divider", backgroundColor: "gray", borderRadius: "10px 10px 0px 0px" }}
      >
        {contacts.map((user, index) => {
          return <Tab key={index} label={user.name} {...a11yProps(index)} />;
        })}
      </Tabs>
      {contacts.map((user, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            <span className="name-table item-table">Name: {user.name}</span>
            <span className="email-table item-table">Email: {user.email}</span>
            <span className="phone-table item-table">
              Telefone: {user.phone}
            </span>
            <span>
              <Fab
                onClick={() => openUpdate(user)}
                color="success"
                sx={{ position: "absolute", right: 140, bottom: 9 }}
                aria-label="edit"
              >
                <Edit />
              </Fab>
              <Fab
                onClick={() => deleteContact(user)}
                color="error"
                sx={{ position: "absolute", right: 75, bottom: 9 }}
                aria-label="edit"
              >
                <Delete />
              </Fab>
            </span>
          </TabPanel>
        );
      })}
      <Fab
        onClick={() => setModalCreate(true)}
        color="primary"
        sx={{ position: "absolute", right: 10, bottom: 9 }}
        aria-label="edit"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
