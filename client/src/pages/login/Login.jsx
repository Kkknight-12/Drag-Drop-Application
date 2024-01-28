import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, register } from "../../actions/user"
import { useNavigate } from "react-router-dom"
//
import "./home.css"

const initialState = {
  fullName: "",
  email: "luffy@gmail.com",
  password: "abcd1234",
}

export default function Login() {
  const dispatch = useDispatch()
  const history = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [isSignUp, setIsSignUp] = useState(false)
  const [emailErr, setEmailErr] = useState("")
  const [formErr, setFormErr] = useState("")

  //taking the state from store
  const userLogin = useSelector((state) => state.userLoginAndRegister)
  // console.log("userLogin", userLogin)
  const { error, loading } = userLogin

  /*
	const data = useSelector((state) => state.userLoginAndRegister)
	console.log("DATA", data)
	const { userLogin: { error }, loading  } = data
	*/

  const handleToggleSingIn = (e) => {
    e.preventDefault()
    setIsSignUp(false)
  }

  const handleToggleSingUp = (e) => {
    e.preventDefault()
    setIsSignUp(true)
    setFormErr("")
    setEmailErr("")
  }

  const handleChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (error) {
      setEmailErr("")
      setFormErr(error)
    }
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()
    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!formData.email.match(pattern)) {
      setFormErr("")
      setEmailErr("Please Enter a Valid Email.")
      return
    } else {
      if (isSignUp) {
        dispatch(register(formData, history))
      } else {
        dispatch(login(formData, history))
      }
    }
  }

  return (
    <div className="container mx-auto">
      <div className="row">
        <div className="col d-none d-xl-flex justify-content-center align-items-center w-25">
          {/* <img src={} alt="" /> */}
          <img
            className="login-img mx-auto"
            src="/asset/login.png"
            alt="login-img"
            style={{ height: "50vh" }}
          />
        </div>
        <div className="form-container col custom-form mx-auto">
          <form className="login-form" onSubmit={handleSubmit}>
            <a
              onClick={handleToggleSingIn}
              className={`sign-in-btn  ${!isSignUp ? "active" : ""}`}
            >
              LogIn
            </a>
            <a
              onClick={handleToggleSingUp}
              className={`sign-up-btn ${isSignUp ? "active" : ""}`}
            >
              SignUp
            </a>
            <div className="form-input-fields">
              <div className="input-form-border"></div>
              <div className="mb-3 mt-4">
                {isSignUp && (
                  <div className="row">
                    <div className="col pt-2">
                      <div className="mb-3 form-group">
                        <label
                          htmlFor="exampleInputFullname"
                          className="form-label"
                        >
                          Full Name
                        </label>
                        <input
                          name="fullName"
                          onChange={handleChange}
                          type="text"
                          id="exampleInputFullname"
                          placeholder="Full name"
                          aria-label="Full name"
                          className="form-control"
                        />
                      </div>
                    </div>
                    {/* <div class="col">
                        <input
                            name="lastName"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            placeholder="Last name"
                            aria-label="Last name"
                        />
                    </div> */}
                  </div>
                )}
                {!isSignUp && <h4 className="login-form-h4">To continue</h4>}
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  style={{
                    borderColor: emailErr || formErr ? "red" : "",
                  }}
                  name="email"
                  type="email"
                  value={formData.email}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={handleChange}

                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  style={{
                    borderColor: formErr ? "red" : "",
                  }}
                  value={formData.password}
                  name="password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={handleChange}
                  // onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-center">
                  {formErr ? (
                    <small
                      id="emailHelp"
                      className="form-text text-muted error-message"
                    >
                      {formErr}
                    </small>
                  ) : null}
                  {emailErr ? (
                    <small
                      id="emailHelp"
                      className="form-text text-muted error-message"
                    >
                      {emailErr}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn login-submit-btn">
                  {loading ? (
                    <>
                      <div
                        className="spinner-border spinner-border-sm spinner-css"
                        role="status"
                        aria-hidden="true"
                      ></div>

                      {!isSignUp ? "Log In" : "Sign Up"}
                    </>
                  ) : !isSignUp ? (
                    "Log In"
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
