import Home from "./assets/Home/Components/home";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./assets/Login/Compenents/login";

import { AuthenticationContext } from "./assets/Context/context";
import { SignUp } from "./assets/SingUp/Components/signUp";
function App() {
  return (
    <AuthenticationContext>
      <HashRouter>
        <div className="container mt-3">
          <Routes>
            <Route exact path="/" Component={Login} />
            <Route exact path="/home" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/signUp" Component={SignUp} />
            <Route path="*" Component={Login} />
          </Routes>
        </div>
      </HashRouter>
    </AuthenticationContext>
  );
}

export default App;