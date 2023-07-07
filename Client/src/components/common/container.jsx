import React from 'react';
import NavBar from './Navbar.jsx'

const Container = (props) => {
  const bg = 'bg-white dark:gray.800';
  return (
    <>
      <div className='flex bg-white-100 '>
        <header className='w-[18rem] min-h-screen border border-gray-300'>
          <NavBar />
        </header>
        <div className="bg-gray-200 w-screen flex justify-center pl-0">
          <div className="w-full min-h-screen lg:mt-0 justify-center max-w-8xl mx-auto">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;