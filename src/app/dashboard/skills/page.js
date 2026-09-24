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
import { IoAddOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { GrTechnology } from "react-icons/gr";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaTools } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { RiResetLeftFill } from "react-icons/ri";

export default function Skills(){

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    
    const [submitting, setSubmitting] = useState(false);

    const [getData, setGetData] = useState() 

    const [editSection, setEditSection] = useState()

    const [editState, setEditState] = useState({
        technicalSkills: [],
        softSkills: [],
        tools: [],
        strengths: []
    });

     useEffect(() =>{
        const skills = localStorage.getItem("skills");
        if(skills){
            setEditState(JSON.parse(skills));   
        }
    }, []);
       

  
    const [inputs, setInputs] = useState({
        technicalSkills: "",
        softSkills: "",
        tools: "",
        strengths: ""
    });

   

   

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setInputs((prev) =>({...prev, [name]: value}));
    }

    const addTechSkill = () =>{
        const newSkill = inputs.technicalSkills;
        setEditState((prev) => ({...prev, technicalSkills:[...prev.technicalSkills, newSkill]}));
       
    }

    const addSoftSkill = () =>{
        const newSkill = inputs.softSkills;
        setEditState((prev) => ({...prev, softSkills:[...prev.softSkills, newSkill]}));
      
    }

    const addTools = () =>{
        const newSkill = inputs.tools;
        setEditState((prev) => ({...prev, tools:[...prev.tools, newSkill]}));
       
    }
