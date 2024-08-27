import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Profile from "./components/Profile/Profile";
import Toastify from "./shared/UIElements/Toastify";
import { checkAuthentication } from "./services/apiServices";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const isAuthenticate = checkAuthentication();
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                isAuthenticated={isAuthenticate}
                onLogout={() => setIsAuthenticated(false)}
              />
            }
          />
          <Route
            path='/login'
            element={<Auth onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticate} />}>
            <Route
              path='/profile'
              element={<Profile onLogout={() => setIsAuthenticated(false)} />}
            />
          </Route>
          {/* <Route
            path='/profile'
            element={<Profile onLogout={() => setIsAuthenticated(false)} />}
          /> */}
        </Routes>
        <Toastify />
      </div>
    </Router>
  );
};

export default App;
