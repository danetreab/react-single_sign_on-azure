import { useMsal } from "@azure/msal-react";

const LogoutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logout();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
