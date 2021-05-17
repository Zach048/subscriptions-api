const ACCESS_TOKEN = "id_token";
const REFRESH_TOKEN = "refresh_token";

export const getAccessToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = () => {
    return window.localStorage.getItem(REFRESH_TOKEN);
  };

export const saveAccessToken = token => {
  window.localStorage.setItem(ACCESS_TOKEN, token);
};

export const saveRefreshToken = token => {
    window.localStorage.setItem(REFRESH_TOKEN, token);
  };

export const destroyAccessToken = () => {
  window.localStorage.removeItem(ACCESS_TOKEN);
};

export const destroyRefreshToken = () => {
    window.localStorage.removeItem(REFRESH_TOKEN);
  };

export default { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken, destroyAccessToken, destroyRefreshToken };