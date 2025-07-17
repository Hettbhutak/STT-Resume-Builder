import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div className='justify-center flex items-center py-32'>
      <SignIn/>
    </div>
  )
}

export default SignInPage