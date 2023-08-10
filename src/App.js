import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import authContext from "./store/auth-context";
function App() {
  const ctx = useContext(authContext);
  return (
    <>
      <MainHeader isAuthenticated={ctx.isLoggedIn} />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
