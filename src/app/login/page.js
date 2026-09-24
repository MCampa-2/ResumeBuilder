"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation'
import {  toast } from 'react-toastify';


export default function Login(){

    const [inputs,setInputs] = useState({
        email: "",
        password: ""
    });

    const [submitting, setSubmitting] = useState(false);


    const router = useRouter();

    const goToDash = () =>{
        router.push("/dashboard")
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (e) =>{
        try{
            setSubmitting(true);
            e.preventDefault();
            const response = await axios.post("/api/auth/login", inputs,{
                headers:{
                    "Content-Type": "application/json"
                }
            });

            if(response.status === 200){
                console.log(response.data.message)
             
                localStorage.setItem("token", response.data.token)
                toast.success("Login successful! Redirecting to dashboard...")
                setTimeout(goToDash, 2000)
                setSubmitting(false);
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
            <h1 className="text-shadowGrey text-xl lg:text-2xl text-center">Log in to your account</h1>
            <p className="text-center text-md"><i>Continue building your resume with AI</i></p>

            <label className="text-shadowGrey" htmlFor="email">Email</label>
            <input className="border border-shadowGrey rounded-lg p-2 mb-2" type="email" id="email" name="email" value={inputs.email} onChange={handleChange} required></input>

            <label className="text-shadowGrey" htmlFor="password">Password</label>
            <input className="border border-shadowGrey rounded-lg p-2 mb-2" type="password" id="password" name="password" value={inputs.password} onChange={handleChange} required></input>

            <button className="border border-shadowGrey rounded-lg p-2 mb-2 bg-steelBlue text-white hover:bg-vintageGrape" type="submit">{submitting ? "Submitting...": "Login"}</button>
            <Link href="/register" className="text-steelBlue hover:text-lavenderGrey">Need to register?</Link>
        </form>
        </div>
    )
}