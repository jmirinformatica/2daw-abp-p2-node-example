import { useState, useEffect } from 'react'
import { UserContext } from './userContext';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [user, setUser] = useState("");
  const [askForData, setAskForData] = useState(false);

  useEffect(() => {
    if(!user) return;
    const websocket = new WebSocket('ws://localhost:8080/');

    websocket.onopen = () => {
      console.log('WebSocket is connected');

      //l'únic missatge que s'envia és per identificar-se
      websocket.send(JSON.stringify({ user: user }));
    };

    websocket.onmessage = (evt) => {
      console.log('Message received:', evt);
      setAskForData(true);
    };

    websocket.onclose = () => {
      console.log('WebSocket is closed');
    };

    return () => {
      websocket.close();
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, askForData, setAskForData }}>    
      {user ? <Dashboard /> : <Login />}
    </UserContext.Provider>
  );
}

export default App
