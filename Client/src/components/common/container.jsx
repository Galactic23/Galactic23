import React from 'react';
import Navbar from './Navbar.jsx'
import { useColorModeValue } from '@chakra-ui/react';

const Container = (props) => {
  const bg = 'bg-white dark:gray.800';
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="bg-yellow-300 flex justify-center pl-0 lg:pl-6">
        <div className="w-full min-h-screen mt-16 lg:mt-0 justify-center max-w-7xl mx-auto">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Container;