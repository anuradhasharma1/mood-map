"use client"
import Image from "next/image"
import { useState, useEffect } from "react"


const Navbar = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDark])

    return (
        <nav className=' w-full bg-[#00ffff] h-18 flex items-center justify-between   '>
            <div className='mx-10   cursor-pointer flex '>
                <h1 className=' flex py-1  font-bold text-3xl text-white'>Mood<span className='text-[rgb(255,204,92)]'>Map</span></h1>
                <Image
                    src="/logo.png"
                    alt="map-logo"
                    width={50}
                    height={50}
                />
            </div>
            <div className=" mx-10 flex gap-4 items-center ">

                <div className=" flex items-center bg-[#ffcc5c] px-2 py-1 border border-white rounded-md cursor-pointer">
                    <lord-icon
                        src="https://cdn.lordicon.com/swqyihda.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#ffffff,secondary:#ee66aa"
                        style={{ width: "30px", height: "30px" }}
                    >
                    </lord-icon>
                    <input
                        type="text"
                        placeholder="Search moods or places..."
                        className="outline-none px-2"
                    />
                </div>
                { /*animated icon*/}
                <button
                    onClick={() => setIsDark(!isDark)}
                    aria-label="Toggle theme"
                    className={`relative w-14 h-7 rounded-full border-2 border-white transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 ${isDark ? "bg-[#0f0f23]" : "bg-sky-300"}`}
                >
                    {/* Stars (dark mode) */}
                    <span className={`absolute inset-0 rounded-full overflow-hidden transition-opacity duration-500 ${isDark ? "opacity-100" : "opacity-0"}`}>
                        <span className="absolute w-1 h-1 bg-white rounded-full top-1 left-2 animate-pulse" style={{ animationDelay: "0s" }} />
                        <span className="absolute w-0.5 h-0.5 bg-white rounded-full top-2 left-5 animate-pulse" style={{ animationDelay: "0.3s" }} />
                        <span className="absolute w-0.5 h-0.5 bg-white rounded-full top-1 left-8 animate-pulse" style={{ animationDelay: "0.6s" }} />
                    </span>

                    {/* Sliding thumb: sun ↔ moon */}
                    <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md flex items-center justify-center text-xs transition-all duration-500 ease-in-out ${isDark ? "translate-x-7 bg-gray-200" : "translate-x-0.5 bg-yellow-300"}`}
                    >
                        {isDark ? (
                            /* Moon icon */
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-indigo-900">
                                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            /* Sun icon */
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-orange-500">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 10-1.06-1.061l-1.591 1.59z" />
                            </svg>
                        )}
                    </span>
                </button>

                <button className="  bg-[#df1231] px-3 py-1 border border-white rounded-md cursor-pointer font-bold  text-[#ffff] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-[#ff1f4b]">Login</button>
            </div>
        </nav>
    )
}

export default Navbar