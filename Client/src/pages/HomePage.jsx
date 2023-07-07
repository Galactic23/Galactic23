import React from 'react';
import useFetchNewAlbums from '../../APIs/useNewAlbums';
import useFetchNewSongs from '../../APIs/useNewSongs';
import AlbumSlider from '../components/Home/albumSlider';
import SongSlider from '../components/Home/songSlider';

const HomePage = () => {
    const { albums, errorAlbum, loadingAlbum} = useFetchNewAlbums();
    const { songs, errorSong, loadingSong } = useFetchNewSongs();

    if (loadingSong) {
        return <div>Loading...</div>
    }
    if (loadingAlbum) {
        return <div>Loading...</div>;
    }
    if (errorSong) {
        return <div> Error: {errorSong.message} </div>
    }
    if (errorAlbum) {
        return <div> Error: {errorAlbum.message} </div>;
    }

    return (
        <>
            <div className='flex flex-row justify-center lg:max-w-full h-[40%]'>
                
            </div>
            <div className="grid grid-rows-auto px-[1%] gap-10" style={{ marginTop: '-3rem' }}>
                <AlbumSlider albums={albums} />
                <SongSlider songs={songs} />
            </div>
        </>
    );
};

export default HomePage