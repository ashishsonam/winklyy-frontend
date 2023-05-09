import React, { useCallback, useContext, useEffect, useState } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Homepage from "./Views/Homepage";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Signup from "./Views/Signup";
import Page404 from "./Views/Page404";
import Login from "./Views/Login";
import ContactUs from "./Views/ContactUs";
import About from "./Views/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext, AuthState } from "./Context/AuthContext";
import secureLocalStorage from "react-secure-storage";
import Loader from "./Components/Loader";
import ProfilePage from "./Views/Profile";
import SocialPage from "./Components/SocialPage";
import Search from "./Views/Search";
import Copyright from "./Components/Copyright";

function App() {
  const authContext = useContext(AuthContext);
  const [isloading, setLoading] = useState<boolean>(true);

  const loadJWT = useCallback(
    async (setAuthState: (state: AuthState) => void) => {
      setLoading(true);
      console.log("loadJWT started.");
      try {
        const jwt: any = secureLocalStorage.getItem("token");

        if (jwt && jwt.accessToken && jwt.refreshToken) {
          setAuthState({
            accessToken: jwt.accessToken,
            refreshToken: jwt.refreshToken,
            updated: false,
            authenticated: true,
            username: jwt.username,
          });
        } else {
          throw new Error("AuthContext not found!");
        }
      } catch (error) {
        setAuthState({
          accessToken: null,
          refreshToken: null,
          updated: false,
          authenticated: false,
          username: null,
        });
      }

      setLoading(false);
      console.log("loadJWT ended.");
    },
    []
  );

  useEffect(() => {
    loadJWT(authContext.setAuthState);
  }, [loadJWT, authContext.setAuthState]);

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="content-container">
            <AppRoutes />
          </div>
          <Footer />
          <Copyright />
        </BrowserRouter>
      )}
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/search" element={<Search />} />
      <Route
        path="/login"
        element={
          <RestrictRoute>
            <Login />
          </RestrictRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <RestrictRoute>
            <Signup />
          </RestrictRoute>
        }
      />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/social"
        element={
          <PrivateRoute>
            <SocialPage />
          </PrivateRoute>
        }
      />
      <Route path="/404" element={<Page404 />} />
      <Route path="/:username" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

function PrivateRoute({ children }: any) {
  const authContext = useContext(AuthContext);
  const authState = authContext.authState;

  return <> {authState.authenticated ? children : <Navigate to="/login" />}</>;
}

function RestrictRoute({ children }: any) {
  const authContext = useContext(AuthContext);
  const authState = authContext.authState;

  return <> {!authState.authenticated ? children : <Navigate to="/" />}</>;
}

export { AppRoutes };
export default App;
