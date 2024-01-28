import React from "react"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
//
import { Navigate, Outlet } from "react-router-dom"

import { useSelector } from "react-redux"

const ProtectedRoutes = () => {
  const { userInfo } = useSelector((state) => state.userLoginAndRegister)
  const { isLoggedIn } = userInfo
  return isLoggedIn ? <Outlet /> : <Login />
}

export default ProtectedRoutes
