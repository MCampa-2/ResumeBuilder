"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../Components/Loading";
import axios from "axios";
import Link from "next/link";

import { MdOutlineWavingHand } from "react-icons/md";
import { IoIosRocket } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa";
import { BiSolidCertification } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";

export default function Dashboard() {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [getName, setName] = useState("");
    const [resumeData, setData] = useState(null);

    // CHECK TOKEN
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/");
            return;
        }

        setIsLoading(false);

    }, [router]);


    // GET USER
    useEffect(() => {

        const getUser = async () => {

            try {

                const response = await axios.get("/api/user", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.status === 200) {
                    setName(response.data.data.fname);
                }

            } catch (error) {
                console.log(error);
            }
        };

        getUser();

    }, []);


    // GET RESUME
    useEffect(() => {

        const getResume = async () => {

            try {

                const response = await axios.get("/api/resume", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.status === 200) {

                    console.log(response.data);

                    setData(response.data.resumePreview);
                }

            } catch (error) {

                console.log(error);

            }
        };

        getResume();

    }, []);


    // LOADING
    if (isLoading || !resumeData) {
        return <Loading />;
    }


    /*
        SAFE DATA CHECKS

        Some resume sections may not exist yet.
        For example, resumeData.skill can be null.
    */

    const hasPersonalInfo = Boolean(resumeData.personalInfo);

    const hasExperience =
        Array.isArray(resumeData.experience) &&
        resumeData.experience.length > 0;

    const hasEducation =
        Array.isArray(resumeData.education) &&
        resumeData.education.length > 0;

    const hasCertifications =
        Array.isArray(resumeData.cert) &&
        resumeData.cert.length > 0;

    const hasProjects =
        Array.isArray(resumeData.projects) &&
        resumeData.projects.length > 0;

    const hasSkills = Boolean(
        resumeData.skill &&
        (
            resumeData.skill.softSkills?.length > 0 ||
            resumeData.skill.tools?.length > 0 ||
            resumeData.skill.technicalSkills?.length > 0 ||
            resumeData.skill.strengths?.length > 0
        )
    );


    // CALCULATE COMPLETED SECTIONS
    let completed = 0;

    if (hasPersonalInfo) {
        completed++;
    }

    if (hasExperience) {
        completed++;
    }

    if (hasCertifications) {
        completed++;
    }

    if (hasEducation) {
        completed++;
    }

    if (hasProjects) {
        completed++;
    }

    if (hasSkills) {
        completed++;
    }


    const percent = (completed / 6) * 100;


    return (

        <main className="m-5 grid grid-cols-3 gap-5">

            <div className="flex flex-col gap-4 col-span-3">


                {/* WELCOME */}

                <div className="flex items-center justify-between">

                    <h1 className="text-xs md:text-2xl mr-2 font-bold text-shadowGrey">
                        Welcome back, {getName}!
                    </h1>

                    <MdOutlineWavingHand className="text-steelBlue text-xs md:text-2xl mr-auto" />

                    <Link
                        href="/dashboard/assistant"
                        className="flex text-xs md:text-lg items-center gap-1 border border-violet-500 rounded-md p-1 text-violet-500 hover:shadow-sm hover:shadow-violet-500"
                    >
                        <RiRobot2Line className="text-violet-500" />

                        AI Assistant
                    </Link>

                </div>


                {/* RESUME PROGRESS */}

                <div className="flex flex-col gap-2 shadow-gray-400 shadow-sm p-4 rounded-lg text-xs md:text-lg">

                    <div className="flex items-center justify-between">

                        <h2 className="font-medium">
                            Resume Progress
                        </h2>

                        <p>
                            {completed !== 0
                                ? `${completed} out of 6 sections completed`
                                : "0 out of 6 sections completed"
                            }
                        </p>

                    </div>


                    {/* PROGRESS BAR */}

                    <div className="bg-gray-300 w-full rounded-2xl m-2">

                        <div
                            className="rounded-2xl bg-gradient-to-r from-steelBlue to-lavenderGrey flex justify-end p-1 text-white"
                            style={{
                                width: `${Math.round(percent)}%`
                            }}
                        >

                            <p className="mr-2">
                                {Math.round(percent)}%
                            </p>

                        </div>

                    </div>


                    <p className="flex items-center gap-2">

                        {completed === 6
                            ? "You've completed 100% of the sections!"
                            : "Great job! Keep going, you're almost there."
                        }

                        <IoIosRocket className="text-orange-400" />

                    </p>

                </div>


                {/* SECTION OVERVIEW */}

                <h3 className="text-sm md:text-lg">
                    Section Overview
                </h3>


                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">


                    {/* PERSONAL INFO */}

                    <div className="flex flex-col gap-2 shadow-gray-400 shadow-sm p-4 rounded-lg">

                        <IoPersonSharp
                            className={`
                                ${
                                    hasPersonalInfo
                                        ? "bg-green-200 text-green-500"
                                        : "bg-orange-200 text-orange-500"
                                }
                                p-1 rounded-lg text-2xl
                            `}
                        />

                        <p className="text-md">
                            Personal Info
                        </p>

                        <p className="text-xs">
                            Add your name, contact information, and headline.
                        </p>

                        <p
                            className={`
                                ${
                                    hasPersonalInfo
                                        ? "bg-green-200"
                                        : "bg-orange-200"
                                }
                                w-fit p-2 text-sm md:text-md rounded-lg
                            `}
                        >
                            {hasPersonalInfo
                                ? "Completed"
                                : "Incomplete"
                            }
                        </p>

                    </div>


                    {/* EXPERIENCE */}

                    <div className="flex flex-col gap-2 shadow-gray-400 shadow-sm p-4 rounded-lg">

                        <IoIosDocument
                            className={`
                                ${
                                    hasExperience
                                        ? "bg-green-200 text-green-500"
                                        : "bg-orange-200 text-orange-500"
                                }
                                p-1 rounded-lg text-2xl
                            `}
                        />

                        <p className="text-md">
                            Experience
                        </p>

                        <p className="text-xs">
                            Detail your work history and achievements.
                        </p>

                        <p
                            className={`
                                ${
                                    hasExperience
                                        ? "bg-green-200"
                                        : "bg-orange-200"
                                }
                                w-fit p-2 text-sm md:text-md rounded-lg
                            `}
                        >
                            {hasExperience
                                ? "Completed"
                                : "Incomplete"
                            }
                        </p>

                    </div>


                    {/* EDUCATION */}

                    <div className="flex flex-col gap-2 shadow-gray-400 shadow-sm p-4 rounded-lg">

                        <FaGraduationCap
                            className={`
                                ${
                                    hasEducation
                                        ? "bg-green-200 text-green-500"
                                        : "bg-orange-200 text-orange-500"
                                }
                                p-1 rounded-lg text-2xl
                            `}
                        />

                        <p className="text-md">
                            Education
                        </p>

                        <p className="text-xs">
                            Add your degrees, schools, and relevant course work.
                        </p>

                        <p
                            className={`
                                ${
                                    hasEducation
                                        ? "bg-green-200"
                                        : "bg-orange-200"
                                }
                                w-fit p-2 text-sm md:text-md rounded-lg
                            `}
                        >
                            {hasEducation
                                ? "Completed"
                                : "Incomplete"
                            }
                        </p>

                    </div>


                    {/* SKILLS */}

                    <div className="flex flex-col gap-2 shadow-gray-400 shadow-sm p-4 rounded-lg">

                        <FaStar
                            className={`
                                ${
                                    hasSkills
                                        ? "bg-green-200 text-green-500"
                                        : "bg-orange-200 text-orange-500"
                                }
                                p-1 rounded-lg text-2xl
                            `}
                        />

                        <p className="text-md">
                            Skills
                        </p>

                        <p className="text-xs">
                            List your technical, tools, strengths, and soft skills.
                        </p>

                        <p
                            className={`
                                ${
                                    hasSkills
                                        ? "bg-green-200"
                                        : "bg-orange-200"
                                }
                                w-fit p-2 text-sm md:text-md rounded-lg
                            `}
                        >
                            {hasSkills
                                ? "Completed"
                                : "Incomplete"
                            }
                        </p>

                    </div>


                    {/* CERTIFICATIONS */}

                    <div className="flex flex-col gap-2 shadow-gray-400 shadow-sm p-4 rounded-lg">

                        <BiSolidCertification
                            className={`
                                ${
                                    hasCertifications
                                        ? "bg-green-200 text-green-500"
                                        : "bg-orange-200 text-orange-500"
                                }
                                p-1 rounded-lg text-2xl
                            `}
                        />

                        <p className="text-md">
                            Certifications
                        </p>

                        <p className="text-xs">
                            Add relevant certifications and licenses.
                        </p>

                        <p
                            className={`
                                ${
                                    hasCertifications
                                        ? "bg-green-200"
                                        : "bg-orange-200"
                                }
                                w-fit p-2 text-sm md:text-md rounded-lg
                            `}
                        >
                            {hasCertifications
                                ? "Completed"
                                : "Incomplete"
                            }
                        </p>

                    </div>


                    {/* PROJECTS */}

                    <div className="flex flex-col gap-2 shadow-gray-400 shadow-sm p-4 rounded-lg">

                        <FaFolder
                            className={`
                                ${
                                    hasProjects
                                        ? "bg-green-200 text-green-500"
                                        : "bg-orange-200 text-orange-500"
                                }
                                p-1 rounded-lg text-2xl
                            `}
                        />

                        <p className="text-md">
                            Projects
                        </p>

                        <p className="text-xs">
                            Showcase your projects and personal work.
                        </p>

                        <p
                            className={`
                                ${
                                    hasProjects
                                        ? "bg-green-200"
                                        : "bg-orange-200"
                                }
                                w-fit p-2 text-sm md:text-md rounded-lg
                            `}
                        >
                            {hasProjects
                                ? "Completed"
                                : "Incomplete"
                            }
                        </p>

                    </div>


                    {/* PRO TIP */}

                    <div className="flex gap-2 items-center shadow-gray-400 shadow-sm p-4 rounded-lg col-span-2 md:col-span-3">

                        <FaLightbulb className="text-shadowGrey p-1 rounded-lg text-3xl" />

                        <div className="flex flex-col gap-1">

                            <p className="text-sm md:text-md">
                                Pro Tip
                            </p>

                            <p className="text-xs md:text-sm">
                                Complete all sections to create a strong resume that will get noticed!
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}
