import React from "react"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import {
  BrowserRoute as Router,
  Routes,
  Route,
  Navigate,
  // Redirect,
} from "react-router-dom"

// function App() {
//     return (
//         <div>
//             <Routes>
//                 <Route path="/" exact element={<Login />} />
//                 <Route path="/home" exact element={<Home />} />
//             </Routes>
//         </div>
//     );
// }

import ProtectedRoutes from "./ProtectedRoutes"
import GuestGuard from "./GuestGuard"

function App() {
  // const isLoggedIn = false;
  // const routing = useRoutes(protectedRoutes(isLoggedIn));

  return (
    <Routes>
      <Route element={<GuestGuard />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  )
}
// function RequireAuth({ children, redirectTo }) {
//     const { isLoggedIn } = useSelector((state) => state.userLogin);
//     console.log("isLoggedIn", isLoggedIn);
//     // let isAuthenticated = getAuth();
//     return isLoggedIn ? children : <Navigate to={redirectTo} />;
// }

export default App
