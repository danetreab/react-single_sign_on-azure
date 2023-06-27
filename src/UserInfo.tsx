import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

const UserInfo = () => {
  const { instance, accounts } = useMsal();
  const userAccount = accounts[0];
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const accessTokenRequest = {
      scopes: ["openid", "profile", "User.Read"],
      account: userAccount,
    };

    instance
      .acquireTokenSilent(accessTokenRequest)
      .then((response) => {
        const token = response.accessToken;
        setAccessToken(token);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [instance, userAccount]);

  return (
    <div>
      <h2>User Information</h2>
      <p>Name: {userAccount.name}</p>
      <p>Email: {userAccount.username}</p>
      <p>Access Token: {accessToken}</p>
      {/* Additional user information */}
    </div>
  );
};

export default UserInfo;
