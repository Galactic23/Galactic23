import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import theme from './theme.js';
import { ThemeProvider, CSSReset, ColorModeScript } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx';

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Routes>
            <Route 
              path="/"
              element={
                <HomePage />
              }
            />


          </Routes>
      </ChakraProvider>
    </ThemeProvider>
  </BrowserRouter>
);
