import React from 'react';
import { Flex, Box, Grid, Text, Image, IconButton, Tooltip } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const AlbumSlider = ({ albums }) => {
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
    <div className="flex flex-row gap-4 items-center bg-blue-400 h-auto">
      <button
        className="p-2 rounded-full hover:bg-gray-200"
        onClick={handleScrollLeft}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <div className="flex overflow-x-auto whitespace-nowrap space-x-4 mt-4 mb-4" ref={scrollContainerRef}>
        {albums.map((album) => (
          <div
            key={album.id}
            className="flex flex-col bg-red-500 p-4 rounded-md shadow-md truncate"
            style={{ minWidth: '250px' }}
          >
            <div className="w-48 h-48 rounded-lg flex items-center justify-center mx-auto">
              <img src={album.cover} alt="Album Cover" className="rounded-lg" />
            </div>
            <div className="text-center">
              <div className="w-full overflow-hidden text-black text-lg font-semibold">
                {album.name}
              </div>
              <div className="w-full overflow-hidden text-black text-sm">{album.artist}</div>
              <div className="text-black">{album.genre}</div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="p-2 rounded-full hover:bg-gray-200"
        onClick={handleScrollRight}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AlbumSlider;
