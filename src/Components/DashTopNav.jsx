"use client";

import { HiOutlineNewspaper } from "react-icons/hi2";
import { useRouter } from "next/navigation";

export default function DashTopNav({ openNav, toggleNav }) {

    const router = useRouter();

    const homePage = () => {
        router.push("/");
    };

    return (
        <nav className="flex items-center md:hidden p-5 bg-shadowGrey relative z-20">

            <div
                className="flex justify-center items-center cursor-pointer"
                onClick={homePage}
            >
                <HiOutlineNewspaper className="text-lavenderGrey text-2xl" />

                <div className="flex justify-center items-center ml-2">
                    <p className="mr-1 text-white text-lg">
                        Resume
                    </p>

                    <p className="text-lavenderGrey text-lg">
                        Builder
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={openNav}
                aria-label="Toggle navigation"
                className="flex flex-col justify-center gap-[5px] ml-auto w-8 h-8 relative z-50"
            >
                <span
                    className={`
                        block w-7 h-[3px] bg-white rounded
                        transition-all duration-300
                        ${toggleNav ? "translate-y-2 rotate-45" : ""}
                    `}
                />

                <span
                    className={`
                        block w-7 h-[3px] bg-white rounded
                        transition-all duration-300
                        ${toggleNav ? "opacity-0" : ""}
                    `}
                />

                <span
                    className={`
                        block w-7 h-[3px] bg-white rounded
                        transition-all duration-300
                        ${toggleNav ? "-translate-y-2 -rotate-45" : ""}
                    `}
                />
            </button>

        </nav>
    );
}