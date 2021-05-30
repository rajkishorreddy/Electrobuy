import { useEffect } from "react";
import history from "../../history";
const GetToken = (props) => {
  useEffect(() => {
    window.localStorage.setItem("token", props.match.params.token);
    history.push("/");
  }, []);
  return <div>{props.match.params.token}</div>;
};

export default GetToken;
