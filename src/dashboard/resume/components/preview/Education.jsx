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

function Education({ resumeInfo }) {
  return (
    <div className='my-3'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.education.map((education, index) => (
        <div key={index} className='my-5'>
          <h2
            className='text-sm font-bold'
            style={{ color: resumeInfo?.themeColor }}
          >
            {education.universityName}
          </h2>

          <h2 className='text-xs flex justify-between flex-wrap gap-1'>
            <span>
              {education?.degree} in {education?.major}
            </span>
            <span>
              {formatDate(education?.startDate)} -{' '}
              {isFutureDate(education?.endDate)
                ? 'Present'
                : formatDate(education?.endDate)}
            </span>
          </h2>

          <p className='text-xs my-2'>{education?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Education;
