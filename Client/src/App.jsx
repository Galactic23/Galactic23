import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './vite.svg';
import HomePage from './pages/HomePage';
import NavBar from './components/common/Navbar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';



function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Flex ml={{ base: '0rem', lg: '8rem' }}
      mt={{ base: '4rem', lg: '0rem' }}
      justifyContent={"center"}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage />
            }
          />

        </Routes>
      </Flex>
    </BrowserRouter>
  )
};

export default App
