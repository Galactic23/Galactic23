import React from 'react';
import { Flex, Box, Grid, Text, Image, IconButton, Tooltip } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Sparkle, DotIcon } from 'lucide-react';

const OSTAlbumSlider = ({ ostAlbums }) => {
  const scrollContainerRef = React.useRef(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Adjust the scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Adjust the scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  return (
    
    <div className="flex flex-col gap-4 rounded-lg bg-gray-100 h-auto overflow-x-auto">
      <div className='flex ml-[2.5%] justify-left'>
        <Sparkle size={'35px'} color='blue'/>
        <h2 className='px-4 font-mono font-semibold text-[25px]'>Recent OST Album Releases</h2>
      </div>
      <div className="flex flex-row gap-4 items-center rounded-lg bg-gray-200 h-auto relative" >
        <button
          className="ml-2 p-2 rounded-full hover:bg-gray-200"
          onClick={handleScrollLeft}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="flex overflow-x-auto whitespace-nowrap space-x-4 my-4 rounded-lg" ref={scrollContainerRef}>
          {ostAlbums.map((ostAlbum) => (
            <div
              key={ostAlbum.id}
              className="flex flex-col bg-gray-100 p-4 rounded-md truncate border border-gray-300 shadow-lg"
              style={{ minWidth: '225px' }}
            >
              <div className="w-48 h-48 rounded-lg flex items-center justify-center mx-auto">
                <img src={ostAlbum.cover} alt="Album Cover" className="rounded-lg" />
              </div>
              <div className="text-center justify-center items-center">
                <div className="w-full overflow-hidden text-black text-lg font-mono font-semibold">
                  {ostAlbum.name}
                </div>
                <div className="w-full overflow-hidden text-gray-500 text-base font-serif font-normal">{ostAlbum.artist}</div>
                <div className='flex flex-row justify-center'> 
                  <div className="text-gray-500 font-serif text-sm font-normal flex flex-row items-center">{ostAlbum.genre} <DotIcon /> {ostAlbum.release}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mr-2 p-2 rounded-full hover:bg-gray-200"
          onClick={handleScrollRight}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default OSTAlbumSlider;
