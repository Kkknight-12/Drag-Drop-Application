import React from "react"
import { Dispatch } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "./navbar.css"

//
import { logout } from "../../actions/user"

export default function Navbar() {
  const dispatch = useDispatch()
  const history = useNavigate()
  const { userInfo } = useSelector((state) => state.userLoginAndRegister)
  const { name } = userInfo

  const handleLogout = () => {
    dispatch(logout(history))
  }
  return (
    <div className="nav-container">
      {/* <div className="d-flex justify-content-end mb-2"> */}
      <ul className="nav-list d-flex align-items-center justify-content-end m-3 mb-2">
        <li className="me-4 nav-initial d-flex flex-column topImg">
          <div className="text-capitalize fw-bolder">{name.charAt(0)}</div>
        </li>
        <li className="me-1">Hi</li>
        <li className="me-4">{name}</li>
        <button
          onClick={handleLogout}
          className="btn sign-out-btn btn-outline-secondary"
        >
          SignOut
        </button>
      </ul>
      {/* </div> */}
    </div>
  )
}
