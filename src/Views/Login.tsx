import GoogleButton from "../Components/GoogleButton";
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { AxiosContext } from "../Context/AxiosContext";
import { AxiosError } from "axios";
import validator from "validator";
import Loader from "../Components/Loader";
import PageFrame from "../Components/PageFrame";

interface User {
  email: string | null;
  password: string | null;
}

const Login = () => {
  const navigate = useNavigate();

  const axios = useContext(AxiosContext).publicAxios;

  const { setAuthState } = useContext(AuthContext);
  const [isloading, setLoading] = useState<boolean>(false);

  const postData = async () => {
    setLoading(true);
    const url = "winkly_session/log_in";
    const body = {
      email: user.email,
      password: user.password,
    };

    try {
      const response = await axios.post(url, body);
      const data = response.data;
      if (data) {
        const { jwtResponseDto } = data;
        setAuthState((prev) => {
          return {
            ...prev,
            accessToken: jwtResponseDto.accessToken,
            refreshToken: jwtResponseDto.refreshToken,
            authenticated: true,
            updated: true,
            username: jwtResponseDto.username,
          };
        });

        if (jwtResponseDto.username) {
          navigate("/" + jwtResponseDto.username, {
            replace: true,
          });
        } else {
          navigate("/social", {
            replace: true,
          });
        }
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError?.response) {
        console.log("Error in login:", axiosError?.response?.data);
      }
    }

    setLoading(false);
  };

  const [user, setUser] = useState<User>({
    email: null,
    password: null,
  });

  const [error, setError] = useState({
    email: null,
    password: null,
  });

  const inputEvent = (event: any) => {
    const { name, value } = event.target;
    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const onSubmits = (event: any) => {
    event.preventDefault();
    var validEmail = true;
    var validPass = true;

    setError({
      email: null,
      password: null,
    });

    if (!user.email || user.email.trim().length === 0) {
      validEmail = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          email: "email cannot be empty",
        };
      });
    } else if (user.email && validator.isEmail(user.email) === false) {
      validEmail = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          email: "email is invalid",
        };
      });
    }
    if (!user.password || user.password.trim().length === 0) {
      validPass = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          password: "password cannot be empty",
        };
      });
    }

    if (validEmail === true && validPass === true) {
      postData();
    }
  };

  return (
    <>
      <div className="h-[100vh] w-full pt-[140px] bg-brown100 flex items-center justify-center ">
        <PageFrame>
          <div className="w-full h-full flex flex-row items-center justify-center">
            <div className="w-[400px] max-w-[400px] bg-white shadow-md h-full flex flex-col items-center justify-center px-6 sm:px-10 py-8">
              {isloading ? (
                <Loader />
              ) : (
                <div className="flex w-full flex-col items-center justify-center">
                  <div className="text-2xl font-CocogooseMedium text-brown900">
                    WINKLYY
                  </div>
                  <div className="my-6">
                    <GoogleButton
                      setLoading={setLoading}
                      setAuthState={setAuthState}
                      navigate={navigate}
                    />
                  </div>
                  <div className="flex w-full items-center justify-center mt-2">
                    <div className="flex-1 h-[1px] bg-brown900"></div>
                    <div className="text-sm font-CocogooseRegular mx-4 text-brown900">
                      or
                    </div>
                    <div className="flex-1 h-[1px] bg-brown900"></div>
                  </div>

                  <form className="w-full" onSubmit={onSubmits} noValidate>
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block text-xs font-CocogooseRegular  text-brown900"
                      >
                        email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={inputEvent}
                        autoComplete="email"
                        className="mt-1 block w-full font-CocogooseThin font-bold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                      />
                      {error.email && (
                        <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                          {error.email}
                        </div>
                      )}
                    </div>

                    <div className="w-full mt-2">
                      <label
                        htmlFor="password"
                        className="block text-xs font-CocogooseRegular text-brown900"
                      >
                        password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={inputEvent}
                        autoComplete="password"
                        className="mt-1 block w-full font-CocogooseThin font-bold rounded-md border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500 sm:text-sm"
                      />
                      {error.password && (
                        <div className="text-red-900 text-xs font-CocogooseRegular mt-2">
                          {error.password}
                        </div>
                      )}
                    </div>

                    <div className="w-full flex justify-end mt-2">
                      <div className="text-sm font-CocogooseRegular text-brown900">
                        forgot password
                      </div>
                    </div>

                    <div className="flex justify-center w-full mt-2">
                      <button
                        id="signup"
                        type="submit"
                        className="flex items-center justify-center h-[50px] w-full p-4 rounded-md bg-brown900 focus:outline-none"
                      >
                        <div className="text-white text-base font-CocogooseMedium text-center">
                          log in
                        </div>
                      </button>
                    </div>
                  </form>
                  <div className="text-sm font-CocogooseRegular mt-4 text-brown900">
                    don't have an account?
                    <span className="ml-2 font-bold underline underline-offset-2">
                      <Link to="/signup">sign up</Link>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </PageFrame>
      </div>
    </>
  );
};

export default Login;
