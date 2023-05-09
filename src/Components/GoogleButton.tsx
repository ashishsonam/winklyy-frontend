import { GoogleLogin } from '@react-oauth/google';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthState } from '../Context/AuthContext';
import { AxiosContext } from '../Context/AxiosContext';

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setAuthState: (state: AuthState | ((prev: AuthState) => AuthState)) => void;
  navigate: NavigateFunction;
}

const GoogleButton = ({ setLoading, setAuthState, navigate }: Props) => {
  const axios = useContext(AxiosContext).publicAxios;

  const postData = async (token: string) => {
    setLoading(true);
    const url = 'winkly_google/log_in';
    const body = {
      token: token,
    };

    try {
      const response = await axios.post(url, body);
      const data = response.data.jwtResponseDto;
      if (data) {
        setAuthState((prev) => {
          return {
            ...prev,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            authenticated: true,
            updated: true,
            username: data.username,
          };
        });

        if (data.username) {
          navigate('/' + data.username, {
            replace: true,
          });
        } else {
          navigate('/social', {
            replace: true,
          });
        }
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError?.response) {
        console.log('Error in google login:', axiosError?.response?.data);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <div>
        <GoogleLogin
          onSuccess={(response) => {
            console.log(response);
            if (response && response.credential) {
              postData(response.credential);
            }
          }}
          onError={() => {
            toast.error('Something Went Wrong!');
          }}
        />
      </div>
    </>
  );
};

export default GoogleButton;
