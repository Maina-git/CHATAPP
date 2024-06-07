import React from 'react'
import "./App.css"
import { useRef } from 'react'
import Login from './components/Login'
import { useState } from 'react'
import { cookies } from './components/Login'
import Chat from './components/chat/Chat'

function App() {
const [isAuth, setIsAuth]=useState(cookies.get("auth-token"));
const [room, setRoom]=useState("");
const roomRef=useRef(null);

if(isAuth){
  return (
    <div>
      {
        room 
        ? 
        <div>
          <Chat room={room} setIsAuth={setIsAuth} setRoom={setRoom}/>
        </div>
        :
        <div className='room'>
          <nav>
          <label>Enter Room Name:</label>
          <input ref={roomRef}/>
          <button onClick={()=>setRoom(roomRef.current.value)} className="btn">Enter Chat</button>
          </nav>
        </div>
      }
    </div>
  )
}
return(
  <div>
   <Login/>
  </div>
)
}
export default App;
