import { ResumeContext } from '@/context/ResumeContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetail';
import Summery from './preview/Summery';
import Experience from './preview/Experience';
import Education from './preview/Education';
import Skills from './preview/Skills';
// import Certificate from './preview/Certificate';
import Certificates from './preview/Certificate';

function ResumePreview() {

    const { resumeInfo, setResumeInfo} = useContext(ResumeContext);
    console.log("Resumecontext",ResumeContext);
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' style={{borderColor:resumeInfo?.themeColor}}>
        
        {/* Personal Details */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>

        {/* Summary */}
        <Summery resumeInfo={resumeInfo}/>

        {/* Professional Exprience  */}
        <Experience resumeInfo={resumeInfo}/>

        {/* Education  */}
        <Education resumeInfo={resumeInfo}/>

        {/* Certificates */}
        <Certificates resumeInfo={resumeInfo} />

        {/* Skills  */}
        <Skills resumeInfo={resumeInfo}/>


    </div>
  )
}

export default ResumePreview