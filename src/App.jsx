import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import { useUser } from '@clerk/clerk-react'
import Header from './components/ui/custom/Header';
import { Toaster } from 'sonner';

function App() {
  
  const {user,isLoaded,isSignedIn}=useUser();
  if(!isSignedIn && isLoaded){
    return  <Navigate to={'auth/sign-in'}/>
  }

  return (
    <>
    <Header/>
     <Outlet/>
     <Toaster/>
    </>
  )
}

export default App
