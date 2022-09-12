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
import imageToBase64 from 'image-to-base64/browser'

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const EditProfile = ({ load }) => {
  const [name, setname] = useState("");
  const [family, setfamily] = useState("");
  const [nationalcode, setnationalcode] = useState("");
  const [bankaccount, setbankaccount] = useState("");
  const [fileimage, setfileimage] = useState(defaultimage);
  const [loadinginfo, setloadinginfo] = useState(false);
  const [aftersubmit, setaftersubmit] = useState(false);
  const [loading, setloading] = useState(false);
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
        setname(res.data.result.first_name);
        setfamily(res.data.result.last_name);
        setnationalcode(res.data.result.national_code);
        setbankaccount(res.data.result.bank_account);
        setfileimage("http://45.149.77.141:8008" + res.data.result.avatar);
        console.log("http://45.149.77.141:8008" + res.data.result.avatar);
        imageToBase64(fileimage) // Path to the image
        .then((response) => {
          setbase64code(response); // "cGF0aC90by9maWxlLmpwZw=="
        })
        .catch((error) => {
          console.log(error); // Logs an error if there was one
        });
        setloadinginfo(false);
      });
  }, [load]);
  let error = [];
  let check = true;
  if (!name) {
    error.name = "لطفا نامتون وارد کنید";
    check = false;
  }
  if (!family) {
    error.family = "لطفا فامیلیتون وارد کنید.";
    check = false;
  }
  var reg = new RegExp("^[0-9]*$");
  if (!nationalcode) {
    error.nationalcode = "لطفا شماره ملیتون وارد کنید.";
    check = false;
  } else if (reg.test(nationalcode) === false) {
    error.nationalcode = "شماره ملی فقط باید از اعداد تشکیل شده باشد.";
    check = false;
  }
  if (!bankaccount) {
    error.bankaccount = "شماره حساب بانکتون وارد کنید.";
    check = false;
  } else if (bankaccount.length < 10) {
    error.bankaccount = "شماره حساب بانک وارد شده نادرست است.";
    check = false;
  }
  const [base64code, setbase64code] = useState("");
  const handleChange = (event) => {
    setfileimage(URL.createObjectURL(event.target.files[0]));
    console.log(URL.createObjectURL(event.target.files[0]));
    getBase64(event.target.files[0]);
    console.log("iyhu");
  };

  const onLoad = (fileString) => {
    console.log(fileString);
    setbase64code(fileString);
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };
  console.log(base64code);
  const handlesubmit = async (event) => {
    event.preventDefault();
    setaftersubmit(true);
    console.log("****");

    const user = {
      first_name: name,
      last_name: family,
      national_code: nationalcode,
      bank_account: bankaccount,
      avatar: base64code,
    };
    console.log(JSON.stringify(user));
    console.log("**");
    if (check) {
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
        if (response.data.error_code === 0) {
          showToast("success", "اطلاعات با موفقیت تغییر کرد");
          setloading(false);
        }
      } catch (ex) {
        showToast("error", "مشکلی پیش آمده است.");
        setloading(false);
      }
    }
  };
  return (
    <div
      style={{
        direction: "rtl",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
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
        <div>
          <Typography
            style={{
              color: "#9a009a",
              fontWeight: 600,
              fontSize: "19px",
              marginTop: "10px",
            }}
          >
            ویرایش حساب کاربری
          </Typography>

          <Avatar
            alt="profile"
            sx={{
              mt: 2,
              width: "18vmin",
              height: "18vmin",
              borderRadius: "50%",
            }}
            src={fileimage}
          />

          <Button
            variant="contained"
            component="label"
            style={{ backgroundColor: "#9a009a" }}
            sx={{
              color: "white",
              width: "100px",
              mt: 2,
              borderRadius: 3,
            }}
          >
            <p style={{ fontSize: "0.8rem" }}>انتخاب عکس</p>
            <input
              type="file"
              onChange={handleChange}
              hidden
              accept=".jpg,.jpeg,.png"
            />
          </Button>

          <Box onSubmit={handlesubmit} component="form" noValidate>
            <div className="editprofile">
              <CacheProvider value={cacheRtl}>
                <div style={{ display: "flex" }}>
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
                    label="نام"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(event) => setname(event.target.value)}
                    error={aftersubmit ? Boolean(error.name) : false}
                    helperText={aftersubmit ? error.name : null}
                  />

                  <TextField
                    required
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
                    label="نام خانوادگی"
                    name="familyname"
                    value={family}
                    onChange={(event) => setfamily(event.target.value)}
                    error={aftersubmit ? Boolean(error.family) : false}
                    helperText={aftersubmit ? error.family : null}
                  />
                </div>

                <TextField
                  required
                  style={{ fontFamily: "BYekan", marginTop: "17px" }}
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
                  label="کد ملی"
                  name="nationalcode"
                  value={nationalcode}
                  onChange={(event) => setnationalcode(event.target.value)}
                  error={aftersubmit ? Boolean(error.nationalcode) : false}
                  helperText={aftersubmit ? error.nationalcode : null}
                />

                <TextField
                  required
                  style={{ fontFamily: "BYekan", marginTop: "17px" }}
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
                  label="شماره حساب بانکی"
                  name="bank-account"
                  value={bankaccount}
                  onChange={(event) => setbankaccount(event.target.value)}
                  error={aftersubmit ? Boolean(error.bank_account) : false}
                  helperText={aftersubmit ? error.bank_account : null}
                />

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
        </div>
      )}
      <ToastContainer rtl={true} />
    </div>
  );
};
export default EditProfile;
