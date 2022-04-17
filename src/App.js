import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ facts, setFacts ] = useState([]);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:3001/events');

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData)
        setFacts((facts) => facts.push(parsedData));
      };

      setListening(true);
    }
  }, [listening, facts]);

  return (
    <div >
      <h1>Welcome</h1>
      <ul>
        {facts.map((item,index)=><li  key={index}>
          {item}
        </li>)}
      </ul>

    </div>
  );
}

export default App;