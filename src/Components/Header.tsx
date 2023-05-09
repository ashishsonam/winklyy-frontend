import React, { useContext, useEffect, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { brown900 } from '../Constants/colors';
import { AuthContext } from '../Context/AuthContext';

const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const authState = authContext.authState;
  const navigate = useNavigate();
  let location = useLocation();

  const menuHandler = () => {
    setOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    // Google Analytics
    setOpenMenu(false);
  }, [location]);

  const logout = () => {
    authContext.logout();
    navigate('/');
  };

  return (
    <nav className="bg-white rounded-full shadow-md shadow-brown200 fixed w-[90%] sm:w-[80%] z-50 left-[5%] right-[5%] sm:left-[10%] sm:right-[10%] top-8">
      <div className="w-full py-2 pl-2 pr-3 h-[70px] sm:h-[80px] lg:h-[88px]">
        <div className="flex flex-row h-full w-full items-center justify-between">
          <div className="h-full w-full flex flex-row items-center">
            <div className="h-full flex flex-col items-center justify-center ml-6 mr-2">
              <Link
                to="/"
                className="text-brown900 text-4xl sm:text-[36px] font-CocogooseSemibold text-center"
              >
                W
              </Link>
            </div>
            <div className="hidden lg:ml-6 lg:block">
              <div className="flex space-x-6">
                {authState.authenticated && (
                  <Link
                    to={
                      authState.username ? '/' + authState.username : '/social'
                    }
                    className="text-brown800 hover:bg-brown100 px-2 py-1 rounded-md text-xl font-CocogooseMedium"
                  >
                    profile
                  </Link>
                )}

                <Link
                  to="/contactus"
                  className="text-brown800 hover:bg-brown100 px-2 py-1 rounded-md text-xl font-CocogooseMedium"
                >
                  contact us
                </Link>

                <Link
                  to="/about"
                  className="text-brown800 hover:bg-brown100 px-2 py-1 rounded-md text-xl font-CocogooseMedium"
                >
                  about
                </Link>
                <Link
                  to="/search"
                  className="text-brown800 hover:bg-brown100 px-2 py-1 rounded-md text-xl font-CocogooseMedium"
                >
                  search
                </Link>
              </div>
            </div>
          </div>
          <div className="flex h-full inset-y-0 right-0 items-center justify-between sm:static sm:inset-auto">
            {authState.authenticated ? (
              <>
                <button
                  id="logout"
                  onClick={logout}
                  className="h-[56px] sm:h-[66px] w-[100px] sm:w-[120px] px-4 py-2 flex items-center justify-center rounded-full bg-brown900 focus:outline-none text-white text-base sm:text-lg font-CocogooseMedium"
                >
                  log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  id="login"
                  className="h-[56px] sm:h-[66px] w-[80px] sm:w-[120px] p-2 md:px-6 flex items-center justify-center rounded-lg bg-creamyWhite900 focus:outline-none mr-2 text-brown900 text-base sm:text-lg font-CocogooseMedium"
                >
                  log in
                </Link>

                <Link
                  to="/signup"
                  id="signup"
                  className="h-[56px] sm:h-[66px] w-[100px] sm:w-[140px] px-4 py-2 flex items-center justify-center rounded-full bg-brown900 focus:outline-none text-white text-base sm:text-lg font-CocogooseMedium"
                >
                  sign up
                </Link>
              </>
            )}

            <button
              id="dropdown"
              type="button"
              onClick={menuHandler}
              className="h-full inline-flex text-center items-center justify-center text-gray-400 focus:outline-none px-3 lg:hidden"
            >
              <RxHamburgerMenu size={24} color={brown900} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute ${
          !openMenu && 'hidden'
        } lg:hidden bg-white w-full`}
        id="mobile-menu"
      >
        <div className="flex flex-col items-end space-y-1 px-2 pt-2 pb-3">
          {authState.authenticated && (
            <Link
              to={authState.username ? '/' + authState.username : '/social'}
              className="text-brown800 hover:bg-brown100 px-2 py-1 rounded-md text-xl font-CocogooseMedium"
            >
              profile
            </Link>
          )}
          <Link
            to="/contactus"
            className="text-brown800 hover:bg-brown100 px-2 py-1 rounded-md text-xl font-CocogooseMedium"
          >
            contact us
          </Link>

          <Link
            to="/about"
            className="text-brown800 hover:bg-brown100 px-2 py-1 rounded-md text-xl font-CocogooseMedium"
          >
            about
          </Link>
          <Link
            to="/search"
            className="text-brown800 hover:bg-brown100 px-2 py-1 rounded-md text-xl font-CocogooseMedium"
          >
            search
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
