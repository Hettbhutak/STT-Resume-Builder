import React from 'react';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function isFutureDate(dateString) {
  const now = new Date();
  const givenDate = new Date(dateString);
  return givenDate > now;
}

function Experience({ resumeInfo }) {
  return (
    <div className='my-3'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2
            className='text-sm font-bold'
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>

          <h2 className='text-xs flex justify-between flex-wrap gap-1'>
            <span>
              {experience?.companyName}, {experience?.city}, {experience?.state}
            </span>
            <span>
              {formatDate(experience?.startDate)} To{' '}
              {experience?.currentlyWorking || isFutureDate(experience?.endDate)
                ? 'Present'
                : formatDate(experience?.endDate)}
            </span>
          </h2>

          <div
            className='text-xs my-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1'
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
          />
        </div>
      ))}
    </div>
  );
}

export default Experience;
