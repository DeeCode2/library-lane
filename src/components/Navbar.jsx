import React, {useState} from "react";
import PlaneIcon from "../assets/plane-icon.svg"
import { Link } from "react-router-dom";

const Navbar = () => {


    return (
        <nav className="border-solid border-b border-[#080401] p-3 fixed w-full top-0 bg-[rgba(255,247,237,0.6)] backdrop-blur-sm z-50">
            <div className="flex items-center justify-between">
                <div id="logo" className="flex items-center">
                    <div className="aspect-square max-w-[50px] mr-2">
                        <img className="w-full" src="icons/library.svg"/> 
                    </div>
                    
                    <h1 className="text-md md:text-2xl text-[#080401]">Explorer Hub</h1>
                </div>

                <a href="/newlocation" className="border py-2 px-3 text-center rounded-full border-[#080401] backdrop-blur-sm hover:bg-[rgba(245,245,245,1)] focus:bg-[rgba(245,245,245,1)]">New place</a>
                
            </div>
        </nav>
    )
}

export default Navbar;