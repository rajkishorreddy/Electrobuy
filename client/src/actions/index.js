import axios from "axios";
const baseUrl = "http://localhost:8080/api/v1/products";

export const fetchCategoryProducts = (categoryName, page) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${baseUrl}/category/${categoryName}`, {
      params: {
        feildsCapacity: "low",
        sort: "-finalPrice",
      },
    });
    // console.log("the products are:", data.data);
    dispatch({ type: "PRODUCT", payload: data.data.products });
  };
};
export const fetchProductInfo = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${baseUrl}/${id}`);
    dispatch({ type: "PRODUCT_INFO", payload: data.data.product });
  };
};
// export const addUser = (info) => {
//   return async (dispatch) => {
//     const { data } = await axios({
//       method: 'post',
//       url: 'http://localhost:8080/api/v1/users/signup-basic',
//       data: info,
//     });
//     console.log(data.data.user);
//     window.localStorage.setItem('token', data.jwtToken);
//     dispatch({ type: 'USER_IN', payload: data.data.user });
//   };
// };
