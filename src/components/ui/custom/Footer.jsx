const Footer = () => {
    return (
      <footer className="bg-black dark:bg-black text-white dark:text-white py-6 ">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center px-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Resume-Bilder. All rights reserved.</p>
          
          {/* <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-500">Privacy Policy</a>
            <a href="#" className="hover:text-blue-500">Terms & Conditions</a>
            <a href="#" className="hover:text-blue-500">Contact Us</a>
          </div> */}
        </div>
      </footer>
    );
  };
  
  export default Footer;
  