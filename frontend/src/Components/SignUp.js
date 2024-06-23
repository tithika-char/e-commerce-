import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";



const SignUp=()=>{


const[name,setName]=useState("");//empty string
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const navigate=useNavigate();


useEffect(()=>{  //KEEP CALLBACK FUNCTION AS A PARAMETER
    const auth=localStorage.getItem('user');
    if(auth)                                            
    {
navigate('/')
    }
})



const collectData= async()=>{
    console.warn(name,email,password)

    //axios can be installed and done but we are using inbuilt method..fetch method to call api

    let result=await fetch('http://localhost:5000/register',{
        method:'post',
        body: JSON.stringify({name,email,password}), //object cannot be send directly,need to be send through stringify
        headers:{
             'Content-Type':'application/json'   
              },
    })

     result=await result.json()
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result)); //user name key,result name data

            navigate('/')

        }



    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" 
            value={name}  onChange={(e)=>setName(e.target.value)}  placeholder="Enter Name"/>

            <input className="inputBox" type="text"
             value={email}  onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter Email"/>


            <input className="inputBox" type="password"
             value={password}  onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter Password"/>

           <button onClick={collectData} className="appButton" type="button">SignUp</button>
            

        </div>
    )
}
export default SignUp;