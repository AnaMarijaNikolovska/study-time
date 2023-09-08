import React, { createContext, useContext, useState } from 'react';

const AccessTokenStateContext = createContext({ accessToken: undefined, authUser: undefined });
const AccessTokenUpdaterContext = createContext({ setAccessToken: {}, setAuthUser: {} });

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(undefined);
  const [authUser, setAuthUser] = useState(undefined);

  return (
    <AccessTokenStateContext.Provider value={{ accessToken, authUser: authUser }}>
      <AccessTokenUpdaterContext.Provider value={{ setAccessToken, setAuthUser: setAuthUser }}>
        {children}
      </AccessTokenUpdaterContext.Provider>
    </AccessTokenStateContext.Provider>
  );
};

export function useAccessTokenState() {
  const context = useContext(AccessTokenStateContext);

  return {
    token: context.accessToken,
    authUser: context.authUser,
  };
}

export function useAccessTokenUpdater() {
  const context = useContext(AccessTokenUpdaterContext);

  return {
    setAccessToken: context.setAccessToken,
    setAuthUser: context.setAuthUser,
  };
}