import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/ui/custom/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/ui/custom/Footer';

const Home = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <Header />
     

      {/* Hero Section */}
      <section className="hero text-center py-24 bg-gradient-to-r from-blue-500 to-teal-500 dark:from-blue-700 dark:to-teal-700">
        <h1 className="text-5xl font-extrabold text-white">
          Create a Standout Resume Effortlessly
        </h1>
        <p className="text-lg mt-4 text-white opacity-80">
          Impress recruiters with a professional, ATS-friendly resume in minutes.
        </p>
        <button className="bg-yellow-400 text-gray-900 text-lg px-10 py-4 rounded-full mt-6 hover:bg-yellow-500 transition-all font-semibold" onClick={()=>{navigate('/dashboard')}}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">Why Choose Our Resume Builder?</h2>
          <p className="text-lg mt-4">
            Our resume builder is designed to give you a competitive edge with AI-driven insights, ATS-friendly templates, and a seamless customization experience. Whether you are a fresher or an experienced professional, our platform ensures you create a polished and impactful resume effortlessly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            <div className="feature p-6 bg-white dark:bg-gray-700 shadow-lg rounded-xl">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">AI-Powered Assistance</h3>
              <p className="mt-4">Receive real-time suggestions and AI-driven enhancements to craft a professional and optimized resume tailored to your industry and job role.</p>
            </div>
            <div className="feature p-6 bg-white dark:bg-gray-700 shadow-lg rounded-xl">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">ATS-Optimized Templates</h3>
              <p className="mt-4">Our templates are carefully designed to pass through Applicant Tracking Systems (ATS) seamlessly, ensuring your resume reaches recruiters without formatting issues.</p>
            </div>
            <div className="feature p-6 bg-white dark:bg-gray-700 shadow-lg rounded-xl">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Seamless Editing & Customization</h3>
              <p className="mt-4">Modify, customize, and format your resume effortlessly with our intuitive drag-and-drop editor and real-time previews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq py-20 bg-gray-200 dark:bg-gray-700">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="faq-item p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Is this resume builder free?</h3>
              <p className="mt-3">You can create a basic resume for free, but premium features require a subscription.</p>
            </div>
            <div className="faq-item p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Do I need an account to use it?</h3>
              <p className="mt-3">Yes, you must sign up to create and save your resume.</p>
            </div>
            <div className="faq-item p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Can I download my resume?</h3>
              <p className="mt-3">Yes, once completed, you can download it in PDF format.</p>
            </div>
            <div className="faq-item p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Are the resumes ATS-friendly?</h3>
              <p className="mt-3">Absolutely! Our templates are designed to pass ATS scans effectively.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action (CTA) Section */}
      <section className=" bg-blue-600 dark:bg-blue-800 text-white py-10 text-center">
        <h2 className="text-4xl font-bold">Start Your Resume Today</h2>
        <p className="mt-4 text-lg opacity-80">Sign up and build a professional resume in minutes.</p>
        <button className="bg-yellow-400 text-gray-900 text-lg px-10 py-4 rounded-full mt-6 hover:bg-yellow-500 transition-all font-semibold" onClick={()=>{navigate('/dashboard')}}>
          Get Started
        </button>
      </section>

      <Footer/>
    </div>
  );
};

export default Home;