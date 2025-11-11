import { useState, useEffect } from 'react'
import { UserContext } from './userContext';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [user, setUser] = useState("");
  const [askForTime, setAskForTime] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if(!user) return;
    const websocket = new WebSocket('ws://localhost:8080/');

    websocket.onopen = () => {
      console.log('WebSocket is connected');

      //l'únic missatge que s'envia és per identificar-se
      websocket.send(JSON.stringify({ user: user }));
    };

    websocket.onmessage = (evt) => {
      if(!evt.data) return;
      const message = JSON.parse(evt.data);
      console.log('WebSocket message received:', message);
      
      if(message.type === 'notification') {
        setNotifications(prevNotifications => [...prevNotifications, message.content]);
      } else if(message.type === 'update_time') {
        setAskForTime(true);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket is closed');
    };

    return () => {
      websocket.close();
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, askForTime, setAskForTime, notifications }}>    
      {user ? <Dashboard /> : <Login />}
    </UserContext.Provider>
  );
}

export default App
