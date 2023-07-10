import React from 'react';
import useFetchNewAlbums from '../../hooks/useNewAlbums';
import useFetchNewSongs from '../../hooks/useNewSongs';
import useFetchNewAlbumsOST from '../../hooks/useNewAlbumsOST';
import AlbumSlider from '../components/Home/albumSlider';
import SongSlider from '../components/Home/songSlider';
import OSTAlbumSlider from '../components/Home/ostAlbumSlider';

const HomePage = () => {
    const { albums, errorAlbum, loadingAlbum} = useFetchNewAlbums();
    const { ostAlbums, errorAlbumOST, loadingAlbumOST } = useFetchNewAlbumsOST();
    const { songs, errorSong, loadingSong } = useFetchNewSongs();

    if (loadingSong || loadingAlbum || loadingAlbumOST) {
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
            <div className='flex flex-col lg:min-h-screen justify-center px-[2%] gap-y-14'> 
                <div className='flex flex-row justify-center min-h-[20rem] py-5'>
                    
                </div>
                <div className="grid grid-rows-auto gap-10 justfiy-end lg:min-h-[50rem]" style={{ marginTop: '-3rem' }}>
                    <AlbumSlider albums={albums} />
                    {/* <OSTAlbumSlider ostAlbums={ostAlbums} /> */}
                    <SongSlider songs={songs} />
                </div>
            </div>
        </>
    );
};

export default HomePage