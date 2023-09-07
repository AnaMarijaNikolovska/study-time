import React, { createContext, useContext, useState } from 'react';

const AccessTokenStateContext = createContext({ accessToken: undefined, userId: undefined });
const AccessTokenUpdaterContext = createContext({ setAccessToken: {}, setUserId: {} });

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);

  return (
    <AccessTokenStateContext.Provider value={{ accessToken, userId }}>
      <AccessTokenUpdaterContext.Provider value={{ setAccessToken, setUserId }}>
        {children}
      </AccessTokenUpdaterContext.Provider>
    </AccessTokenStateContext.Provider>
  );
};

export function useAccessTokenState() {
  const context = useContext(AccessTokenStateContext);

  return {
    token: context.accessToken,
    userId: context.userId,
  };
}

export function useAccessTokenUpdater() {
  const context = useContext(AccessTokenUpdaterContext);

  return {
    setAccessToken: context.setAccessToken,
    setUserId: context.setUserId,
  };
}