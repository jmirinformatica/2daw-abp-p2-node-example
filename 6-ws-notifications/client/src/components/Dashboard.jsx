import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';

export default function Dashboard() {
    const { user, askForTime, setAskForTime, notifications } = useContext(UserContext);
    const [horaDelServidor, setHoraDelServidor] = useState("");
    
    function actualitzaHoraDelServidor() {
        fetch('http://localhost:3000/time')
        .then(response => response.json())
        .then(data => setHoraDelServidor(data.time))
        .catch(error => console.error('Error fetching server time:', error));
    };

    useEffect(() => {
        actualitzaHoraDelServidor();
    }, []);

    useEffect(() => {
        if(askForTime) {
            actualitzaHoraDelServidor();
            setAskForTime(false);
        }
    }, [askForTime]);

    function cridaAlServidor() {
        fetch('http://localhost:3000/update_time_for_everybody', {
            method: 'POST',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => console.error('Error notifying server:', error));
    };

    return (
        <div>
            <h1>Hola {user}!</h1>
            <button onClick={cridaAlServidor}>Actualitza l'hora del servidor a tots els clients</button>
            <p>This is a protected area of the application.</p>
            <p>Hora del servidor: {horaDelServidor}</p>
            <h2>Notifications:</h2>
            <ul>
                {notifications.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </div>
    );
}
