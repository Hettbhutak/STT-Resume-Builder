import React from 'react'
import { ExternalLink } from 'lucide-react' // Importing link icon

function Certificates({ resumeInfo }) {
  return (
    <div className='my-3'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor
        }}
      >
        Certificates
      </h2>
      <hr style={{
        borderColor: resumeInfo?.themeColor
      }} />

      <div className='grid grid-cols-1 gap-2 my-4'>
        {resumeInfo?.certifications?.map((cert, index) => (
          <>
          <p key={index} className='text-xs flex items-center gap-2'>
            {index + 1}. <span className='font-bold'>{cert.name}</span> - {cert.issuer} - {cert.year}
            
            {cert.link && (
              <a
                href={cert.link.startsWith("http") ? cert.link : `https://${cert.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </p>
          </>
        ))}
      </div>
    </div>
  )
}

export default Certificates
