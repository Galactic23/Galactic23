import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='flex flex-col bg-white-100 px-4'>
            <div className="bg-white-200 flex p-4">
                <Link to="/" className="hover:no-underline">
                    <div className="flex h-4.5rem w-11.5rem rounded bg-white items-center justify-center">
                        <img
                            src="src/assets/finger-heart.png"
                            alt="Logo"
                            className="w-16 h-16"
                        />
                        <h1 className="font-extrabold text-4xl text-purple-400 pr-2">Myuzige</h1>
                    </div>
                </Link>
            </div>
        </div>
    )
};

export default NavBar