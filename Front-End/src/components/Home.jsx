import React from 'react';
import { motion } from 'motion/react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import.meta.env.VITE_API_URL


const Home = () => {
  const navigate = useNavigate();

  const AnimatedButton = ({ onClick, children, className }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Button onClick={onClick} className={className}>
        {children}
      </Button>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#1b1e3f]">
      <div className="flex flex-col justify-center items-center flex-grow bg-[#2a3275] text-white py-10 px-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-10">
          Made for Developers
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <AnimatedButton
            onClick={() => navigate('/signup')}
            className="
              inline-flex items-center justify-center
              px-6 py-3
              text-base sm:text-lg font-semibold
              text-white
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              hover:from-indigo-600 hover:to-pink-600
              focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700
              rounded-xl
              shadow-lg hover:shadow-xl
              transition-all duration-300 ease-in-out
              cursor-pointer
              hover:-translate-y-1 active:scale-95
            "
          >
            New User!
          </AnimatedButton>

          <AnimatedButton
            onClick={() => navigate('/login')}
            className="
              inline-flex items-center justify-center
              px-6 py-3
              text-base sm:text-lg font-semibold
              text-white
              bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700
              hover:from-blue-600 hover:to-purple-800
              focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
              rounded-xl
              shadow-lg hover:shadow-xl
              transition-all duration-300 ease-in-out
              cursor-pointer
              hover:-translate-y-1 active:scale-95
            "
          >
            Already a User? Login
          </AnimatedButton>
        </div>
      </div>

      <footer className="bg-[#1e1e2f] text-white text-center py-6">
        <p className="text-sm sm:text-base font-medium">
          Any Queries? Contact:{' '}
          <a
            href="mailto:saivishnureddybondugula@gmail.com"
            className="underline hover:text-violet-400 transition-colors"
          >
            codetrackrr@gmail.com

          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
