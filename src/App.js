import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ isBanner, setIsBanner ] = useState(true);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:3001/events');
      events.withCredentials()
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setIsBanner(parsedData=="true")
      };

      setListening(true);
    }
  }, []);


  return (
    <div >
      {isBanner?<h2>Banner</h2>:<h2>No Banner</h2>}

    </div>
  );
}

export default App;