import { Button } from '@/components/ui/button';
import { Brain, Globe2, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import {  chatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';
import { ResumeContext } from '@/context/ResumeContext';
const PROMPT = `Based on the position title: "{positionTitle}", generate 5–7 bullet points for resume experience. Do NOT include experience level. Do NOT return a JSON array. Just return clean HTML. give only a response with bullet points . do not inclue text like "bullet points,'/n for new line' etc ans send data in <ul><li>..</li></ul> format`;
function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
    const [value,setValue]=useState(defaultValue);
    const {resumeInfo,setResumeInfo}=useContext(ResumeContext)
    const [loading,setLoading]=useState(false);
    const GenerateSummeryFromAI = async () => {
      if (!resumeInfo?.experience[index]?.title) {
        toast('Please Add Position Title');
        return;
      }
    
      setLoading(true);
    
      try {
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
        const result = await chatSession.sendMessage(prompt);
        const resp = await result.response.text(); // ✅ await this properly
        const cleanedHtml = resp
          .replace(/^\[|\]$/g, '') // optional: if response is wrapped in brackets
          .trim();
    
        setValue(cleanedHtml);
    
        // Optional: update resumeInfo state if you want to store it persistently
        const updatedExperience = [...resumeInfo.experience];
        updatedExperience[index].workSummery = cleanedHtml; // assuming `summary` field exists
        setResumeInfo({ ...resumeInfo, experience: updatedExperience });
    
      } catch (error) {
        toast.error('Something went wrong while generating summary');
        console.error('AI summary generation error:', error);
      } finally {
        setLoading(false);
      }
    };
    
  
    return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        disabled={loading}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Globe2 className='h-4 w-4'/> Generate from AI 
           </>
        }
         </Button>
      </div>
    <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value);
        onRichTextEditorChange(e)
      }}>
         <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
         
         
        </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor