import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        className='font-bold text-xl text-center'
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>

      <h2
        className='text-center font-normal text-xs'
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.address}
      </h2>

      <div className='flex justify-between items-center'>
        <h2
          className='font-normal text-xs'
          style={{ color: resumeInfo?.themeColor }}
        >
           {resumeInfo?.phone}
        </h2>
        
        <div className='flex gap-3'>
          {resumeInfo?.email && (
            <a href={`mailto:${resumeInfo.email}`} target='_blank' rel='noopener noreferrer' style={{ color: resumeInfo?.themeColor }}>
              <FaEnvelope size={16} />
            </a>
          )}
          {resumeInfo?.github && (
            <a href={resumeInfo.github} target='_blank' rel='noopener noreferrer' style={{ color: resumeInfo?.themeColor }}>
              <FaGithub size={16} />
            </a>
          )}
          {resumeInfo?.linkedin && (
            <a href={resumeInfo.linkedin} target='_blank' rel='noopener noreferrer' style={{ color: resumeInfo?.themeColor }}>
              <FaLinkedin size={16} />
            </a>
          )}
        </div>
      </div>
      
      <hr
        className='border-[1.5px] my-2'
        style={{ borderColor: resumeInfo?.themeColor }}
      />
    </div>
  );
}

export default PersonalDetailPreview;
