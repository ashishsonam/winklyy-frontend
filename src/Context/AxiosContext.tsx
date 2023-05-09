import axios, { AxiosError, AxiosInstance } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from 'react';
import { AuthContext } from './AuthContext';
import { AuthURLs } from '../Helpers/url-helper';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface AxiosContextType {
  authAxios: AxiosInstance;
  publicAxios: AxiosInstance;
}

const defaultAxios = axios.create();

const AxiosContext = createContext<AxiosContextType>({
  authAxios: defaultAxios,
  publicAxios: defaultAxios,
});

const AxiosContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {

  const authContext = useContext(AuthContext);
  const appConfig = {
    baseURL: 'https://api.winklyy.com/',
  };

  let authAxios = axios.create({
    baseURL: appConfig.baseURL,
  });

  let publicAxios = axios.create({
    baseURL: appConfig.baseURL,
  });

  useEffect(() => {
    authAxios.defaults.baseURL = appConfig.baseURL;
    publicAxios.defaults.baseURL = appConfig.baseURL;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appConfig]);

  authAxios.interceptors.request.use(
    (config) => {
      if (config?.headers) {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  publicAxios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = async (failedRequest: AxiosError) => {
    const data = {
      refreshToken: authContext?.authState.refreshToken,
    };

    const options = {
      method: 'POST',
      data,
      url: appConfig.baseURL + 'winkly_session/refresh_token',
    };

    return axios(options)
      .then(async (tokenRefreshResponse) => {
        if (failedRequest?.response?.config?.headers?.Authorization) {
          failedRequest.response.config.headers.Authorization =
            'Bearer ' + tokenRefreshResponse.data.accessToken;
          
          authContext.setAuthState((prev) => {
            return {
              ...prev,
              updated: true,
              accessToken: tokenRefreshResponse.data.accessToken,
              refreshToken: tokenRefreshResponse.data.refreshToken,
            };
          });
          return Promise.resolve(tokenRefreshResponse);
        }
        throw new Error('Error in Failed Request');
      })
      .catch((error) => {
        console.log("Refresh Error:",error);
        authContext.logout();
        return Promise.reject(error);
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {
    shouldRefresh: (error) => {
      const { tokenExpired } = error.response?.data as any;
      return tokenExpired;
    }

  });

  authAxios.interceptors.response.use(
    (response) => {
      if (response?.data?.message) {
        toast.success(response?.data?.message);
      }
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
      return Promise.reject(error);
    }
  );

  publicAxios.interceptors.response.use(
    (response) => {
      if (response?.data?.message) {
        toast.success(response?.data?.message);
      }
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
      return Promise.reject(error);
    }
  );

  return (
    <AxiosContext.Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosContext, AxiosContextProvider, type AxiosContextType };
