import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Music4Icon, BookMarked, Disc3Icon, SearchIcon, UserCircle2, ToggleLeftIcon } from 'lucide-react';

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
      
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
      
    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform search logic here with the search term
        console.log('Searching for:', searchTerm);
    };

    return (
        <>  
            <div className='flex flex-row w-full border-b-2 border-gray-300 h-full justify-between'>
                <div className="bg-white-200 flex p-4 justify-center"> {/*Header*/}
                    <Link to="/" className="hover:no-underline">
                        <div className="flex h-4.5rem w-11.5rem rounded bg-white items-center justify-center">
                            <img
                                src="src/assets/finger-heart.png"
                                alt="Logo"
                                className="w-16 h-16"
                            />
                            <h1 className="font-extrabold text-4xl text-blue-700 pr-2">Myuzige</h1>
                        </div>
                    </Link>
                </div>
                <div className='flex flex-col p-4 justify-center'> {/*MENU*/}
                    <div>
                        {/*<h1 className='mb-3 text-black font-semibold text-xl px-2 font-serif'>Menu</h1>*/}
                        <div className='flex gap-x-5 text-gray-600 font-medium text-lg'>
                            <Link href="/" className='py-2 hover:bg-gray-200 rounded-lg'>
                                <div className='flex flex-row ml-2'>
                                    <Home className='my-0.5' />
                                    <text className='px-4'>Home</text>
                                </div>
                            </Link>
                            <Link href='/albums' className='py-2 hover:bg-gray-200 rounded-lg'>
                                <div className='flex flex-row ml-2'>
                                    <BookMarked className='my-0.5'/>
                                    <text className='px-4'>Albums</text>
                                </div>
                            </Link>
                            <Link href='/OSTs' className='py-2 hover:bg-gray-200 rounded-lg'>
                                <div className='flex flex-row ml-2'>
                                    <Disc3Icon className='my-0.5'/>
                                    <text className='px-4'>OSTs</text>
                                </div>
                            </Link>
                            <Link href='/songs' className='py-2 hover:bg-gray-200 rounded-lg'>
                                <div className='flex flex-row ml-2'>
                                    <Music4Icon className='my-0.5' />
                                    <text className='px-4'>Songs</text>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row p-3 justify-center'> {/*ACCOUNT*/}
                    <div className='p-4'>
                        <form onSubmit={handleSubmit} className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                            >
                                <SearchIcon />
                            </button>
                        </form>
                    </div>
                    <div className='justify-center p-4 w-full'>
                        <ToggleLeftIcon size={'40px'} />
                    </div>
                    <div className='justify-center p-4 w-full'>
                        <UserCircle2 size={'40px'} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default NavBar