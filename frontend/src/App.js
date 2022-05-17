import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute/PrivateRoute";
import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register/Register";
import { UserContextProvider } from "./contexts/UserContext/UserContext";
import "./App.css";

const routes = [
  { title: "profile", element: <PrivateRoute element={<Profile />} /> },
  { title: "", element: <Home /> },
  { title: "signin", element: <SignIn /> },
  { title: "register", element: <Register /> },
];

export const App = () => {
  return (
    <UserContextProvider>
      <div className="App">
        <Router>
          <Routes>
            {routes.map((page) => {
              return (
                <Route
                  key={page.title}
                  path={"/" + page.title}
                  element={page.element}
                />
              );
            })}
          </Routes>
        </Router>
      </div>
    </UserContextProvider>
  );
};
