import React, { useState } from 'react'
import './App.css'
import AuthProvider from './AuthProvider'
import SignInButton from './SignInButton'
import UserInfo from './UserInfo'
import { useIsAuthenticated } from '@azure/msal-react'
import LogoutButton from './LogOutButton'
import QRScanner from './QRScanner'


function App() {

  
  const isAuthenticated = useIsAuthenticated();
  const isLogin = () => {

    return (
      <p>
        <p>To fix spa login Azure-Application-Manifest-line66_change_type-"Spa"</p>
        <p>Anyone can see this paragraph.</p>
        {isAuthenticated && (
          <p>At least one account is signed in!</p>
        )}
        {!isAuthenticated && (
          <p>No users are signed in!</p>
        )}
      </p>
    );
  }

  return (
    // <>
    //   <SignInButton />
    //   { isAuthenticated && <UserInfo/>}
    //   {isLogin()}
    //   <LogoutButton/>
    // </>
    // <>
    //   <WebcamCapture/>
    // </>
    <>
      <QRScanner/>
    </>
  )
}

export default App
