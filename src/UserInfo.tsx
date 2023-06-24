import { useMsal } from "@azure/msal-react";

const UserInfo = () => {
  const { accounts } = useMsal();
  const userAccount = accounts[0];

  return (
    <div>
      <h2>User Information</h2>
      <p>Name: {userAccount.name}</p>
      <p>Email: {userAccount.username}</p>
      {/* Additional user information */}
    </div>
  );
};

export default UserInfo;
