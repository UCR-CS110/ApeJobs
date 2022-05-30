import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute/PrivateRoute";
import { StudentRoute } from "./routes/StudentRoute/StudentRoute";
import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register/Register";
import { Application } from "./pages/Application/Application";
import { JobListing } from "./pages/JobListing/JobListing";
import { UserContextProvider } from "./contexts/UserContext/UserContext";
import { NavBar } from "./components/NavBar/NavBar";
import "./App.css";

const routes = [
  { title: "profile", element: <PrivateRoute element={<Profile />} /> },
  { title: "new-job", element: <PrivateRoute element={<JobListing />} /> },
  { title: "", element: <StudentRoute element={<Home />} /> },
  { title: "signin", element: <SignIn /> },
  { title: "register", element: <Register /> },
  { title: "/listing/:id/apply", element: <Application /> },
];

export const App = () => {
  return (
    <UserContextProvider>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            {routes.map((page) => {
              return (
                <Route
                  key={page.title}
                  exact path={"/" + page.title}
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
