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
import { HiTemplate } from "react-icons/hi";
import ClassicPreview from "../../../Components/ClassicPreview";
import ModernPreview from "../../../Components/ModernPreview";
import ExecutivePreview from "../../../Components/ExecutivePreview";
import { useContext } from "react";
import { TemplateContext } from "../../context/TemplateContext";



export default function Templates(){

    const {selectedTemplate} = useContext(TemplateContext);


    return(
          <div className="bg-shadowGrey rounded-lg m-5 shadow-sm shadow-shadowGrey text-white min-h-full p-5 flex flex-col">
            <div className="flex">
                <HiTemplate className="shrink-0 rounded-full text-white mr-5 text-3xl md:text-5xl"/>
                <div className="w-full">
                    <h1 className="text-xl md:text-3xl text-white">Templates</h1>
                    <div className="flex items-center justify-evenly">
                        <hr className="border border-lavenderGrey w-full"></hr>
                        <PiStarFourFill className="text-2xl text-lavenderGrey m-2"></PiStarFourFill>
                        <hr className="border border-lavenderGrey w-full"></hr>
                    </div>
                    <p className="text-xs md:text-sm"><i>Select a template that best represents your professional experience.</i></p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full mt-4">
                <ClassicPreview />
                <ModernPreview />
                <ExecutivePreview />
            </div>
        </div>
    )
}