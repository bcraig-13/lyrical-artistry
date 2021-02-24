import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "./AuthService";

const auth = new AuthService();

const initAxiosAuth = () => {
  // add an interceptor (kind of like middleware) that will add auth headers to
  // requests
  axios.interceptors.request.use(function (config) {
    // add authorization headers for requests to own api (request url starts with
    // "/api" exactly)
    const token = auth.getToken();
    if (token && /^\/api/.test(config.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
};

// Custom hook to provide auth state and login/logout functions
function useProvideAuth() {
  const [user, setUser] = useState(() => auth.getProfile());
  const [error, setError] = useState(null);

  const isLoggedIn = !!user;

  const login = ({ email, password }) => {
    return auth
      .login(email, password)
      .then(() => {
        setUser(auth.getProfile());
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  return {
    isLoggedIn,
    user,
    error,
    login,
    logout
  };
}

// Create a global context for providing/consuming the auth context
const authContext = createContext({
  isLoggedIn: false,
  user: null,
  error: null,
  login: () => {},
  logout: () => {}
});

function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  // initialize axios auth headers when ProvideAuth is rendered for the first
  // time
  useEffect(() => {
    initAxiosAuth();
  }, []);

  return <authContext.Provider value={auth} children={children} />;
}

function useAuth() {
  return useContext(authContext);
}

export { ProvideAuth, useAuth };
