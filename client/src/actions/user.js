import axios from "axios"
import * as api from "../api"

export const login = (formData, history) => async (dispatch) => {
  const { email, password } = formData
  // console.log(email, password);
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    })

    // console.log(email, password);
    const { data } = await api.login(email, password)
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    })
    localStorage.setItem("userInfo", JSON.stringify(data))
    history("/home")
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = (history) => (dispatch) => {
  // we will also remove the user info from local storage
  localStorage.removeItem("userInfo")
  // dispatching user logout action
  dispatch({
    type: "USER_LOGOUT",
  })
  history("/login")
}

export const register =
  ({ fullName: name, email, password }, history) =>
  async (dispatch) => {
    // const { fullName: name, email, password } = formData

    try {
      dispatch({
        type: "USER_REGISTER_REQUEST",
      })

      // const config = {
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      // };

      // const { data } = await axios.post(
      //     "/api/user/register",
      //     { name, email, password },
      //     config
      // );
      const { data } = await api.registerUser(name, email, password)

      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: data,
      })

      localStorage.setItem("userInfo", JSON.stringify(data))
      history("/home")
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
