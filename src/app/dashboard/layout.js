"use client";
import DashboardSideNav from "../../Components/DashSideNav";
import DashTopNav from "../../Components/DashTopNav";
import { useState } from "react";

export default function Layout({children}){



  const [toggleNav, setToggleNav] = useState(false);


    const openNav = () =>{
    setToggleNav(!toggleNav);
    console.log("ites wokrding")
    }

    const closeSideNav = () =>{
        setToggleNav(false);
    }


    return(
        <div className="flex h-screen">
            <DashboardSideNav  toggleNav={toggleNav}/>
           <div className="flex flex-col flex-1">
                <div className={`${toggleNav ? "opacity-25 fixed inset-0 z-30": ""} bg-black cursor-pointer`} onClick={closeSideNav}></div>
                    <DashTopNav openNav={openNav} toggleNav={toggleNav}/>
                    <div className="min-h-full overflow-y-auto">
                        {children}
                    </div>
           </div>
        </div>
    )
};

