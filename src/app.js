import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Home from "./pages/Home"

function App() 
{
    return 
    (
        <BrowserRouter>
            <nav>
                <h1> Korean Lyric App </h1>
                <Link to="/"> Home </Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}