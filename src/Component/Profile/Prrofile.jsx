import { React, useState } from "react";
import Grid from "@mui/material/Grid";
import "./Style.css";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import defaultimage from "../../assets/Image/defaultimage.jpg";
import { useHistory, useLocation } from "react-router-dom";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GavelIcon from "@mui/icons-material/Gavel";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyIcon from "@mui/icons-material/Key";
import EditProfile from "../EditPersonInfo/EditProfile";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useWindowDimensions from "./width";
import { AppBar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Changepass from "../Changepassword/Changepass";

const useStyles = makeStyles({
  root: {
    "&$focusVisible": {
      backgroundColor: "red",
    },
    "&$selected, &$selected:hover": {
      backgroundColor: "red",
    },
    "&$disabled": {
      opacity: 0.5,
    },
  },
});

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(750));
  const [open, setopen] = useState(false);
  const[condition,setcondition]=useState(1);
  let page="";
  if(condition===1){
    page=(<EditProfile/>)
  }

  else if(condition===2){
    page=(<Changepass/>)
  }
  
  let sizedash = 2.2;
  const { height, width } = useWindowDimensions();
  if (width < 1100) {
    sizedash = 3;
  }
  if (width < 900) {
    sizedash = 3.2;
  }

  if (width < 750) {
    sizedash = 5;
  }

  if (width < 600) {
    sizedash = 6;
  }

  if (width < 500) {
    sizedash = 7;
  }
  const items = [
    {
      text: "تغییر رمز",
      icon: <KeyIcon />,
      id:2
    },
    {
      text: "اطلاعات شرکت",
      icon: <ApartmentIcon />,
      id:3
    },

    {
      text: "اطلاعات حقوقی",
      icon: <GavelIcon />,
      id:4
    },

    {
      text: "تغییر اطلاعات افراد",
      icon: <ManageAccountsIcon />,
      id:5
    },
  ];

  const handlepageopen=(id)=>{
    setcondition(id);
    setopen(false);
  }

  let temp = (
    <div
      className="profile_dashboard"
      style={{ width: `calc(100vw/(12/${sizedash}))`, direction: "rtl" }}
    >
      <div
        style={{
          width: "100%",
          position: "absolute",
        }}
      >
        <center style={{}}>
          <div
            style={{
              color: "white",
              fontSize: "20px",
              marginTop: "20px",
              fontWeight: 600,
            }}
          >
            کانیپتو
          </div>
          <Divider
            sx={{
              background: "rgba(255, 255, 255, 0.4);",
              mr: 2,
              ml: 2,
              marginTop: "20px",
            }}
          />

          <Avatar
            alt="Remy Sharp"
            src={defaultimage}
            sx={{ width: 73, height: 73, marginTop: "20px" }}
          />

          {/* <div
            style={{
              marginTop: "10px",
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            فاطمه عسکری
          </div> */}

          <Link
            sx={{
              marginTop: "21px",
              fontSize: "14px",
              color: "yellow",
              fontWeight: 600,
              textDecoration: "none",
            }}
            component="button"
            variant="body2"
            onClick={() => {
              handlepageopen(1);
            }}
          >
            ویرایش حساب کاربری
          </Link>

          <Divider
            sx={{
              background: "rgba(255, 255, 255, 0.4);",
              mr: 2,
              ml: 2,
              marginTop: "20px",
            }}
          />
        </center>

        <List>
          {items.map((item, index) => (
            <div
              style={{
                padding: "0px 10px",
                color: "white",
                fontWeight: 500,
              }}
              key={index}
              className={classes.root}
            >
              <ListItem button key={item.text} onClick={()=>handlepageopen(item.id)}>
                <ListItemIcon style={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <p style={{ fontSize: "13px" }}>{item.text}</p>
              </ListItem>
            </div>
          ))}
        </List>
      </div>
    </div>
  );

  return (
    <div style={{ direction: "rtl" }}>
      <Grid container>
        {!matches && (
          <Grid item xs={sizedash}>
            {temp}
          </Grid>
        )}
        {matches && (
          <Grid item xs={0}>
          </Grid>
        )}

        <Grid item  xs={matches  ? 12 : 12-sizedash}>
          {!matches && (
            <div
              style={{
                position: "fixed",
                width: "100%",
                height: "49px",
                backgroundColor: "#3e0a6c",
                marginRight: "0.5px",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Grid container>
                  <Grid item xs={6.5} sm={7.2} md={7.9} lg={8.9}>
                    <Button
                      onClick={() => history.push("/")}
                      sx={{ color: "white" }}
                    >
                      <HomeIcon
                        sx={{ color: "rgba(123, 234, 242, 0.857)", mr: 1.5 }}
                      />
                      <Typography
                        variant="body"
                        noWrap
                        component="div"
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          fontWeight: 500,
                          mr: 0.5,
                        }}
                      >
                        خانه
                      </Typography>
                    </Button>
                  </Grid>

                  <Box display="flex" sx={{ direction: "rtl" }}>
                    <Button
                      variant="text"
                      href="/"
                      onClick={() => {
                        localStorage.removeItem("access_token");
                      }}
                      style={{ flexGrow: 0.5 }}
                    >
                      <LogoutIcon
                        sx={{ color: "rgba(123, 234, 242, 0.857)", ml: 1.5 }}
                      />
                      <Typography
                        variant="body"
                        noWrap
                        component="div"
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          fontWeight: 500,
                        }}
                      >
                        خروج
                      </Typography>
                    </Button>
                  </Box>
                </Grid>
              </div>
            </div>
          )}
          {matches && (
            <AppBar
              style={{
                width: "100%",
                height: "49px",
                backgroundColor: "#3e0a6c",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Grid container>
                  <Grid item xs={8.7} sm={10}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <Drawer
                        anchor="right"
                        open={open}
                        onClose={() => setopen(false)}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          {temp}
                        </div>
                      </Drawer>
                      <IconButton>
                        <MenuIcon
                          onClick={() => setopen(!open)}
                          style={{ color: "white", marginRight: "2vw" }}
                        />
                      </IconButton>
                      <Button
                        onClick={() => history.push("/")}
                        sx={{ color: "white" }}
                      >
                        <HomeIcon
                          sx={{ color: "rgba(123, 234, 242, 0.857)", mr: 1.5 }}
                        />
                        <Typography
                          variant="body"
                          noWrap
                          component="div"
                          sx={{
                            color: "white",
                            fontSize: "16px",
                            fontWeight: 500,
                            mr: 0.5,
                          }}
                        >
                          خانه
                        </Typography>
                      </Button>
                    </div>
                  </Grid>

                  <Box display="flex" sx={{ direction: "rtl" }}>
                    <Button
                      variant="text"
                      href="/"
                      onClick={() => {
                        localStorage.removeItem("access_token");
                      }}
                      style={{ flexGrow: 0.5 }}
                    >
                      <LogoutIcon
                        sx={{ color: "rgba(123, 234, 242, 0.857)", ml: 1.5 }}
                      />
                      <Typography
                        variant="body"
                        noWrap
                        component="div"
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          fontWeight: 500,
                        }}
                      >
                        خروج
                      </Typography>
                    </Button>
                  </Box>
                </Grid>
              </div>
            </AppBar>
          )}
          <div style={{ position: "rtl" }}>
            <center style={{ }}>
              {page}
            </center>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
