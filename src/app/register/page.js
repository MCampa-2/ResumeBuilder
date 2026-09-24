"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation'
import {  toast } from 'react-toastify';


export default function Register(){

    const router = useRouter();

    const goToLogIn = () =>{
        router.push("/login")
    }

    const [inputs, setInputs] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
     });

    

     const handleChange = (e) =>{
        const {name, value} = e.target;
        setInputs(values =>({...values, [name]: value}));
        console.log(inputs)
     }

     const handleSubmit = async (e) =>{
        try{
            e.preventDefault();
            const response = await axios.post("/api/auth/register", inputs,{
                headers:{
                    "Content-Type": "application/json"
                }
            });
            if(response.status === 201){
               toast.success("Your account has been created!")
               setTimeout(goToLogIn, 2000);
                
            }
            

        }catch(error){
            toast.error(error.response?.data?.message || "Something went wrong")
        }
     }




    return(
        <div>
        <nav className="navbar">
            <Link href="/" className="flex flex-col md:flex-row">
                <p className="text-2xl logo">AI Resume Builder</p>
            </Link>
        </nav>
        <form className="flex flex-col border-2 rounded-lg border-shadowGrey p-10 m-auto mt-20 w-3/4 md:w-1/2" onSubmit={handleSubmit}>
            <h1 className="text-shadowGrey text-xl lg:text-2xl text-center">Create your account to get started</h1>
            <p className="text-center text-md"><i>“Start building your resume with AI in minutes.”</i></p>

            <label htmlFor="fname" className="text-shadowGrey">First Name</label>
            <input className="border border-shadowGrey rounded-lg p-2 mb-2"  type="text" id="fname" name="fname" value={inputs.fname} required onChange={handleChange}></input>

            <label htmlFor="lname"className="text-shadowGrey">Last Name</label>
            <input className="border border-shadowGrey rounded-lg p-2 mb-2" type="text" id="lname" name="lname" value={inputs.lname} required onChange={handleChange}></input>

            <label className="text-shadowGrey" htmlFor="email">Email</label>
            <input className="border border-shadowGrey rounded-lg p-2 mb-2" type="email" id="email" name="email" value={inputs.email} required onChange={handleChange}></input>

            <label className="text-shadowGrey" htmlFor="password">Password</label>
            <input className="border border-shadowGrey rounded-lg p-2 mb-2" type="password" id="password" name="password" value={inputs.password} required onChange={handleChange}></input>

            <button className="border border-shadowGrey rounded-lg p-2 mb-2 bg-steelBlue text-white hover:bg-vintageGrape" type="submit">Create Account</button>
            <Link href="/login" className="text-steelBlue hover:text-lavenderGrey">Already signed up?</Link>
        </form>
        </div>
    )
}