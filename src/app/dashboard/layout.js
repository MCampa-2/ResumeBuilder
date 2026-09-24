"use client";

import DashboardSideNav from "../../Components/DashSideNav";
import DashTopNav from "../../Components/DashTopNav";
import { useState } from "react";

export default function Layout({ children }) {

    const [toggleNav, setToggleNav] = useState(false);

    const openNav = () => {
        setToggleNav((prev) => !prev);
    };

    const closeSideNav = () => {
        setToggleNav(false);
    };

    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <DashboardSideNav
                toggleNav={toggleNav}
                closeSideNav={closeSideNav}
            />

            {/* Dark background behind mobile sidebar */}
            {toggleNav && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={closeSideNav}
                />
            )}

            {/* Main dashboard */}
            <div className="flex flex-col flex-1 min-w-0 min-h-screen">

                <DashTopNav
                    openNav={openNav}
                    toggleNav={toggleNav}
                />

                <main className="flex-1">
                    {children}
                </main>

            </div>

        </div>
    );
}