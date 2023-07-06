import HomePage from './pages/HomePage';
import NavBar from './components/common/Navbar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="ml-8 mt-4 lg:ml-0 lg:mt-0 flex justify-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
};

export default App;
