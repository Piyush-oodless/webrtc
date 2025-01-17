import React, { useState,useCallback, useEffect } from 'react';
import { useSocket } from '../ContextProvider/SocketProvier';
import { data } from 'react-router-dom';

const LobbyScreen = () => {
    const [email,setEmail] = useState('')
    const [code,setCode] = useState('')

    const socket = useSocket();

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit('room:join',{ email,code })

    },[email,code,socket]);

    useEffect(() => {
        socket.on('room:join',data => {console.log(`Data from BE ${data}`)})
    },[socket])

    return (
        <div>
            <h1>Lobby Screen</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' value={email} onChange={e => setEmail(e.target.value)} />
                <br/>
                <label htmlFor='code'>Room Code</label>
                <input type='text' id='code' value={code} onChange={e => setCode(e.target.value)}/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default LobbyScreen;