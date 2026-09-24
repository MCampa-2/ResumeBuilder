"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { PiStarFourFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function Experience(){

    const router = useRouter();

    const [inputs, setInputs] = useState({
        company: "",
        title: "",
        startDate: "",
        endDate: "",
        current: false,
        description: ""
    });

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [currentRole, setCurrentRole] = useState(false);

    const [experienceInfo, setExperienceInfo] = useState([]);

    const [editForm, setEditForm] = useState()
 
    const getSelectedExperience = async (ex) =>{

     const sDate = new Date(ex.startDate);
     const sNewDate = sDate.toISOString().split("T")[0];

     const eDate = new Date(ex.endDate);
     const eNewDate = eDate.toISOString().split("T")[0];

        setEditForm(ex);
        setInputs({
            company: ex.company || "",
            title: ex.title || "",
            startDate: sNewDate || "",
            endDate: eNewDate || "",
            current: ex.current || false,
            description: ex.description || ""
        })
       
    }

    const handleChange = (e) =>{
        const {name, value, type, checked} = e.target;
        setInputs((values) => ({...values, [name]: type === "checkbox" ? checked : value}));
        if(checked){
            setCurrentRole(true);
           inputs.endDate = ""
        }
        if(!checked){
            setCurrentRole(false);
        }
        
    }


    const nextPage = () =>{
        setSubmitting(true);
        setTimeout(() => router.push("/dashboard/education"), 2000)
    }

    useEffect(() =>{
        const experienceData = async () =>{
            try{
             
                const response = await axios.get("/api/profile/experience",{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if(response.status === 200){
                setExperienceInfo(response.data.data);
                setLoading(false);
                
            }
            }catch(error){
                console.log(error.response?.message)
                
            }
        }
        experienceData();

    },[]);


    const handleSubmit = async (e) =>{
        e.preventDefault();
       
        try{
 
            let res;

            if(editForm){
                 res = await axios.patch(`/api/profile/experience/${editForm._id}`, inputs,{
                    headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
                });

                

                if(res.status === 200){
                setExperienceInfo((x) =>{
                  return x.map((i) => {
                    if(i._id === res.data.updatedExperience._id){
                        return res.data.updatedExperience
                    }
                    return x;
                  })                
                })

                toast.success(res.data.message);
               
                setInputs({
                    company: "",
                    title: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: ""
                });
                

            }

            }else{
                res = await axios.post("/api/profile/experience", inputs,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

              if(res.status === 201){
                setExperienceInfo((prev) =>[...prev, res.data.data])
                toast.success(res.data.message);
               
                setInputs({
                    company: "",
                    title: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: ""
                });
                 
            } 
            }
        }catch(error){
            toast.error(error?.response?.data?.message)
            
        }finally{
            
        }
    }

    const deleteExperience = async (id) =>{
        try{
            const response = await axios.delete(`/api/profile/experience/${id}`,{
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

       

        if(response.status === 200){
            toast.success(response.data.message)
            const removeEx = experienceInfo.filter((x) => {
                return x._id !== id
            });
            setExperienceInfo(removeEx);
            
        }

        }catch(error){
            if(error.response){
                toast.error(error.response?.data?.message || "Oop something went wrong")
            }
        }
    }


    const convertDate = (param) =>{
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let d = new Date(param);
        let month = months[d.getMonth()];
        let  year = d.getFullYear();
        return month + ", " + year;
    }
   
       return(
           <div  className="bg-shadowGrey rounded-lg m-5 shadow-sm shadow-shadowGrey text-white min-h-full p-5 flex flex-col">
                   <div className="flex">
                       <FaUserCircle className="bg-white shrink-0 rounded-full text-shadowGrey mr-5 text-3xl md:text-5xl"/>
                       <div className="w-full">
                           <h1 className="text-xl md:text-3xl text-white">Experience</h1>
                           <div className="flex items-center justify-evenly">
                               <hr className="border border-lavenderGrey w-full"></hr>
                               <PiStarFourFill className="text-2xl text-lavenderGrey m-2"></PiStarFourFill>
                               <hr className="border border-lavenderGrey w-full"></hr>
                           </div>
                           <p className="text-xs md:text-sm"><i>Tell us about your work experience. Highlight your role, responsibilities, and achievements this will appear on your resume.</i></p>
                       </div>
                   </div>
   
                   <form onSubmit={handleSubmit} className="grid grid-cols-1 m-2 md:m-5 gap-2 md:gap-4">
                        <div className="flex flex-col">
                            <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="company">Company</label>
                            <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="company" name="company" value={inputs.company} required placeholder="Enter your company name" autoComplete="company"></input>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="title">Title</label>
                            <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="title" name="title" value={inputs.title} required placeholder="Enter your job title" autoComplete="job-title"></input>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="startDate">Start Date</label>
                            <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="date" id="startDate" name="startDate" value={inputs.startDate} required placeholder="Date started" autoComplete="start-date"></input>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="endDate">End Date (Optional)</label>
                            <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="date" id="endDate" name="endDate" value={inputs.endDate} placeholder="End Date" autoComplete="end-date" disabled={currentRole}></input>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-lavenderGrey text-md md:text-lg" htmlFor="current">Current Role</label>
                            <input onChange={handleChange} className="mt-1 rounded bg-vintageLavender text-shadowGrey" type="checkbox" id="current" name="current" autoComplete="current-job" checked={inputs.current}></input>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="description">Description</label>
                            <textarea onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="description" name="description" value={inputs.description} required placeholder="Describe your job..." autoComplete="description"></textarea>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button type="submit" className="text-white bg-steelBlue hover:bg-vintageGrape rounded-lg p-2">Add Experience</button>
                            <button onClick={nextPage} type="button" className="text-white bg-steelBlue hover:bg-vintageGrape rounded-lg p-2" disabled={submitting}>{submitting ? "Saving...": "Save and Continue"}</button> 
                        </div>
                   </form>
                    <div className="w-full">
                           <h2 className="text-xl md:text-2xl text-white text-center mt-5">Your Experiences</h2>
                           <div className="flex items-center justify-evenly">
                               <hr className="border border-lavenderGrey w-full"></hr>
                               <PiStarFourFill className="text-2xl text-lavenderGrey m-2"></PiStarFourFill>
                               <hr className="border border-lavenderGrey w-full"></hr>
                           </div>
                    </div>
                        <div className={`grid ${experienceInfo.length === 0? "grid-col-1": "grid-cols-2"}`}>
                        {loading ? <h2 className="text-lavenderGrey opacity-30 text-2xl text-center mt-7 md:mt-0">Loading...</h2>: experienceInfo.length === 0 ?(
                            <h2 className="text-lavenderGrey opacity-30 text-2xl text-center mt-7 md:mt-0">No Data</h2>
                         ) :experienceInfo.map((x,i) =>{
                            return(
                                <div className="bg-vintageGrape m-1 p-2 rounded-lg flex items-start" key={i}>
                                    <FaSuitcase className="text-xl md:text-2xl m-2 text-lavenderGrey" />
                                    <div className="m-1">
                                        <h3 className="text-md md:text-lg">{x.company}</h3>
                                        <p className="text-lavenderGrey text-sm md:text-md first-letter:uppercase">{x.title}</p>
                                        <div className="flex items-center gap-1">
                                            <p className="text-xs md:text-md">{convertDate(x.startDate)} -</p>
                                            <p className="text-xs md:text-md">{x.current === true? "Present": convertDate(x.endDate)}</p>
                                        </div>
                                        <p className="text-white text-xs md:text-sm">{x.description}</p>
                                    </div>
                                    <div className="flex items-center justify-center ml-auto m-2 gap-1 md:gap2">
                                        <FaEdit className="text-lavenderGrey cursor-pointer text-lg md:text-xl" onClick={() => getSelectedExperience(x)}/>
                                        <MdDelete className="text-red-950 cursor-pointer text-xl md:text-xl" onClick={() => deleteExperience(x._id)}/>
                                    </div>
                                </div>
                                
                            )
                        })}
                    </div>     
           </div>
       )
}