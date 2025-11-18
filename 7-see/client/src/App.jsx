import React, { useEffect, useState } from "react";

const App = () => {
  const [missatges, setMissatges] = useState([]);

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const event_source = new EventSource("http://localhost:3000/events");
    
    // attaching a handler to receive message events
    event_source.onmessage = (event) => {
      const missatge = JSON.parse(event.data);
      setMissatges((prevMissatges) => [...prevMissatges, missatge]);
    };

    // Log connection error
    event_source.onerror = function(event) {
        console.log('Error occurred:', event);
    };
    
    // terminating the connection on component unmount
    return () => event_source.close();
  }, []);

  return (
    <div>
      <h1>Missatges del servidor</h1>
      <ul>
        {missatges.slice().reverse().map((m, index) => (
          <li key={index}>{m.msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;