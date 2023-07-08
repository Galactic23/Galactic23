import React from 'react';
import NavBar from './Navbar.jsx'

const Container = (props) => {
  const bg = 'bg-white dark:gray.800';
  return (
    <>
      <div className='flex'>
        <header className='flex flex-col w-[72] bg-white-100 min-h-screen border border-gray-300 fixed left-0 px-4'>
          <NavBar />
        </header>
        <div className="bg-gray-100 w-screen justify-center ml-72 overflow-y-auto">
          <div className="flex-1 w-full min-h-screen lg:mt-0 justify-center max-w-8xl">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;