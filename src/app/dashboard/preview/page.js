"use client";
import { TemplateContext } from "../../context/TemplateContext";
import { useContext, useEffect, useState,useRef } from "react";
import axios from "axios";
import ClassicResume from "../../../Components/ClassicResume";
import ModernResume from "../../../Components/ModernResume";
import ExecutiveResume from "../../../Components/ExecutiveResume";
import { GrCheckboxSelected } from "react-icons/gr";
import { IoMdDownload } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";



export default function Preview(){


    const {selectedTemplate} = useContext(TemplateContext);
    const [data, setData] = useState(null);


    const resumePdf = useRef(null);

    

    useEffect(() =>{
        const getData = async () =>{
            try{
                const response = await axios.get("http://localhost:3000/api/resume",{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status === 200){
                setData(response.data.resumePreview)
                
            }

            }catch(error){
                console.log(error)
            }
        }

        getData();

    },[])


    const getPdf = async () =>{
        const canvaImg = await html2canvas(resumePdf.current);
        const convertImg = canvaImg.toDataURL("image/png");
        const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [800, 1100]
    });

    pdf.addImage(convertImg,"PNG",0,0, 800, 1100);
    pdf.save("resume.pdf");
    }

    if(data === null){
        return(
            <div className="m-5 text-center text-2xl">Loading...</div>
        )
    }

   
  

    return(
        <div className="p-2 m-2">
            <h1 className="text-xl font-semibold">Preview Your Resume</h1>
            <p className="text-sm"><i>Review your resume before downloading</i></p>
            
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {selectedTemplate === "Classic" ? (
                <div className="col-span-2 shadow-sm shadow-gray-500 mt-5 h-[1100px] w-[800px]" ref={resumePdf}>
                    <ClassicResume data={data}/>
                </div>
                ): selectedTemplate === "Modern" ?(
                    <div className="col-span-2 shadow-sm shadow-gray-500 mt-5 h-[1100px] w-[800px]" ref={resumePdf}>
                        <ModernResume data={data}/>
                    </div>
                ):selectedTemplate === "Executive"?(
                    <div className="col-span-2 shadow-sm shadow-gray-500 mt-5 h-[1100px] w-[800px]" ref={resumePdf}>
                        <ExecutiveResume data={data}/>
                    </div>
                ) : <h3 className="text-gray-400 col-span-3 text-2xl mt-32 m-auto">No Resume Selected</h3>}

                <div className={`${selectedTemplate === null? "hidden": "col-span-3 w-full m-1 xl:col-span-1 xl:w-full"}`}>
                    <div className="flex flex-col gap-1 p-5 shadow-sm shadow-gray-500 m-auto w-full">
                        <div className="flex flex-col justify-between">
                            <h3>Selected Resume</h3>
                            <div className="flex items-center gap-1">
                                <p className="first-letter:uppercase font-semibold">{selectedTemplate}</p>
                                <p className={`${selectedTemplate !== null ? "bg-violet-200 text-sm": ""} text-black rounded-sm p-1`}>{selectedTemplate !== null ? "Active": ""}</p>
                            </div>
                        </div>
                        <p className="text-xs">{selectedTemplate === "Classic" ? "A clean and professional layout": selectedTemplate === "Modern" ? "A sleek and contemporary layout": selectedTemplate === "Executive" ? "A refined and sophisticated layout": ""}</p>
                        <button className="rounded-md p-2 bg-steelBlue active:bg-blue-500 mt-1 text-white flex items-center gap-1 text-sm w-fit" onClick={getPdf}><IoMdDownload /> Download PDF</button>
                    </div>
                   <div className="shadow-md shadow-gray-500 mt-5 p-2">
                        <p className="font-semibold text-lg">Resume Progress</p>
                        <div className="flex flex-col justify-start">
                            <div className="flex items-center justify-between">
                                <p>Personal Info</p>
                                <FaRegCheckCircle className={`${data.personalInfo === null ? "text-red-500": "text-green-500"}`}/>
                            </div>
                             <div className="flex items-center justify-between">
                                <p>Experience</p>
                                <FaRegCheckCircle className={`${data.experience.length < 1 ? "text-red-500": "text-green-500"}`}/>
                            </div>
                             <div className="flex items-center justify-between">
                                <p>Education</p>
                                <FaRegCheckCircle className={`${data.education.length < 1 ? "text-red-500": "text-green-500"}`}/>
                            </div>
                             <div className="flex items-center justify-between">
                                <p>Skills</p>
                                <FaRegCheckCircle className={`${data.skill === null ? "text-red-500": "text-green-500"}`}/>
                            </div>
                             <div className="flex items-center justify-between">
                                <p>Certifications</p>
                                <FaRegCheckCircle className={`${data.cert.length < 1 ? "text-red-500": "text-green-500"}`}/>
                            </div>
                             <div className="flex items-center justify-between">
                                <p>Projects</p>
                                <FaRegCheckCircle className={`${data.projects.length < 1 ? "text-red-500": "text-green-500"}`}/>
                            </div>
                        </div>
                   </div>
                </div>
                
            </div>

        </div>
    )
}