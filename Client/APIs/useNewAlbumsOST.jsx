import { useEffect, useState } from 'react';

function useFetchNewAlbumsOST() {
    const [albumsOST, setAlbumsOST] = useState([{}]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch('http://localhost:3000/api/recent_ost_albums')
        .then(response => response.json())
        .then(data => {
          setAlbumsOST(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }, []);
  
    return { albumsOST, error, loading };
}
  
export default useFetchNewAlbumsOST;