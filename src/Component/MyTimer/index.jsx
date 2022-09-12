// import React from 'react';
// //import {convertNumberToPersian} from '../../utils/helpers';
// export default function MyTimer({ expire, resend, seconds }) {
//   const [timer, setTimer] = React.useState(seconds);
//   const id = React.useRef(null);
//   const clear = () => {
//     window.clearInterval(id.current);
//   };
//   React.useEffect(() => {
//     if (resend === false) {
//       setTimer(seconds);
//       id.current = window.setInterval(() => {
//         setTimer(time => time - 1);
//       }, 1000);
//       return () => clear();
//     }
//   }, [resend]);

//   React.useEffect(() => {
//     if (timer === 0) {
//       expire(true);
//       clear();
//     }
//   }, [timer]);

//   return <span style={{ fontSize: '40px' }}>{timer}</span>;
// }
import "./style.css";
import { React, useState, useEffect } from "react";
import { getremaintime } from "./Utils/Countdowntime";

const defaulttime = {
  seconds: "00",
  minutes: "03",
};
const Counttimer = ({ counttime, sendcode }) => {
  const [remainingtime, setremainingtime] = useState(defaulttime);
  const [showmessage, setshowmessage] = useState(false);
  useEffect(() => {
    const intervalid = setInterval(() => {
      if (counttime > 0) {
        counttime--;
        updateRemaningtime(counttime);
      } else {
        setshowmessage(true);
      }
    }, 1000);
    return () => clearTimeout(intervalid);
  }, [counttime]);

  function updateRemaningtime(counttime) {
    setremainingtime(getremaintime(counttime));
  }

  const sendcodechange = () => {
    setremainingtime(defaulttime);
    setshowmessage(false);
  };
  return (
    <div className="mytimer-timer">
      {!showmessage && (
        <>
          <span> {remainingtime.seconds}</span>
          <span> : </span>
          <span>{remainingtime.minutes}</span>
          <span>مانده تا دریافت کد مجدد</span>
        </>
      )}
      {showmessage && (
        <>
          <div>
            <span>دریافت مجدد کد از طریق</span>

            <button
              style={{
                color: "#53CFDE",
                fontSize: "14px",
                border: "none",
                backgroundColor: "white",
                marginRight: "3px",
                cursor: "pointer",
              }}
              onClick={() => {
                sendcodechange();
                sendcode();
              }}
            >
              پیامک
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Counttimer;
