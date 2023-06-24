import { useState } from 'react'
import './App.css'
import AuthProvider from './AuthProvider'
import SignInButton from './SignInButton'

function App() {  

  return (
    <AuthProvider>
      <SignInButton/>
    </AuthProvider>
  )
}

export default App
