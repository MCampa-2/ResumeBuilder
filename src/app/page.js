"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineNewspaper } from "react-icons/hi2";


export default function Home() {


  const [toggleNav, setToggleNav] = useState(false);
  
  


const openNav = () =>{
  setToggleNav(!toggleNav);
}




  return (
    <>
      <nav className="navbar">
      <div className="flex flex-col md:flex-row">
                <div className="flex justify-center items-center">
                  <HiOutlineNewspaper className="text-lavenderGrey text-2xl md:text-3xl"/>
                  <div className="flex justify-center items-center ml-2">
                    <p className="mr-1 text-white text-lg md:text-xl">Resume</p>
                    <p className="text-lavenderGrey text-lg md:text-xl">Builder</p>
                  </div>
                </div>

          <div className="flex flex-col mobile-links">
              <Link href="/register" className={`${toggleNav? "flex": "hidden"} md:hidden mobile-register-link`}>Register</Link>
              <Link href="/login" className={`${toggleNav? "flex": "hidden"} md:hidden mobile-login-link`}>Login</Link>
          </div>
       </div>

       <div className="flex items-center">
              <Link href="/register" className="register hidden md:flex">Register</Link>
              <Link href="/login" className="login hidden md:flex">Login</Link>
       </div>

       <div className="hamburger flex flex-col cursor-pointer md:hidden" onClick={openNav}>
        <div className={`bar1 ${toggleNav ? "toggle": ""}`}></div>
        <div className={`bar2 ${toggleNav ? "toggle": ""}`}></div>
        <div className={`bar3 ${toggleNav ? "toggle": ""}`}></div>
       </div>
        
      </nav>



      <main className="hero-container">
        <section className="hero flex flex-col items-center text-center md:flex-row md:justify-evenly">
          <div className="hero-main border-2">
            <h1 className="text-lg md:text-xl lg:text-4xl">Build a job-winning resume in minutes with AI.</h1>
            <p className="text-md md:text-lg lg:text-2xl"><i>Create, edit, and optimize your resume effortlessly</i></p>
            <Link href="/register" className="cta rounded-xl text-xs md:text-lg">Get Started</Link>
          </div>
          <div className="hero-img">
            <p className="text-xl example">Example</p>
            <Image className="resume-img w-50 md:w-56 lg:w-80 xl:w-96" src="/images/Modern.png" alt="resume-image" width={200} height={300}/>
          </div>
        </section>
        
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
          <section className="features rounded-xl md:h-100 flex justify-evenly flex-col">
            <h2 className="text-xl lg:text-3xl text-center">Features</h2>
            <ul className="list-disc list-inside">
              <li className="md:text-xl">AI Resume Suggestions</li>
              <li className="md:text-xl">Professional Templates</li>
              <li className="md:text-xl">Easy section by section builder</li>
              <li className="md:text-xl">Downloadable PDF</li>
            </ul>
          </section>

          <section className="how-it-works rounded-xl md:h-100 flex flex-col justify-evenly">
            <h3 className="text-xl lg:text-3xl text-center">How it works</h3>
            <ul className="list-decimal list-inside">
              <li className="md:text-xl">
                Step 1
                <p>Add your information section by section.</p>
              </li>
              
              <li className="md:text-xl">
                Step 2
                <p>Improve your resume with the power of AI</p>
              </li>
              
              <li className="md:text-xl">
                Step 3
                <p>Pick a template, preview your resume, and download it as a PDF.</p>
              </li>
            </ul>           
          </section>
          </div>
      </main>
      <footer className="footer flex flex-col items-center text-center md:flex-row md:justify-between md:text-left md:items-baseline">
        <div className="footer-header text-sm">
          <h5>AI Resume Builder</h5>
          <p>Build resumes faster with AI</p>
        </div>
        <div className="copyright">
          <p>© 2026 AI Resume Builder</p>
        </div>
      </footer>
    </>
  )
};

