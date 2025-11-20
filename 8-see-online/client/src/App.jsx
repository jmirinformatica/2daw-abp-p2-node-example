import React, { useEffect, useState } from "react";

const App = () => {
  const [tmpName, setTmpName] = useState("");
  const [name, setName] = useState("");
  const [missatges, setMissatges] = useState([]);

  useEffect(() => {
    if (!name) return;

    // opening a connection to the server to begin receiving events from it
    const event_source = new EventSource(`http://localhost:3000/see/${name}`);
    
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
  }, [name]);

  return (
    <div>
      <h1>Identifica't</h1>
      <input
        type="text"
        value={tmpName}
        placeholder="Introdueix el teu nom"
        onChange={(e) => setTmpName(e.target.value)}
      />
      <button onClick={() => setName(tmpName)}>Connecta</button>
      <h2>Events rebuts:</h2>
      <ul>
        {missatges.slice().reverse().map((m, index) => (
          <li key={index}>{JSON.stringify(m)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;