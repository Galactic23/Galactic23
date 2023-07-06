import { useEffect, useState } from 'react';

function useFetchNewAlbums() {
    const [albums, setAlbums] = useState([{}]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch('http://localhost:3000/api/recent_albums')
        .then(response => response.json())
        .then(data => {
          setAlbums(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }, []);
  
    return { albums, error, loading };
}
  
export default useFetchNewAlbums;