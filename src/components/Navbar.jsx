import React, {useState} from "react";
//import { Link } from "react-router-dom";

const Navbar = () => {


    return (
        <nav className="border-solid border-b border-yellow-900 p-6 fixed w-full top-0 backdrop-blur-sm z-50">
            <div className="flex justify-between">
                <div id="logo">
                    <h1 className="text-2xl text-[#080401]">World Explorer</h1>
                </div>
                
            </div>
        </nav>
    )
}

export default Navbar;