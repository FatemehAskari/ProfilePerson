import dayjs from "dayjs";

export function getremaintime(time) {
  return {
    seconds: getremainseconds(time),
    minutes: getremainminutes(time),
  };
}

function getremainminutes(time) {
  const minutes = Math.floor(time / 60);
  return padwithzero(minutes);
}

function getremainseconds(time) {
  const seconds = time % 60;
  return padwithzero(seconds);
}

function padwithzero(number) {
  const numstring = number.toString();
  //console.log(numstring.lenght+"**8");
  if (numstring.length === 2) {
    return numstring;
  } else {
    return "0".repeat(1) + numstring;
  }
}
