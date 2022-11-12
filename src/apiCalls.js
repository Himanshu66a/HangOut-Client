import axios from "axios";
const AU = process.env.REACT_APP_URI;

export const loginCall = async (userCredential, dispatch) => {
  console.log(userCredential.email);
  console.log(userCredential.password);

  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${AU}auth/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }

};
