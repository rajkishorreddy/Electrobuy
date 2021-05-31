import { useEffect } from "react";
import { useSnackbar } from "react-simple-snackbar";
import history from "../../history";
const GetToken = (props) => {
  const options = {
    position: "top-left",
    style: {
      // backgroundColor: '#930696',
      background: "linear-gradient(180deg, #5e3173 0.31%, #000000 102.17%)",
      color: "white",
      fontFamily: "Montserrat, sans-serif",
      fontSize: "16px",
      textAlign: "center",
    },
    closeStyle: {
      color: "black",
      fontSize: "10px",
    },
  };
  const [openSnackbar] = useSnackbar(options);
  useEffect(() => {
    if (props.match.params.token === "error") {
      openSnackbar(
        "This Goole account has been previously authenticated already.Please use another google account!"
      );
      history.push("/");
    } else {
      window.localStorage.setItem("token", props.match.params.token);
      openSnackbar("Login successfull!");
      history.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{props.match.params.token}</div>;
};

export default GetToken;
