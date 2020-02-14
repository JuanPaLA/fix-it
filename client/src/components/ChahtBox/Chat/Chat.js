import React, {useState, useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import jwt from 'jwt-decode' // import dependency

let socket; 

const Chat = () => {
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const ENDPOINT = 'localhost:5000';

    //THIS IS EXECUTEN ON MOUNTING
    useEffect(()=>{
        //Retrieve user data identification
        const token = localStorage.getItem('jwtToken');
        const user = jwt(token)
        const id = user.id;
        const email = user.email;
        console.log(id)
        
        socket = io(ENDPOINT);
        
        setEmail(email);
        setId(id);

        //EMITING THROUGH SOCKET TO SERVER FROM CLIENT
        socket.emit('user', {email, id})

        //DISCONNECT SOCKET AT THE UNMOUNTING OF THE COMPONENT 
        //THAT HAPPENS WITH THIS RETURN OF THE USEEFFECT
        return () => {
            socket.emit('disconnect')
            socket.off();
        }
    }, [ENDPOINT, email, id]);
    


    return(
        <div>
        <h1>Chat</h1>
        <div>

        </div>
        </div>
    )
}

export default Chat;