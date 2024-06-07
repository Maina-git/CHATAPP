import React, { useEffect, useState } from 'react'
import { addDoc, orderBy, query } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { db } from '../../Firebase';
import { auth } from '../../Firebase';
import { onSnapshot } from 'firebase/firestore';
import "./Chat.css"
import { IoSend } from "react-icons/io5";
import { signOut } from 'firebase/auth';
import { cookies } from '../Login';

const Chat = ({room, setIsAuth, setRoom}) => {
    const [messages, setMessages]=useState([])

const [newMessage, setNewMessage]=useState();

const messagesRef= collection(db, "messages");


useEffect(()=>{
   const queryMessages=query(messagesRef, where("room", "==", room), orderBy("createdAt"));

 const unsuscribe = onSnapshot(queryMessages, (snapshot)=>{
    let messages= [];
    snapshot.forEach((doc)=>{
messages.push({...doc.data(), id: doc.id});
    });
setMessages(messages);
});
return ()=>unsuscribe();
}, [])


const handleSubmit = async(e)=>{
e.preventDefault();
if(newMessage=="") return;

await addDoc(messagesRef, {
    text: newMessage,
    createdAt:serverTimestamp(),
    user:auth.currentUser.displayName,
    room:room,

});
setNewMessage("");
}

const signUserOut = async()=>{
  await signOut( auth);
  cookies.remove("auth-token");
  setIsAuth(false);
  setRoom= null;
  window.pathname.location="Login.jsx"
}

  return (
    <div className="chat">
<div className="header">
    <h1>WELCOME TO {room.toUpperCase()}</h1>
    <button id="btn" onClick={signUserOut}>SIGN OUT</button>
</div>
      <div className="messages">
        {messages.map((message)=>(
      <div className="message" key={message.id}>
      <span className="user">{message.user}:</span>
      {message.text}
      </div>))}
      </div>
<form onSubmit={handleSubmit}
 className="new-message-form">
<input placeholder="Type your message Here"
onChange={(e)=>setNewMessage(e.target.value)}
className="new-message-input" 
value={newMessage}/>
<button type="submit" className="Send-button">
    <IoSend/>
</button>
</form>
    </div>
  )
}

export default Chat;
