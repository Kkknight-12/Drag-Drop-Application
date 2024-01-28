import React from "react"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"

import { useSelector } from "react-redux"

const GuestGuard = () => {
  const { userInfo } = useSelector((state) => state.userLoginAndRegister)
  const isLoggedIn = userInfo?.isLoggedIn
  return isLoggedIn ? <Home /> : <Login />
}

export default GuestGuard
