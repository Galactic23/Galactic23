import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx';
import Container from './components/common/container.jsx';
import NavBar from './components/common/Navbar.jsx';

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Container>
  </BrowserRouter>,
  container
);
