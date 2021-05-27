import { useEffect } from 'react';
import axios from 'axios';
const Conformation = (props) => {
  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8080/api/v1/payments/checkOrder/${props.match.params.id}`
        );
        console.log(data);
      } catch (err) {
        console.log(err.response?.data);
      }
    };
    // try {
    //   const check = async () => {
    //     const { data } = await axios.get(
    //       `http://127.0.0.1:8080/api/v1/payments/checkOrder/${props.match.params.id}`
    //     );
    //     console.log(data);
    //   };

    // } catch (err) {
    //   console.log(err.response?.data);
    //   alert(err.response?.data.message);
    // }
    check();
  });
  return <div>{props.match.params.id}hjfksldflksjalfsdafjlksjf</div>;
};

export default Conformation;
