import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { useContext } from "react";
import { TemplateContext } from "../app/context/TemplateContext";
import { FaCheck } from "react-icons/fa";

export default function ModernPreview() {

  const {setSelectedTemplate, selectedTemplate} = useContext(TemplateContext);

  const getTemplate = () =>{
    setSelectedTemplate("Modern")
    localStorage.setItem("template", "Modern")
  }

  return (
    <div className="border-lavenderGrey border-2 p-2 rounded-lg max-w-96 min-h-[600px]">
        <Image src="/images/Modern.png" alt="template" width={400} height={600}  className="w-full h-[450px] object-contain"/>
      <div className="m-2">
        <p className="text-lg font-bold text-white">Modern</p>
        <p className="text-lavenderGrey text-sm">A sleek and contemporary layout designed to showcase your experience, skills, and achievements with a polished appearance.</p>
      </div>

      <div className={`${selectedTemplate === "Modern" ? "w-fit m-auto bg-green-500": "w-full bg-steelBlue"} p-2 rounded-lg active:bg-vintageGrape cursor-pointer text-center`} onClick={getTemplate}>
        {selectedTemplate === "Modern" ? <div className="flex items-center justify-evenly gap-2">Selected <FaCheck /></div>: "Use Template"}
      </div>
    </div>
  );
}