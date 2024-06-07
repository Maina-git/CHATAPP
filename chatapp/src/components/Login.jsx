import React from 'react'
import { FcGoogle } from "react-icons/fc";
import "./Login.css"
import { auth, provider } from '../Firebase';
import { signInWithPopup } from 'firebase/auth';
import Cookies from "universal-cookie"


export const cookies=new Cookies();

function Login(){
  
const login = async()=>{
try{
 const result=await signInWithPopup(auth, provider);
 cookies.set("auth-token", result.user.refreshToken);
 window.location.pathname="App.js"
} catch(err){
  console.log(err);
}
}
  return (
    <div className="login">
      <p>Sign In With Google To Continue</p>
      <button onClick={login}>
        <FcGoogle className="icon"/>
        Sign in With Google
      </button>
    </div>
  )
}
export default Login;
