"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { FaChartBar } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa";
import { BiSolidCertification } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { IoIosArrowUp } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiRobot2Line } from "react-icons/ri";


export default function DashboardSidedNav({toggleNav}){

    const router = useRouter();

    const [openSettings, setOpenSettings] = useState(false);

    const logOut = () =>{
        localStorage.removeItem("token");
        router.push("/");
    }

    const toggleSettings = () =>{
        setOpenSettings(!openSettings);
    }

   const menuRef = useRef();

    useEffect(() =>{
       const closeMenu = (e) =>{
        if(!menuRef.current.contains(e.target)){
            setOpenSettings(false)
        }
       }
    
       document.addEventListener("mousedown", closeMenu);

    },[])


 
    const backHome = () =>{
        router.push("/")
    }

   
    return(
        <nav className={`sidenav bg-shadowGrey w-64  flex-col items-center justify-start mr-auto fixed top-0 left-0 bottom-0 z-40 md:z-0 md:translate-x-0 md:static md:flex ${toggleNav ? "translate-x-0": "-translate-x-full"} transition duration-200`}>
            <div className="flex justify-center items-center mt-5 w-full">
                <HiOutlineNewspaper className="text-lavenderGrey text-2xl md:text-3xl"/>
                <div className="flex justify-center items-center ml-2 cursor-pointer" onClick={backHome}>
                        <p className="mr-1 text-white text-md md:text-lg">Resume</p>
                        <p className="text-lavenderGrey text-md md:text-lg">Builder</p>
                </div>
            </div>
               <div className="flex flex-col justify-start w-full items-center">
                    <Link href="/dashboard" className="text-white hover:bg-vintageGrape text-center mt-4 mb-1 p-2 rounded-md w-5/6 flex justify-start items-center text-lg"><FaChartBar className="m-2"/>Dashboard</Link>
                    <Link href="/dashboard/personalInfo" className="text-white hover:bg-vintageGrape text-center  p-2 rounded-md w-5/6 flex justify-start items-center text-sm"><IoPersonSharp className="m-2"/>Personal Info</Link>
                    <Link href="/dashboard/experience" className="text-white hover:bg-vintageGrape text-center  p-2 rounded-md w-5/6 flex justify-start items-center text-sm"><IoIosDocument className="m-2"/>Experience</Link>
                    <Link href="/dashboard/education" className="text-white hover:bg-vintageGrape text-center  p-2 rounded-md w-5/6 flex justify-start items-center text-sm"><FaGraduationCap className="m-2"/>Education</Link>
                    <Link href="/dashboard/skills" className="text-white hover:bg-vintageGrape text-center  p-2 rounded-md w-5/6 flex justify-start items-center text-sm"><FaStar className="m-2 text-white"/>Skills</Link>
                    <Link href="/dashboard/certifications" className="text-white hover:bg-vintageGrape text-center  p-2 rounded-md w-5/6 flex justify-start items-center text-sm"><BiSolidCertification className="m-2"/>Certifications</Link>
                    <Link href="/dashboard/projects" className="text-white hover:bg-vintageGrape text-center  p-2 rounded-md w-5/6 flex justify-start items-center text-sm"><FaFolder className="m-2"/>Projects</Link>
                    <Link href="/dashboard/templates" className="text-white hover:bg-vintageGrape text-center  p-2 rounded-md w-5/6 flex justify-start items-center text-sm"><HiTemplate className="m-2"/>Templates</Link>
                    <Link href="/dashboard/preview" className="text-white hover:bg-vintageGrape text-center p-2 rounded-md w-5/6 flex justify-start items-center text-sm"><FaEye className="m-2"/>Preview Resume</Link>
                    <Link href="/dashboard/assistant" className="text-white hover:bg-vintageGrape text-center mb-2 p-2 rounded-md w-5/6 flex justify-start items-center text-sm"><RiRobot2Line className="m-2"/>AI Assistant</Link>
               </div>
               <hr className="border-vintageGrape border-1 w-full"></hr>

                <div className="bg-vintageGrape p-2 rounded-md m-2" ref={menuRef}>
                    <p className="text-white text-sm text-center">Account Menu</p>
                    <div className="flex justify-between items-center gap-2">
                        
                        <div className="flex items-center justify-between gap-2 w-full">
                            <IoPersonCircle className="shrink-0 text-lavenderGrey text-2xl" />
                            <p className="text-white text-xs min-w-0">Michael Campagnoli</p>
                            {openSettings ? <IoIosArrowUp className="text-lavenderGrey text-sm hover:text-vintageLavender cursor-pointer transition duration-100" onClick={toggleSettings}/> : <IoIosArrowDown className="text-lavenderGrey text-sm hover:text-vintageLavender cursor-pointer transition duration-100" onClick={toggleSettings}/>}
                        </div>
                    </div>
                    <hr className={`border-lavenderGrey mt-2 mb-2 ${openSettings ? "flex": "hidden"}`}></hr>
                    <div className={`${openSettings ? "flex": "hidden"} items-center gap-2 bg-vintageGrape hover:bg-shadowGrey cursor-pointer hover:rounded-md p-1 transition duration-100`}>
                        <IoSettingsSharp className="text-white  text-xl shrink-0  "/>
                        <p className="text-white text-sm  ">Settings</p>
                    </div>
                    <hr className={`border-lavenderGrey mt-2 mb-2 ${openSettings ? "flex": "hidden"}`}></hr>
                    <div className={`${openSettings ? "flex": "hidden"} items-center gap-2 bg-vintageGrape hover:bg-shadowGrey cursor-pointer hover:rounded-md p-1 transition duration-100`} onClick={logOut}>
                        <IoMdLogOut className="text-white  text-xl shrink-0"/>
                        <p className="text-white text-xs">Log Out</p>
                    </div>
                   
                    
                </div>           
        </nav>
    )
}