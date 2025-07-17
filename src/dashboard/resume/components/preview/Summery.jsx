import React from 'react'

function Summery({resumeInfo}) {
  return (
    <p className='text-xs'>
        {resumeInfo?.summery}
    </p>
  )
}

export default Summery