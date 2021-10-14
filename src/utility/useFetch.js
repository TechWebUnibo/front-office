import { useState, useEffect } from 'react';

//method: the http method, url: the url of the api, requestBody: the body of the request IN JSON
const useFetch = (method, url, requestBody) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const abortCont = new window.AbortController();

    const requestOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
      signal: abortCont.signal
    };

    setTimeout(() => {
      fetch(url, requestOptions)
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      })
    }, 5000);

    // abort the fetch
    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch;