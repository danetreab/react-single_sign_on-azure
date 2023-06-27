import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

const SignInButton = () => {
  const { instance } = useMsal();

  const handleSignIn = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.log("Sign-in error: ", error);
    }
  };

  return (
    <button onClick={handleSignIn}>
      Sign In
    </button>
  );
};

export default SignInButton;
