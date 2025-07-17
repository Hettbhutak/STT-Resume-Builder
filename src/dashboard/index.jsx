import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi';
import AddResume from './components/AddResume';
import ResumeCardItem from './components/ResumeCardItem';
import { FiFileText } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';

const Dashboard=()=> {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  const GetResumesList = () => {
    setLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(res => {
        setResumeList(res.data.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className='p-10 md:px-20 lg:px-32 min-h-screen bg-gray-100 dark:bg-gray-900'>
      <h2 className='font-bold text-4xl text-gray-900 dark:text-white flex items-center gap-3'>
        <FiFileText className='text-blue-500' size={40} /> My Resumes
      </h2>
      <p className='text-gray-600 dark:text-gray-300 mt-2'>
        Start creating ATS-friendly AI resumes to land your next job.
      </p>

      {loading ? (
        <div className='flex justify-center items-center mt-20'>
          <ClipLoader size={50} color={'#3b82f6'} />
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-6'>
          <AddResume />
          {resumeList.length > 0 ? (
            resumeList.map((resume, index) => (
              <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
            ))
          ) : (
            <p className='text-gray-500 dark:text-gray-400 col-span-full text-center mt-10'>
              No resumes found. Click "Add Resume" to create one.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;