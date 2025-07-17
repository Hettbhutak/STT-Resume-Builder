import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeContext } from '@/context/ResumeContext';
// import dummy from '@/data/dummy';
import GlobalApi from './../../../../../service/GlobalApi';

function EditResume() {
    const {resumeId} = useParams();
    const [resumeInfo, setResumeInfo] = useState();
    useEffect(()=>{
        
        GetResumeInfo();
    },[])

    const GetResumeInfo=()=>{
      GlobalApi.GetResumeById(resumeId).then(resp=>{
        console.log(resp.data.data)
        setResumeInfo(resp.data.data)
      })
    }
  return (
    <ResumeContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* Form Section */}
        <FormSection/>
        
        {/* Preview Section */}
        <ResumePreview/>


    </div>
    </ResumeContext.Provider>
  )
}

export default EditResume