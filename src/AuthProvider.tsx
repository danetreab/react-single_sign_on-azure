import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ssoConfig } from "./authConfig";

const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const msalInstance = new PublicClientApplication(ssoConfig);

    return (
        <MsalProvider instance={msalInstance}>
            {children}
        </MsalProvider>
    )
}

export default AuthProvider