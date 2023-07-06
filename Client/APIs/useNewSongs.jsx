import { useEffect, useState } from 'react'

function useFetchNewSongs() {
    const [songs, setSongs] = useState([{}]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch(`http://localhost:3000/api/recent_songs`)
        .then(response => response.json())
        .then(data => {
          setSongs(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }, []);
  
    return { songs, error, loading };
}
  
export default useFetchNewSongs;