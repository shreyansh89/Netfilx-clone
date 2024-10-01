import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import HomePage from './pages/home/HomePage'
import AuthPage from './pages/home/AuthPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import { Loader } from "lucide-react";
import { useEffect } from 'react'

function App() {
  // const user =false;
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return isCheckingAuth ? (
    <div className='h-screen'>
      <div className='flex justify-center items-center bg-black h-full'>
        <Loader className='animate-spin text-red-600 size-10' />
      </div>
    </div>
  ) : (
    <>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <AuthPage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
