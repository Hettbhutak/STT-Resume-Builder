import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../button";

function Header() {
    const {user,isSignedIn} =useUser();
  return (
    <div className="p-3 px-5 flex shadow-md justify-between">
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 dark:text-blue-400"
      >
        Resume-Builder
      </Link>
      {isSignedIn ? 
            <div className="flex gap-4 items-center">
                <Link to={'/dashboard'}>
                <Button  className='bg-white text-black hover:bg-blue-50' variant='outline' >Dashboard</Button>
                </Link>
                <UserButton className='bg-black'/>
            </div>
                :
            <div>
                <Link to={'auth/sign-in'}>
                    <Button className='bg-blue-600 text-white'>SignUp/Login</Button>
                </Link>
            </div>
    
      }

    </div>
  );
}

export default Header;
