import React, { useContext, useState } from 'react';
import logo from '../Assets/logo.png';
import GoogleButton from '../Components/GoogleButton';
import validator from 'validator';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosContext } from '../Context/AxiosContext';
import { AuthContext } from '../Context/AuthContext';
import { AxiosError } from 'axios';
import Loader from '../Components/Loader';
import PageFrame from '../Components/PageFrame';

interface NewUser {
  email: string | null;
  password: string | null;
  confirm_password: string | null;
}

const Signup = () => {
  const navigate = useNavigate();

  const axios = useContext(AxiosContext).publicAxios;
  const { setAuthState } = useContext(AuthContext);

  const [user, setUser] = useState<NewUser>({
    email: null,
    password: null,
    confirm_password: null,
  });

  const [error, setError] = useState({
    email: null,
    password: null,
  });

  const [isloading, setLoading] = useState<boolean>(false);

  const inputEvent = (event: any) => {
    const { name, value } = event.target;
    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const postData = async () => {
    setLoading(true);
    const url = 'winkly/register_user';
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
          };
        });

        navigate('/social', {
          replace: true,
        });
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError?.response) {
        console.log('Error in signup:', axiosError?.response?.data);
      }
    }

    setLoading(false);
  };

  const onSubmits = (event: any) => {
    event.preventDefault();

    setError({
      email: null,
      password: null,
    });

    var validEmail = true;
    var validPass = true;
    if (!user.email || user.email.trim().length === 0) {
      validEmail = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          email: 'Email Cannot Be Empty',
        };
      });
    } else if (user.email && validator.isEmail(user.email) === false) {
      validEmail = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          email: 'Email Is Invalid',
        };
      });
    }
    if (
      !user.password ||
      !user.confirm_password ||
      user.password.trim().length === 0 ||
      user.confirm_password.trim().length === 0
    ) {
      validPass = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          password: 'Password Cannot Be Empty',
        };
      });
    } else if (
      user.password &&
      user.confirm_password &&
      validator.equals(user.password, user.confirm_password) === false
    ) {
      validPass = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          password: 'Password Do Not Match',
        };
      });
    } else if (
      user.password &&
      !validator.isStrongPassword(user.password, { minLength: 8 })
    ) {
      validPass = false;
      setError((preValue: any) => {
        return {
          ...preValue,
          password: `Password must have : \na minimum of 1 upper case letter [A-Z]\na minimum of 1 lower case letter [a-z]\na minimum of 1 numeric character [0-9]\na minimum of 1 special character\npassword must be at least 8 characters in length`,
        };
      });
    }

    if (validEmail === true && validPass === true) {
      postData();
    }
  };

  return (
    <>
      <div className="h-[100vh] w-full pt-[120px] bg-brown200 flex flex-col items-center justify-center">
        <PageFrame>
          <div className="w-full h-full flex flex-row items-center justify-center">
            <div className="w-[400px] max-w-[400px] bg-white shadow-md h-full flex flex-col items-center justify-center px-6 sm:px-10 py-8">
              {isloading ? (
                <>
                  <Loader />
                </>
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
                    <div className="text-sm font-CocogooseRegular mx-4 text-brown900">or</div>
                    <div className="flex-1 h-[1px] bg-brown900"></div>
                  </div>

                  <form className="w-full" onSubmit={onSubmits} noValidate>
                    <div className="w-full">
                      <label className="block text-xs font-CocogooseRegular   text-brown900">
                        email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={inputEvent}
                        autoComplete="email"
                        className="mt-1 block w-full font-CocogooseThin font-bold  rounded-md  border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500  sm:text-sm"
                        required
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
                        className="mt-1 block w-full rounded-md font-CocogooseThin font-bold border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500  sm:text-sm"
                      />
                      {error.password && (
                        <div className="text-red-900 text-xs font-CocogooseThin font-semibold mt-2">
                          {error.password}
                        </div>
                      )}
                    </div>

                    <div className="w-full mt-2">
                      <label
                        htmlFor="confirm_password"
                        className="block text-xs font-CocogooseRegular text-brown900"
                      >
                        confirm password
                      </label>
                      <input
                        type="password"
                        onChange={inputEvent}
                        name="confirm_password"
                        id="confirm_password"
                        autoComplete="confirm_password"
                        className="mt-1 block w-full rounded-md font-CocogooseThin font-bold border-brown900 shadow-sm focus:border-brown500 focus:ring-brown500  sm:text-sm"
                      />
                    </div>

                    <div className="flex justify-center w-full mt-4">
                      <button
                        id="signup"
                        type="submit"
                        className="flex items-center justify-center h-[50px] w-full p-4 rounded-md bg-brown900  focus:outline-none"
                      >
                        <div className="text-white text-base font-CocogooseMedium text-center">
                          sign up
                        </div>
                      </button>
                    </div>
                  </form>
                  <div className="text-sm font-CocogooseRegular mt-4 text-brown900">
                    already have an account ?
                    <span className="ml-2 font-bold underline underline-offset-2">
                      <Link to="/login">click here</Link>
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

export default Signup;
