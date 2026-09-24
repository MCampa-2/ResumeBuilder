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
import { GoProject } from "react-icons/go";

export default function Projects(){

    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const savedTech = JSON.parse(localStorage.getItem("technologies"));
        if(savedTech){
            setInputs((prev) =>({...prev, technologies: [...savedTech]}))
        }
    }, [])

    const [inputs, setInputs] = useState({
        projectName: "",
        technology: "",
        technologies: [],
        description: ""
    });

    const [getData, setData] = useState([]);

    const [getSelected, setSelected] = useState(null)


    const addTechNology = () =>{
        const newTechnology = inputs.technology;
        const oldArr = inputs.technologies;
        const newArr = [...oldArr, newTechnology];
        localStorage.setItem("technologies", JSON.stringify(newArr));
        setInputs((prev) =>({...prev, technologies: newArr}))     
    }

    const removeTechnology = (id) =>{
       const newArr = inputs.technologies.filter((x,i) =>{
        return i !== id
       });
       setInputs((prev) =>({
        ...prev, technologies: newArr
       }));
       localStorage.setItem("technologies", JSON.stringify(newArr));
    }
  

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setInputs((values) =>({...values, [name]: value}));
    }

    const handleSubmit = async (e) =>{
        try{
            e.preventDefault();
            setSubmitting(true);

            if(getSelected !== null){
                const response = await axios.patch(`/api/profile/projects/${getSelected._id}`, inputs, {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
                });

                if(response.status === 200){
                   setData((x) => {
                    return x.map((i) =>{
                        if(i._id === getSelected._id){
                            return response.data.data
                        }
                        return i
                    });
                   })
                    toast.success(response.data.message);
                    setInputs({
                    projectName: "",
                    technologies: [],
                    technology: "",
                    description: ""
                });
                setSelected(null)
                localStorage.removeItem("technologies")
                }

            }
            if(getSelected === null){
               
            const response = await axios.post("/api/profile/projects", inputs, {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status === 201){
                setData((prev) =>([
                    ...prev, response.data.data
                ]));
                toast.success(response.data.message);
                setInputs({
                    projectName: "",
                    technologies: [],
                    technology: "",
                    description: ""
                });
                localStorage.removeItem("technologies")
            } 
            }


        }catch(error){
            if(error.response){
                toast.error( error?.response?.data?.message || "Oops something  went wrong")
            }

        }finally{
            setSubmitting(false);
        }
    }

    const deleteProject = async (id) =>{
        try{
            const response = await axios.delete(`/api/profile/projects/${id}`,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status === 200){
                toast.success(response.data.message)
                const newArr = getData.filter((x,i) =>{
                    return x._id !== id
                });

                setData(newArr)
            }

        }catch(error){
            if(error.response){
                toast.error(error?.response?.data?.message || "Oops something went wrong")
            }
        }
    }

    useEffect(() =>{
        const getProjects = async () =>{
            try{
                const response = await axios.get("/api/profile/projects",{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if(response.status === 200){
                    setData(response.data.data);
                    setLoading(false);
                }

            }catch(error){
                if(error.response){
                    console.log(error?.response?.data?.message);
                }
            }
        }

        getProjects();


    }, [])


    const getSelectedProject = (x) =>{
        setSelected(x);
       const techArr = x.technologies;
       setInputs({
        projectName: x.projectName || "",
        technologies: techArr || [],
        technology: "",
        description: x.description || ""
       });
    }   

    const nextPage = () =>{
        setSubmitting(true);
        router.push("/dashboard/templates");
    }


    return(
 <div  className="bg-shadowGrey rounded-lg m-5 shadow-sm shadow-shadowGrey text-white min-h-full p-5 flex flex-col">
                   
                   <div className="flex">
                       <FaUserCircle className="bg-white shrink-0 rounded-full text-shadowGrey mr-5 text-3xl md:text-5xl"/>
                       <div className="w-full">
                           <h1 className="text-xl md:text-3xl text-white">Projects</h1>
                           <div className="flex items-center justify-evenly">
                               <hr className="border border-lavenderGrey w-full"></hr>
                               <PiStarFourFill className="text-2xl text-lavenderGrey m-2"></PiStarFourFill>
                               <hr className="border border-lavenderGrey w-full"></hr>
                           </div>
                           <p className="text-xs md:text-sm"><i>Display projects that demonstrate your skills and hands-on experience.</i></p>
                       </div>
                   </div>
   
                   <form onSubmit={handleSubmit} className="grid grid-cols-1 m-2 md:m-5 gap-2 md:gap-4">
                         <div className="flex flex-col">
                            <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="projectName">Project Name</label>
                            <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="projectName" name="projectName" value={inputs.projectName} required placeholder="Enter your project name" autoComplete="project-name"></input>
                        </div>
                            <div className="flex flex-col">
                                <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="technology">Technologies (Add one at a time)</label>
                                <div className="flex items-center">
                                    <input className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey p-1 md:p-2 h-full text-shadowGrey rounded-bl rounded-tl w-full" type="text" id="technology" name="technology" value={inputs.technology} onChange={handleChange} placeholder="Enter technologies one at a time" autoComplete="technologies"></input>
                                    <button type="button" onClick={addTechNology}  className="h-full rounded-br rounded-tr p-2 text-white bg-steelBlue hover:bg-vintageGrape"><IoAddOutline /></button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 p-2">
                                    {inputs.technologies.map((x,i) =>{
                                        return(
                                            <div key={i} className="flex items-center justify-between bg-lavenderGrey m-1 p-1 rounded-lg hover:scale-105 transition duration-300 w-fit">
                                                <p className="text-shadowGrey text-xs first-letter:uppercase mr-5">{x}</p>
                                                <RxCross1 className="text-shadowGrey cursor-pointer text-xs" onClick={() =>removeTechnology(i)}/>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        <div className="flex flex-col col-span-1">
                            <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="description">Description</label>
                            <textarea onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="description" name="description" value={inputs.description} required placeholder="Describe your project..." autoComplete="description"></textarea>
                        </div> 
                         <div className="flex flex-col gap-2 md:col-span-1">
                            <button type="submit" className="text-white bg-steelBlue hover:bg-vintageGrape rounded-lg p-2">{getSelected ? "Update Project": "Add Project"}</button>
                            <button type="button" className="text-white bg-steelBlue hover:bg-vintageGrape rounded-lg p-2" onClick={nextPage}>{submitting? "Saving...": "Save and Continue"}</button>
                        </div>
                    </form>
                    <div className="w-full">
                           <h2 className="text-xl md:text-2xl text-white text-center mt-5">Your Projects</h2>
                           <div className="flex items-center justify-evenly">
                               <hr className="border border-lavenderGrey w-full"></hr>
                               <PiStarFourFill className="text-2xl text-lavenderGrey m-2"></PiStarFourFill>
                               <hr className="border border-lavenderGrey w-full"></hr>
                           </div>
                            <div className="grid grid-cols-1">
                                {loading? <h2 className="text-lavenderGrey opacity-30 text-2xl text-center mt-7 md:mt-0">Loading...</h2>: getData.length === 0 ?(
                                <h2 className="text-lavenderGrey opacity-30 text-2xl text-center mt-7 md:mt-0">No Data</h2>
                                ): getData.map((x) =>{
                                    console.log(x)
                                return(
                                    <div className="bg-vintageGrape m-1 p-2 rounded-lg flex items-start" key={x._id}>
                                        <GoProject className="text-xl md:text-2xl m-2 text-lavenderGrey" />
                                        <div className="m-1">
                                            <h3 className="text-md md:text-lg">{x.projectName}</h3>
                                                <div className="flex item-center justify-start">
                                                    {x.technologies.map((tech,id) =>{
                                                        return <p key={id} className="text-lavenderGrey first-letter:uppercase text-sm">{tech}</p>
                                                    })}
                                               </div>
                                            <p className="break-all">{x.description}</p>
                                        </div>
                                        <div className="flex items-center justify-center ml-auto m-2 gap-1 md:gap2">
                                            <FaEdit className="text-lavenderGrey cursor-pointer text-lg md:text-xl" onClick={() => getSelectedProject(x)}/>
                                            <MdDelete className="text-red-950 cursor-pointer text-xl md:text-xl" onClick={() => deleteProject(x._id)}/>
                                        </div>
                                        </div>
                                    )
                            })}
                            </div>   
                        </div>   
           </div>
    )
}