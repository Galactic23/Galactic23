import React from 'react';
import NavBar from './Navbar.jsx'

const Container = (props) => {
  const bg = 'bg-white dark:gray.800';
  return (
    <>
      <header className='w-full bg-white h-24 fixed bottom-0 top-0 left-0'>
        <NavBar />
      </header>
      <div className="bg-gray-100 w-screen justify-center overflow-y-auto">
        <div className="flex-1 w-full min-h-screen lg:mt-0 justify-center max-w-8xl">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Container;