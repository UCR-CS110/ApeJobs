import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute/PrivateRoute";
import { StudentRoute } from "./routes/StudentRoute/StudentRoute";
import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register/Register";
import { Application } from "./pages/Application/Application";
import { JobListingForm } from "./pages/JobListingForm/JobListingForm";
import { UserContextProvider } from "./contexts/UserContext/UserContext";
import { NavBar } from "./components/NavBar/NavBar";
import { CaseStatus } from "./pages/CaseStatus/CaseStatus";
import { JobListing } from "./pages/JobListing/JobListing";
import { ProfRoute } from "./routes/ProfRoute/ProfRoute";
import "./App.css";

const routes = [
  { title: "profile", element: <PrivateRoute element={<Profile />} /> },
  { title: "new-job", element: <PrivateRoute element={<JobListingForm />} /> },
  { title: "", element: <StudentRoute element={<Home />} /> },
  { title: "signin", element: <SignIn /> },
  { title: "register", element: <Register /> },
  {
    title: "/profile/applications/:id",
    element: <PrivateRoute element={<CaseStatus />} />,
  },
  {
    title: "/listing/:id/apply",
    element: <StudentRoute element={<Application />} />,
  },
  { title: "/listing/:id", element: <ProfRoute element={<JobListing />} /> },
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
                  exact
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
