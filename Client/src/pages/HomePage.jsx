import React from 'react';
import useFetchNewAlbums from '../../APIs/useNewAlbums';
import useFetchNewSongs from '../../APIs/useNewSongs';
import AlbumSlider from '../components/Home/albumSlider';

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
        <AlbumSlider albums={albums} />
    );
};

export default HomePage