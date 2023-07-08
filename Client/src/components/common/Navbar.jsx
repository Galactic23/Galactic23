import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Music4Icon, BookMarked, Disc3Icon } from 'lucide-react';

const NavBar = () => {
    return (
        <>
            <div className='flex flex-col'>
                <div className="bg-white-200 flex p-4"> {/*Header*/}
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
                <div className='flex flex-col min-h-[32rem]'> {/*MENU*/}
                    <h1 className='mb-4 text-gray-500 font-medium text-xl'>Menu</h1>
                    <div className='grid grid-rows-auto gap-y-5 px-2 text-gray-600 font-medium text-lg'>
                        <Link href="/" className='py-2'>
                            <div className='flex flex-row'>
                                <Home className=''  />
                                <text className='px-4'>Home</text>
                            </div>
                        </Link>
                        <Link href='/albums' className='py-2'>
                            <div className='flex flex-row'>
                                <BookMarked />
                                <text className='px-4'>Albums</text>
                            </div>
                        </Link>
                        <Link href='/OSTs' className='py-2'>
                            <div className='flex flex-row'>
                                <Disc3Icon />
                                <text className='px-4'>OSTs</text>
                            </div>
                        </Link>
                        <Link href='/songs' className='py-2'>
                            <div className='flex flex-row'>
                                <Music4Icon />
                                <text className='px-4'>Songs</text>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col min-h-[12rem] justify-end align-bottom'> {/*ACCOUNT*/}
                    <h1>Account </h1>
                </div>
            </div>
        </>
    )
};

export default NavBar