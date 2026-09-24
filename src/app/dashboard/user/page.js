"use client";
import { useEffect, useState } from "react";
import { PiStarFourFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function PersonalInfo(){

    
    const router = useRouter();

    // POST Request

    const nextForm = () =>{
        router.push("/dashboard/experience")
    }

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [data, setData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        linkedin: "",
        title: "",
        summary: ""
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData((values) =>({...values, [name]: value}));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            setSubmitting(true);
            const method = hasData ? "patch": "post";

            const response = await axios[method]("http://localhost:3000/api/profile/personalInfo", data ,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },  
            });
            
           if(response.status === 201){
            const toastMessage = response.data.message;
            toast.success(toastMessage);
            setTimeout(nextForm, 2000);
           }
           if(response.status === 200){
            const toastMessage = response.data.message;
            toast.success(toastMessage);
            setTimeout(() => router.push("/dashboard/experience"), 2000);
           }

        }catch(error){
            if(error.response){
                let errorMessage = error?.response?.data?.message || "Oops Something went wrong";
                toast.error(errorMessage);
            }
        }finally{
            setSubmitting(false);
        }
    }

    // GET Request

    const [hasData, setHasData] = useState(false);


    useEffect((e) =>{
        const getPersonalInfo = async () =>{
            try{
                const response = await axios.get("http://localhost:3000/api/profile/personalInfo",{
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });


                if(response.status === 200){
                    setLoading(false);
                    setHasData(true);
                    setData(response.data.data)
                }


            }catch(error){
               if(error.response?.status === 500){
                toast.error(error.response?.data.message)
               }
            }finally{
                setLoading(false);
            }
        }

        getPersonalInfo();

    },[])


    if(loading){
        return(
            <div className="text-shadowGrey text-2xl m-5 text-left">
                <h1>Loading...</h1>
            </div>
        )
    }

    return(
        <div  className="bg-shadowGrey rounded-lg m-5 shadow-sm shadow-shadowGrey text-white min-h-full p-5 flex flex-col">
                
                <div className="flex">
                    <FaUserCircle className="bg-white shrink-0 rounded-full text-shadowGrey mr-5 text-3xl md:text-5xl"/>
                    <div className="w-full">
                        <h1 className="text-xl md:text-3xl text-white">Personal Info</h1>
                        <div className="flex items-center justify-evenly">
                            <hr className="border border-lavenderGrey w-full"></hr>
                            <PiStarFourFill className="text-2xl text-lavenderGrey m-2"></PiStarFourFill>
                            <hr className="border border-lavenderGrey w-full"></hr>
                        </div>
                        <p className="text-xs md:text-sm"><i>Tell us about yourself. This information will appear on you resume.</i></p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 m-2 md:m-5 gap-2 md:gap-4">
                   <div className="flex flex-col">
                        <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="fname">First Name</label>
                        <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="fname" name="fname" value={data.fname} required placeholder="Enter your first name" autoComplete="first-name"></input>
                   </div>
                    <div className="flex flex-col">
                        <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="lname">Last Name</label>
                        <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="lname" name="lname" value={data.lname} required placeholder="Enter your last name" autoComplete="last-name"></input>
                   </div>
                   <div className="flex flex-col">
                        <label className="text-lavenderGrey text-md  md:text-lg mb-2" htmlFor="email">Email Address</label>
                        <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="email" name="email" value={data.email} required placeholder="Enter your email address" autoComplete="email-address"></input>
                   </div>
                     <div className="flex flex-col">
                        <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="phone">Phone Number</label>
                        <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="phone" name="phone" value={data.phone} required placeholder="Enter your phone number" autoComplete="phone-number"></input>
                   </div>
                   
                   <fieldset className="flex flex-col lg:flex-row mt-2 gap-2 md:gap-4 justify-between col-span-1 md:col-span-2 ">
                        <legend className="text-lavenderGrey text-md md:text-lg mb-2">Location</legend>
                            
                            <div className="flex flex-col w-full">
                                <label className="text-lavenderGrey text-sm md:text-md mb-2" htmlFor="city">City</label>
                                <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="city" name="city" value={data.city} required placeholder="Enter your city" autoComplete="city"></input>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-lavenderGrey text-sm md:text-md mb-2" htmlFor="state">State</label>
                                <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="state" name="state" value={data.state} required placeholder="Enter your state" autoComplete="state"></input>
                            </div>
                               <div className="flex flex-col w-full">
                                <label className="text-lavenderGrey text-sm  md:text-md mb-2" htmlFor="country">Country</label>
                                <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="country" name="country" value={data.country} required placeholder="Enter your country" autoComplete="country"></input>
                            </div>
                   </fieldset>
                    <div className="flex flex-col">
                        <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="linkedin">Linkedin Profile</label>
                        <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="linkedin" name="linkedin" value={data.linkedin} required placeholder="Enter your linkedin profile URL" autoComplete="linkedin"></input>
                   </div>
                     <div className="flex flex-col">
                        <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="title">Current Title</label>
                        <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="title" name="title" value={data.title} required placeholder="Enter your current title" autoComplete="title"></input>
                   </div>
                   <div className="flex flex-col col-span-1 md:col-span-2">
                        <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="summary">Professional Summary</label>
                        <textarea onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="summary" name="summary" value={data.summary} required placeholder="Write a short summary about yourself..." autoComplete="summary"></textarea>
                   </div>
                   <button type="submit" className="text-white bg-steelBlue hover:bg-vintageGrape rounded-lg col-span-1 p-2" disabled={submitting}>{submitting ? hasData ? "Updating..." : "Saving...": hasData ? "Update Changes" : "Save and Continue"}</button>
                </form>
        </div>
    )
};