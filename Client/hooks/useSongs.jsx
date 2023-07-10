import { useEffect, useState } from 'react'

function useFetchSongs() {
    const [songs, setSongs] = useState([{}]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(100);
  
    useEffect(() => {
      fetch(`http://localhost:3000/api/songs?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
          setSongs(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }, [page, limit]);
  
    return { songs, error, loading, setPage, setLimit };
}
  
export default useFetchSongs;