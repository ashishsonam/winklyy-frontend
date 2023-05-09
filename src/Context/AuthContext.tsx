import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import secureLocalStorage from 'react-secure-storage';

interface AuthState {
  accessToken: null | string;
  refreshToken: null | string;
  updated: boolean;
  authenticated: null | boolean;
  username: null | string;
}

interface AuthContextType {
  authState: AuthState;
  getAccessToken: () => string | null;
  setAuthState: (state: AuthState | ((prev: AuthState) => AuthState)) => void;
  logout: () => void;
}

const defaultAuthState: AuthState = {
  accessToken: null,
  refreshToken: null,
  updated: false,
  authenticated: null,
  username: null,
};

const AuthContext = React.createContext<AuthContextType>({
  authState: defaultAuthState,
  getAccessToken: () => null,
  setAuthState: (_: AuthState | ((prev: AuthState) => AuthState)) => null,
  logout: () => {},
});

const AuthContextProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    if (authState.accessToken && authState.refreshToken) {
      if (authState.updated) {
        secureLocalStorage.setItem('token', {
          accessToken: authState.accessToken,
          refreshToken: authState.refreshToken,
          username: authState.username,
        });
      }
    }
  }, [authState]);

  const logout = useCallback(() => {
    setAuthState((prev) => {
      return {
        ...prev,
        accessToken: null,
        refreshToken: null,
        authenticated: false,
        username: null,
      };
    });
    secureLocalStorage.clear();
  }, []);

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthContextProvider,
  type AuthContextType,
  type AuthState,
};
