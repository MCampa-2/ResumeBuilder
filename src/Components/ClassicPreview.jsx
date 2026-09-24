"use client";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import Image from "next/image";
import { useContext } from "react";
import { TemplateContext } from "../app/context/TemplateContext";
import { FaCheck } from "react-icons/fa";

export default function ClassicPreview(){

    const {selectedTemplate, setSelectedTemplate} = useContext(TemplateContext);


    const getTemplate = () =>{
        setSelectedTemplate("Classic");
        localStorage.setItem("template", "Classic");
    }

    return(
        <div className="border-lavenderGrey border-2 p-2 rounded-lg max-w-96 min-h-[600px]">
       <Image src="/images/Classic.png" alt="template" width={400} height={600}  className="w-full h-[450px] object-contain"/>
        <div className="m-2 w-full">
            <p className="text-lg font-bold text-white">Classic</p>
            <p className="text-lavenderGrey text-sm">A clean and professional layout designed to present your experience, skills, and qualifications in a clear and organized format.</p>
        </div>
        <div className={`${selectedTemplate === "Classic" ? "w-fit m-auto bg-green-500": "w-full bg-steelBlue"} p-2 rounded-lg active:bg-vintageGrape cursor-pointer text-center`} onClick={getTemplate}>
            {selectedTemplate === "Classic" ? <div className="flex items-center justify-evenly gap-2">Selected <FaCheck /></div>: "Use Template"}
        </div>
        </div>
    )
}