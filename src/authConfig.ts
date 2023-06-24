import { Configuration } from '@azure/msal-browser';

export const ssoConfig: Configuration = {
  auth: {
    clientId: 'bac0c87e-6751-4546-97fe-8cb1d4554197',
    authority: 'https://login.microsoftonline.com/1e9461ec-5362-4329-ae46-61fa3e91c6d2',
    redirectUri: 'http://localhost:5173/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};