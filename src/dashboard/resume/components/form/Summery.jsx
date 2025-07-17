import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeContext } from '@/context/ResumeContext'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../../service/GlobalApi';
import { Globe2Icon, LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { chatSession } from './../../../../../service/AIModal';

const prompt = "Job Title : {JobTitle}, On the basis of Job Title create title summary for my resume in 3-4 lines in para form .output should be in json form and two field,onr is summery and second is experience (Fresher, Mid-level, Experienced) and output should be for all type of experience";

function Summery({enabledNext}) {
  const {resumeInfo , setResumeInfo} = useContext(ResumeContext);

  const [summary, setSummary] = useState();
  const [loading,setLoading]=useState(false);
  const [generatedSummary, setGeneratedSummary] = useState();
   const params=useParams();
  useEffect(()=>{
    summary && setResumeInfo({
      ...resumeInfo,
      summery:summary
    })
  },[summary]);


  const GenerateSummary=async()=>{
    setLoading(true);
    const PROMPT = prompt.replace('{JobTitle}',resumeInfo?.jobTitle);
    // console.log(PROMPT);
    const output = await chatSession.sendMessage(PROMPT);
    setGeneratedSummary(JSON.parse(output.response.text()));
    setLoading(false);
    // console.log(output.response.text());
  }

  const onSave=(e)=>{
    e.preventDefault();
   
    setLoading(true)
    const data={
        data:{
            summery:summary
        }
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast("Details updated")
    },(error)=>{
        setLoading(false);
    })
}
  return (
    <div>

        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p>Add Summary for your job title</p>
        

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label >Add Summary</label>
            <Button variant="outline" size='sm' onClick={()=>GenerateSummary()} type="button" className='border-primary text-primary flex gap-2'><Globe2Icon className='h-4 w-4'/>Generate from AI</Button>
          </div>
          
          <Textarea className="mt-5" required
            value={summary}
                defaultValue={summary?summary:resumeInfo?.summery}
            onChange={(e)=>setSummary(e.target.value)}
            />
          <div className='mt-3 flex justify-end'>
                <Button type="submit"
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                    </Button>
            </div>
        </form>
        </div>
        {generatedSummary && <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {generatedSummary?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummary(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}
    </div>
  )
}

export default Summery