import { useEffect, useContext} from "react";
import { UserContext } from '../userContext';

export default function Login(){
    const { setUser } = useContext(UserContext);
    useEffect(() => {
        const userName = prompt("Enter your name:");
        setUser(userName);
    }, []);
    return null;
}
