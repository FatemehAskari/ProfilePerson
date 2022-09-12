import { React, useState } from "react";
import "./style.css";
import Grid from "@mui/material/Grid";
import imgLogin from "../../assets/Image/loginform.jpg";
import googleicon from "../../assets/Image/google-icon.png";
import facebookicon from "../../assets/Image/facebook-icon.png";
import codesend from "../../assets/Image/codesend.png";
import { height } from "@mui/system";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { makeStyles } from "@mui/styles";
import { borders } from "@mui/system";
import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";
import Box from "@mui/material/Box";
import axios from "axios";
import showToast from "../../Service/toastservice";
import ReactLoading from "react-loading";
import { ToastContainer } from "react-toastify";
import OtpInput from "react-otp-input";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton } from "@mui/material";
import MyTimer from "../MyTimer";
import { useHistory } from "react-router-dom";
const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// const usestyle = makeStyles((theme) => ({
//   textField: {
//     borderRadius:"50%"
//   },
// }));

const useStyles = makeStyles({
  root: {
    // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "green"
    // },
    // "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "red"
    // },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
    },
    // "& .MuiOutlinedInput-input": {
    //   color: "green"
    // },
    // "&:hover .MuiOutlinedInput-input": {
    //   color: "red",
    // },
    // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
    //   color: "purple",
    // },
    // "& .MuiInputLabel-outlined": {
    //   color: "green"
    // },
    // "&:hover .MuiInputLabel-outlined": {
    //   color: "red"
    // },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "purple",
    },
  },
});

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const [mobile, setmobile] = useState("");
  const [aftersubmit, setaftersubmit] = useState(false);
  const [loading, setloading] = useState(false);
  const [showcode, setshowcode] = useState(false);
  const [otp, setotpinput] = useState("");
  const [resend, setResend] = useState(false);
  const [aftercodesub, setaftercodesub] = useState(false);
  const [errorcode, seterrorcode] = useState(false);
  const Goback =()=>{
    setshowcode(false);
    setotpinput("");
    setaftercodesub(false);
  }
  console.log(otp);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 5); // 10 minutes timer
  const onExpire = (newState) => {
    setResend(newState);
  };
  let error = [];
  let errorcode1 = [];
  let check = true;
  let check1 = true;
  const regexPhoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{5})$/;
  if (!mobile) {
    error.mobile = "لطفا این قسمت را خالی نگذارید.";
    check = false;
  } else if (regexPhoneNumber.test(mobile) === false) {
    error.mobile = "شماره موبایل نادرست است.";
    check = false;
  }
  if (otp.length < 6 && aftercodesub) {
    errorcode1.otp = "کد ارسال شده 6 رقمی است.";
    check1 = false;
  }
  const handlesubmit = async (event) => {
    event.preventDefault();
    setaftersubmit(true);
    const user = {
      mobile: mobile,
    };
    console.log(JSON.stringify(user));
    if (check) {
      setloading(true);
      try {
        const response = await axios.post(
          `http://45.149.77.141:8008/management-api/v1/authorization/code-send`,
          JSON.stringify(user),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data.error_code === 0) {
          setshowcode(true);
          setloading(false);
        }
      } catch (ex) {
        if (ex.response.data.error_code === 129) {
          showToast(
            "error",
            "شما درخواست پیامک داده اید لطفا بعدا درخواست کنید"
          );
          setloading(false);
        } else {
          showToast("error", "مشکلی پیش آمده است.");
          setloading(false);
        }
        console.log(ex);
      }
    }
  };




  const handlesubmitcodeforchange = async (event) => {
    setaftersubmit(true);
    const user = {
      mobile: mobile,
    };
    console.log(JSON.stringify(user));
    if (check) {
      setloading(true);
      try {
        const response = await axios.post(
          `http://45.149.77.141:8008/management-api/v1/authorization/code-send`,
          JSON.stringify(user),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data.error_code === 0) {
          setshowcode(true);
          setloading(false);
        }
      } catch (ex) {
        if (ex.response.data.error_code === 129) {
          showToast(
            "error",
            "شما درخواست پیامک داده اید لطفا بعدا درخواست کنید"
          );
          setloading(false);
        } else {
          showToast("error", "مشکلی پیش آمده است.");
          setloading(false);
        }
        console.log(ex);
      }
    }
  };

  const handlesubmitcode = async (event) => {
    event.preventDefault();
    setaftercodesub(true);
    const user = {
      mobile: mobile,
      code: otp,
    };
    console.log(JSON.stringify(user));
    if (otp.length === 6) {
      setloading(true);
      try {
        const response = await axios.post(
          `http://45.149.77.141:8008/management-api/v1/authorization/sign-in`,
          JSON.stringify(user),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data.error_code === 0) {
          setshowcode(true);
          setloading(false);
          setTimeout(() => {
            localStorage.setItem("access_token", response.data.result.access_token);
            localStorage.setItem("refresh_token", response.data.result.refresh_token);
            history.replace("/profile");
          }, 1000);
        }
      } catch (ex) {
        if (ex.response.data.error_code === 127) {
          showToast("error", "کد وارد شده نادرست است");
          setloading(false);
        } else if (ex.response.data.error_code === 128) {
          showToast("error", "کد دریافتی یافت نشد");
          setloading(false);
        } else {
          showToast("error", "مشکلی پیش آمده است.");
          setloading(false);
        }
        console.log(ex);
      }
    }
  };

  return (
    <div className="background-image-Login" style={{ direction: "rtl" }}>
      {!showcode && (
        <Box
          className="form-Login"
          onSubmit={handlesubmit}
          component="form"
          noValidate
        >
          <CacheProvider value={cacheRtl}>
            <Grid container>
              <Grid item xs={12} md={6.5}>
                <div className="box-Login">
                  <div
                    style={{
                      marginRight: "30px",
                      marginTop: "30px",
                      marginLeft: "30px",
                    }}
                  >
                    <h2>ورود</h2>
                    <div style={{ color: "#8d8d8d" }}>
                      <div style={{ marginTop: "10px", fontSize: "13.7px" }}>
                        سلام!
                      </div>
                      <div style={{ marginTop: "3px", fontSize: "13.7px" }}>
                        لطفا شماره موبایل خود را وارد کنید
                      </div>
                      <Box>
                        <TextField
                          // className={classes.root}
                          style={{ fontFamily: "BYekan", marginTop: "20px" }}
                          InputLabelProps={{
                            style: { fontSize: 15, fontFamily: "BYekan" },
                          }}
                          required
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
                          label="شماره موبایل"
                          name="name"
                          autoComplete="name"
                          autoFocus
                          value={mobile}
                          onChange={(event) => setmobile(event.target.value)}
                          error={aftersubmit ? Boolean(error.mobile) : false}
                          helperText={aftersubmit ? error.mobile : null}
                        />
                        <Button
                          style={{
                            marginTop: "19px",
                            fontFamily: "BYekan",
                            fontSize: "15px",
                            backgroundColor: "#9a009a",
                          }}
                          sx={{
                            borderRadius: 3,
                          }}
                          size="small"
                          fullWidth
                          variant="contained"
                          type="submit"
                        >
                          {!loading && <span>ورود</span>}
                          {loading && (
                            <ReactLoading
                              type="bubbles"
                              color="#fff"
                              className="loading-login"
                            />
                          )}
                        </Button>
                      </Box>
                      <Divider
                        style={{ marginTop: "17px", fontSize: "13.5px" }}
                      >
                        لاگین با استفاده از{" "}
                      </Divider>
                      <Grid style={{ display: "flex", marginTop: "20px" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            borderRadius: 3,
                          }}
                          fullWidth
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <h4>فیس بوک</h4>
                            <img
                              src={facebookicon}
                              style={{
                                width: 25,
                                height: 25,
                                marginRight: "5px",
                              }}
                            />
                          </div>
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          style={{
                            marginRight: "10px",
                            borderColor: "red",
                            color: "red",
                          }}
                          sx={{
                            borderRadius: 3,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <h4>گوگل</h4>
                            <img
                              src={googleicon}
                              style={{
                                width: 20,
                                height: 20,
                                marginRight: "5px",
                              }}
                            />
                          </div>
                        </Button>
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={0} md={5.5}>
                <div className="login_img">
                  <img
                    src={imgLogin}
                    style={{
                      height: "330px",
                      width: "100%",
                      marginLeft: "5px",
                      marginTop: "5px",
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </CacheProvider>
        </Box>
      )}
      {showcode && (
        <Box
          className="form-codesend"
          onSubmit={handlesubmitcode}
          component="form"
          noValidate
        >
          <Grid container>
            <Grid item xs={0} md={5.5}>
              <div className="login_img">
                <img
                  src={codesend}
                  style={{
                    height: "330px",
                    width: "100%",
                    marginLeft: "5px",
                    marginTop: "5px",
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6.5}>
              <div
                style={{
                  marginRight: "30px",
                  marginTop: "30px",
                  marginLeft: "30px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <IconButton onClick={Goback}>
                    <ArrowForwardIcon />
                  </IconButton>
                  <h2>کد تایید وارد کنید</h2>
                </div>
                <div
                  style={{
                    marginTop: "18px",
                    fontSize: "15px",
                    color: "#8d8d8d",
                    marginRight: "10px",
                    textAlign: "center",
                  }}
                >
                  کد تایید برای شماره <span>{mobile}</span> پیامک شد
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "25px",
                    direction: "ltr",
                    marginLeft: "10px",
                  }}
                >
                  <OtpInput
                    value={otp}
                    onChange={(otp) => setotpinput(otp)}
                    numInputs={6}
                    separator={<span> </span>}
                    inputStyle={{
                      width: "32px",
                      marginRight: "10px",
                      borderRadius: "4px",
                      height: "35px",
                      border: "1.7px solid #ccc",
                    }}
                    isInputNum={true}
                    hasErrored={aftercodesub ? Boolean(errorcode1.otp) : false}
                    errorStyle={{
                      border: "1.9px solid #D32F2F",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "12.5px",
                    color: "#D32F2F",
                    marginTop: "7px",
                    // display: Boolean(errorcode1.otp)? "block" : "none",
                    //  textAlign:"center"
                  }}
                  className="login-error"
                >
                  {errorcode1.otp}
                </div>
                <MyTimer counttime={300}  sendcode={handlesubmitcodeforchange}/>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    style={{
                      marginTop: "19px",
                      fontFamily: "BYekan",
                      fontSize: "15px",
                      backgroundColor: "#9a009a",
                      justifyContent: "center",
                      width: "255px",
                    }}
                    sx={{
                      borderRadius: 3,
                    }}
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
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      )}
      <ToastContainer rtl={true} />
    </div>
  );
};

export default Login;
