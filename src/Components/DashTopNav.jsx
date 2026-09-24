"use client";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { useRouter } from "next/navigation";

export default function DashTopNav({openNav,toggleNav}){

    const router = useRouter();

    const homePage = () =>{
        router.push("/");
    }

    return(
        <nav className="flex items-center md:hidden p-5 bg-shadowGrey">
                 <div className="flex justify-center items-center cursor-pointer" onClick={homePage}>
                    <HiOutlineNewspaper className="text-lavenderGrey text-2xl md:text-3xl"/>
                    <div className="flex justify-center items-center ml-2">
                        <p className="mr-1 text-white text-lg md:text-xl">Resume</p>
                        <p className="text-lavenderGrey text-lg md:text-xl">Builder</p>
                    </div>
                </div>

                <div className="hamburger flex flex-col cursor-pointer ml-auto" onClick={openNav}>
                    <div className={`bar1 ${toggleNav ? "toggle" : ""}`}></div>
                    <div className={`bar2 ${toggleNav ? "toggle" : ""}`}></div>
                    <div className={`bar3 ${toggleNav ? "toggle" : ""}`}></div>
                </div> 
        </nav>
    )
}