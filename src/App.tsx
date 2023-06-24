import React, { useState } from 'react'
import './App.css'
import AuthProvider from './AuthProvider'
import SignInButton from './SignInButton'
import UserInfo from './UserInfo'
import { useIsAuthenticated } from '@azure/msal-react'
import LogoutButton from './LogOutButton'

function App() {
  const isAuthenticated = useIsAuthenticated();
  const isLogin = () => {

    return (
      <p>
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
    <>
      <SignInButton />
      <UserInfo/>
      {isLogin()}
      <LogoutButton/>
    </>
    // <AuthProvider>

    // </AuthProvider>
  )
}

export default App