3
    const addStrength = () => {
        const newSkill = inputs.strengths;
        setEditState((prev) => ({...prev, strengths:[...prev.strengths, newSkill]}));
      
    }


    useEffect(() =>{

        localStorage.setItem("skills", JSON.stringify(editState));

    }, [editState]);
    

    const deleteSKill = (arr,i) =>{
     
        const newArr = editState[arr].filter((x,index) => index !== i);
        setEditState((prev) => ({...prev, [arr]: newArr}));
    }
    
    const handleSubmit = async (e) =>{
        try{
            setSubmitting(true);
            e.preventDefault();

            if(getData){
                 const response = await axios.patch(`/api/profile/skills/${getData._id}`, editState,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status === 200){
                setGetData(response.data.data)
                toast.success(response.data.message);
                localStorage.removeItem("skills");
                setInputs({
                    technicalSkills: "",
                    softSkills: "",
                    tools: "",
                    strengths: ""
                });
            }
            }else{
                  const response = await axios.post("/api/profile/skills", editState,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status === 201){
                setGetData(response.data.data)
                toast.success(response.data.message);
                localStorage.removeItem("skills");
            
                setInputs({
                    technicalSkills: "",
                    softSkills: "",
                    tools: "",
                    strengths: ""
                });
            } 
            }

        }catch(error){
            if(error.response){
                toast.error(error?.response?.data?.message || "Oops something went wrong!")
            }
        }finally{
            setSubmitting(false);
        }
    }

    useEffect(() =>{
        const getSkills = async () =>{
          try{
            setLoading(true);
              const response = await axios.get("/api/profile/skills", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status === 200){
                const skillsDoc = response.data.data[0];

                if(skillsDoc){
                setEditState(skillsDoc);
                setGetData(skillsDoc);
                }
               setLoading(false);
              
            }

          }catch(error){
            if(error.response){
                console.log(error.response?.data.message)
            }
          }
            
        }

        getSkills();

    }, []);


    const editSkill = (key) =>{
       setEditSection(key);
       
    }

    const removeSkill = (index) =>{
       const newArr = editState[editSection].filter((x,i) => i !== index);
        setEditState((prev) =>({
            ...prev, [editSection]: newArr 
        }));
    }

    let reset = false;
    const resetSkills = async () =>{
       try{
        
        const response = await axios.delete(`/api/profile/skills/${getData._id}`,{
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if(response.status === 200){
            reset = false
            setGetData(null)
            setEditState({
                technicalSkills: [],
                softSkills: [],
                tools: [],
                strengths: []
            })
            setEditSection(null)
            localStorage.removeItem("skills")
            toast.success("Successfully reset skills")
        }
                
                    

       }catch(error){
        if(error.response){
            toast.error(error?.response?.data?.message || "Oops something went wrong")
        }
       }
    }

    
    const nextPage = () =>{
        
        setTimeout(() => router.push("/dashboard/certifications"), 2000)
    }

       return(
           <div  className="bg-shadowGrey rounded-lg m-5 shadow-sm shadow-shadowGrey text-white min-h-full p-5 flex flex-col">
                   
                   <div className="flex">
                       <FaUserCircle className="bg-white shrink-0 rounded-full text-shadowGrey mr-5 text-3xl md:text-5xl"/>
                       <div className="w-full">
                           <h1 className="text-xl md:text-3xl text-white">Skills</h1>
                           <div className="flex items-center justify-evenly">
                               <hr className="border border-lavenderGrey w-full"></hr>
                               <PiStarFourFill className="text-2xl text-lavenderGrey m-2"></PiStarFourFill>
                               <hr className="border border-lavenderGrey w-full"></hr>
                           </div>
                           <p className="text-xs md:text-sm"><i>Highlight the skills that make you stand out.</i></p>
                       </div>
                   </div>
   
                   <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 m-2 md:m-5 gap-2 md:gap-4">
                        <div className="flex flex-col m-2 gap-1">
                            <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="technicalSkills">Technical Skills</label>
                            <div className="flex items-center">
                                <input className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey p-1 md:p-2 h-full text-shadowGrey rounded-bl rounded-tl w-full" type="text" id="technicalSkills" name="technicalSkills" value={inputs.technicalSkills} onChange={handleChange} placeholder="Enter technical skills" autoComplete="technical-skills"></input>
                                <button type="button" onClick={addTechSkill} className="h-full rounded-br rounded-tr p-2 text-white bg-steelBlue hover:bg-vintageGrape"><IoAddOutline /></button>
                            </div>
                            
                            <div className="grid grid-cols-2">
                                {editState.technicalSkills.map((x,i) =>{
                                    return(
                                        <div key={i} className="flex items-center justify-between bg-lavenderGrey m-1 p-1 rounded-lg hover:scale-105 transition duration-300 w-fit">
                                            <p className="text-shadowGrey text-xs first-letter:uppercase mr-5">{x}</p>
                                            <RxCross1 className="text-shadowGrey cursor-pointer text-xs" onClick={() => deleteSKill("technicalSkills", i)}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 m-2" >
                            <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="softSkills">Soft Skills</label>
                            <div className="flex items-center">
                                <input className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey p-1 md:p-2 h-full text-shadowGrey rounded-bl rounded-tl w-full" type="text" id="softSkills" name="softSkills" value={inputs.softSkills} onChange={handleChange} placeholder="Enter soft skills" autoComplete="soft-skills"></input>
                                <button type="button" onClick={addSoftSkill} className="h-full rounded-br rounded-tr p-2 text-white bg-steelBlue hover:bg-vintageGrape"><IoAddOutline /></button>
                            </div>
                            
                            <div className="grid grid-cols-2">
                                {editState.softSkills.map((x,i) =>{
                                    return(
                                        <div key={i} className="flex items-center justify-between bg-lavenderGrey m-1 p-1 rounded-lg hover:scale-105 transition duration-300 w-fit">
                                            <p className="text-shadowGrey text-xs first-letter:uppercase mr-5">{x}</p>
                                            <RxCross1 className="text-shadowGrey cursor-pointer text-xs" onClick={() => deleteSKill("softSkills", i)}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 m-2">
                            <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="tools">Tools</label>
                            <div className="flex items-center">
                                <input className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey p-1 md:p-2 h-full text-shadowGrey rounded-bl rounded-tl w-full" type="text" id="tools" name="tools" value={inputs.tools} onChange={handleChange} placeholder="Enter tools" autoComplete="tools"></input>
                                <button type="button" onClick={addTools} className="h-full rounded-br rounded-tr p-2 text-white bg-steelBlue hover:bg-vintageGrape"><IoAddOutline /></button>
                            </div>
                           
                            <div className="grid grid-cols-2">
                                {editState.tools.map((x,i) =>{
                                    return(
                                        <div key={i} className="flex items-center justify-between bg-lavenderGrey m-1 p-1 rounded-lg hover:scale-105 transition duration-300 w-fit">
                                            <p className="text-shadowGrey text-xs first-letter:uppercase mr-5">{x}</p>
                                            <RxCross1 className="text-shadowGrey cursor-pointer text-xs" onClick={() => deleteSKill("tools", i)}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 m-2">
                            <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="strengths">Strengths</label>
                            <div className="flex items-center">
                                <input className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey p-1 md:p-2 h-full text-shadowGrey rounded-bl rounded-tl w-full" type="text" id="strengths" name="strengths" value={inputs.strengths} onChange={handleChange} placeholder="Enter strengths" autoComplete="tools" ></input>
                                <button type="button" onClick={addStrength} className=" h-full rounded-br rounded-tr p-2 text-white bg-steelBlue hover:bg-vintageGrape"><IoAddOutline /></button>
                            </div>
                            
                            <div className="grid grid-cols-2">
                                {editState.strengths.map((x,i) =>{
                                    return(
                                        <div key={i} className="flex items-center justify-between bg-lavenderGrey m-1 p-1 rounded-lg hover:scale-105 transition duration-300 w-fit">
                                            <p className="text-shadowGrey text-xs first-letter:uppercase mr-5">{x}</p>
                                            <RxCross1 className="text-shadowGrey cursor-pointer text-xs" onClick={() => deleteSKill("strengths", i)}/>
                                        </div>
                                    )
                                })}
                            </div> 
                        </div>
                        <button type="submit" className="text-white bg-steelBlue hover:bg-vintageGrape rounded-lg col-span-1 p-2 ml-2 md:w-1/2" disabled={submitting} >{submitting ? "Saving...": getData ? "Update Skills": "Add Skills"}</button>
                        <button type="button" onClick={nextPage} className="text-white bg-steelBlue hover:bg-vintageGrape rounded-lg col-span-1 p-2 ml-2 md:w-1/2">Save and Continue</button>
                    </form>
                    <div className="w-full">
                           <h2 className="text-xl md:text-2xl text-white text-center mt-5">Your Skills</h2>
                           <div className="flex items-center justify-evenly">
                               <hr className="border border-lavenderGrey w-full"></hr>
                               <PiStarFourFill className="text-2xl text-lavenderGrey m-2"></PiStarFourFill>
                               <hr className="border border-lavenderGrey w-full"></hr>
                           </div>
                            
                           {getData ? <div className="w-full">
                                <div className="flex items-center w-fit ml-auto gap-2 cursor-pointer" onClick={resetSkills}>
                                    <h4 className="text-xl">{reset ? "loading": "Reset"}</h4>
                                    <RiResetLeftFill className="text-xl hover:text-red-500"/>
                                </div>
                                <div className="technicalSkills-Container flex flex-col items-center justify-between bg-vintageGrape rounded-lg p-4 m-2">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <GrTechnology className="text-xl"/>
                                            <h3 className="text-md ">Technical Skills</h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaEdit className="text-lavenderGrey cursor-pointer text-lg md:text-xl" onClick={() => editSkill("technicalSkills")}/>
                                            
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 md:flex items-center justify-evenly mt-1 gap-2">
                                        {editSection === "technicalSkills"? editState.technicalSkills.map((x,i) =>{
                                            return(
                                                <div key={i} className="flex items-center gap-2">
                                                    <p className="text-sm first-letter:uppercase">{x}</p>
                                                    <RxCross1 className="text-red-950 cursor-pointer text-sm hover:text-red-800" onClick={() => removeSkill(i)}/>
                                                </div>
                                            )
                                        }): editState.technicalSkills.map((x,i) =>{
                                            return(
                                                <div key={i}>
                                                    <p className="text-sm first-letter:uppercase">{x}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                    <div className="softSkills-Container flex flex-col items-center justify-between bg-vintageGrape rounded-lg p-4 m-2">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <RiUserCommunityFill className="text-xl "/>
                                            <h3 className="text-md ">Soft Skills</h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaEdit className="text-lavenderGrey cursor-pointer text-lg md:text-xl" onClick={() => editSkill("softSkills")}/>
                                            
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 md:flex items-center justify-evenly mt-1 gap-2">
                                        {editSection === "softSkills" ? editState.softSkills.map((x,i) =>{
                                            return(
                                                <div key={i} className="flex items-center gap-2">
                                                    <p className="text-sm first-letter:uppercase">{x}</p>
                                                    <RxCross1 className="text-red-950 cursor-pointer text-sm hover:text-red-800" onClick={() => removeSkill(i)}/>
                                                </div>
                                            )
                                            
                                        }) : editState.softSkills.map((x,i) =>{
                                            
                                            return(
                                                <div key={i}>
                                                    <p className="text-sm first-letter:uppercase">{x}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                    
                                    <div className="tools-Container flex flex-col items-center justify-between bg-vintageGrape rounded-lg p-4 m-2">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <FaTools className="text-xl "/>
                                            <h3 className="text-md ">Tools</h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaEdit className="text-lavenderGrey cursor-pointer text-lg md:text-xl" onClick={() => editSkill("tools")}/>
                                            
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 md:flex items-center justify-evenly mt-1 gap-2">
                                        {editSection === "tools"? editState.tools.map((x,i) =>{
                                            return(
                                                <div key={i} className="flex items-center gap-2">
                                                    <p className="text-sm first-letter:uppercase">{x}</p>
                                                    <RxCross1 className="text-red-950 cursor-pointer text-sm hover:text-red-800" onClick={() => removeSkill(i)}/>
                                                </div>
                                            )
                                        }): editState.tools.map((x,i) =>{
                                            return(
                                                <div key={i}>
                                                    <p className="text-sm first-letter:uppercase">{x}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                    <div className="strengths-Container flex flex-col items-center justify-between bg-vintageGrape rounded-lg p-4 m-2">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <LuBrainCircuit className="text-xl"/>
                                            <h3 className="text-md ">Strengths</h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaEdit className="text-lavenderGrey cursor-pointer text-lg md:text-xl" onClick={() =>editSkill("strengths")}/>
                                           
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 md:flex items-center justify-evenly mt-1 gap-2">
                                        {editSection === "strengths" ? editState.strengths.map((x,i) =>{
                                            return(
                                                <div key={i} className="flex items-center gap-2">
                                                    <p className="text-sm first-letter:uppercase">{x}</p>
                                                    <RxCross1 className="text-red-950 cursor-pointer text-sm hover:text-red-800" onClick={() => removeSkill(i)}/>
                                                </div>
                                            )
                                        }) : editState.strengths.map((x,i) =>{
                                            return(
                                                <div key={i}>
                                                    <p className="text-sm first-letter:uppercase">{x}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                           </div>: <h4 className="text-lavenderGrey opacity-30 text-2xl text-center">No Data</h4>}

                    </div> 
                   
                  
           </div>
       )
}