// import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeContext } from '@/context/ResumeContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'
import Header from '@/components/ui/custom/Header'
// import html2pdf from 'html2pdf.js';

const ViewResume=()=> {

    const [resumeInfo,setResumeInfo]=useState();
    const {resumeId}=useParams();

    useEffect(()=>{
        GetResumeInfo();
    },[])
    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload = () => {
        // const element = document.getElementById("print-area");
        // html2pdf().from(element).save("Resume.pdf");
        window.print();
      };
console.log("ResumePreview:", ResumePreview);
console.log("Header:", Header);
console.log("resinfi:", resumeInfo);

  return (
    <ResumeContext.Provider value={{resumeInfo,setResumeInfo}} >
        <div id="no-print">
            
        {/* <Header/> */}
        {Header ? <Header /> : <div>Header is undefined</div>}
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <h2 className='text-center text-2xl font-medium'>
                Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
                    resume url with your friends and family </p>
            <div className='flex justify-between px-44 my-10'>
                <Button onClick={HandleDownload}>Download</Button>
               
                <RWebShare
        data={{
          text: "Hello Everyone, This is my resume please open url to see it",
          url: import.meta.env.VITE_BASE_URL+"/myResume/"+resumeId+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
        }}
        onClick={() => console.log("shared successfully!")}
      > <Button>Share</Button>
      </RWebShare>
            </div>
        </div>
            
        </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area" >
                {ResumePreview ? <ResumePreview /> : <div>ResumePreview is undefined</div>}
            </div>
            </div>
    </ResumeContext.Provider>
  )
}

export default ViewResume