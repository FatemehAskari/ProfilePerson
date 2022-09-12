import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import defaultimage from "../../assets/Image/defaultimage.jpg";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import "./Style.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import showToast from "../../Service/toastservice";
import ReactLoading from "react-loading";
import { ToastContainer } from "react-toastify";
import changepass from "../../assets/Image/changepass.png";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const Changepass = () => {
  const [ispasswordset, setispassword] = useState(false);
  const [loadinginfo, setloadinginfo] = useState(false);
  const [loading, setloading] = useState(false);
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpasswrd] = useState("");
  const [repeatnewpassword, setrepeatnewpassword] = useState("");

  useEffect(() => {
    setloadinginfo(true);
    axios
      .get(`http://45.149.77.141:8008/management-api/v1/user/profile`, {
        headers: {
          "Content-Type": "application/json ",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setispassword(res.data.result.is_password_set);
        setloadinginfo(false);
      });
  }, []);

  const handlesubmit = async (event) => {
    event.preventDefault();
    let user = "";
    if (ispasswordset) {
      user = {
        new_password: oldpassword,
      };
    } else {
      user = {
        old_password: oldpassword,
        new_password: newpassword,
      };
    }
    setloading(true);
    try {
      const response = await axios.post(
        `http://45.149.77.141:8008/management-api/v1/user/profile/edit`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response);
      setloading(false);
    } catch {}
  };

  return (
    <div
      style={{
        direction: "rtl",
        alignItems: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {loadinginfo && (
        <div>
          <div style={{}}>
            <Loader />
          </div>
        </div>
      )}
      {!loadinginfo && (
        <>
          <Typography
            style={{ color: "#9a009a", fontWeight: 600, fontSize: "19px" }}
          >
            تغییر رمز عبور
          </Typography>

          <Avatar
            alt="changepassword"
            sx={{
              mt: 2.3,
              width: "40vmin",
              height: "30vmin",
            }}
            src={changepass}
          />

          <Box onSubmit={handlesubmit} component="form" noValidate>
            <div className="editprofile1">
              <CacheProvider value={cacheRtl}>
                <TextField
                  required
                  style={{ fontFamily: "BYekan" }}
                  InputLabelProps={{
                    style: { fontSize: 15, fontFamily: "BYekan" },
                  }}
                  sx={{
                    [`& fieldset`]: {
                      borderRadius: 3,
                    },
                    [`&.Mui-focused fieldset`]: {
                      borderColor: "yellow",
                    },
                  }}
                  size="small"
                  dir="rtl !important"
                  fullWidth
                  id="name"
                  label="رمز عبور فعلی"
                  autoFocus
                  value={oldpassword}
                  onChange={(event) => setoldpassword(event.target.value)}
                  //   error={aftersubmit ? Boolean(error.nationalcode) : false}
                  //   helperText={aftersubmit ? error.nationalcode : null}
                />
                  <div style={{ display: "flex", marginTop: "17px" }}>
                    <TextField
                      required
                      disabled={!ispasswordset}
                      style={{ fontFamily: "BYekan" }}
                      InputLabelProps={{
                        style: { fontSize: 15, fontFamily: "BYekan" },
                      }}
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: 3,
                        },
                        [`&.Mui-focused fieldset`]: {
                          borderColor: "yellow",
                        },
                      }}
                      size="small"
                      dir="rtl !important"
                      fullWidth
                      id="name"
                      label="رمز عبور جدید"
                      value={newpassword}
                      onChange={(event) => setnewpasswrd(event.target.value)}
                      // error={aftersubmit ? Boolean(error.name) : false}
                      // helperText={aftersubmit ? error.name : null}
                    />

                    <TextField
                      required
                      disabled={!ispasswordset}
                      style={{ fontFamily: "BYekan", marginRight: "15px" }}
                      InputLabelProps={{
                        style: { fontSize: 15, fontFamily: "BYekan" },
                      }}
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: 3,
                        },
                        [`&.Mui-focused fieldset`]: {
                          borderColor: "yellow",
                        },
                      }}
                      size="small"
                      dir="rtl !important"
                      fullWidth
                      id="name"
                      label=" تکرار رمز عبور جدید"
                      value={repeatnewpassword}
                      onChange={(event) =>
                        setrepeatnewpassword(event.target.value)
                      }
                      // error={aftersubmit ? Boolean(error.family) : false}
                      // helperText={aftersubmit ? error.family : null}
                    />
                  </div>
                <Button
                  style={{
                    marginTop: "19px",
                    fontFamily: "BYekan",
                    fontSize: "15px",
                    backgroundColor: "#9a009a",
                    justifyContent: "center",
                  }}
                  sx={{
                    borderRadius: 3,
                  }}
                  fullWidth
                  size="small"
                  variant="contained"
                  type="submit"
                >
                  {!loading && <span>تایید</span>}
                  {loading && (
                    <ReactLoading
                      type="bubbles"
                      color="#fff"
                      className="loading-login"
                    />
                  )}
                </Button>
              </CacheProvider>
            </div>
          </Box>
        </>
      )}
    </div>
  );
};

export default Changepass;
