import Image from "next/image"
const Navbar = () => {

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
                <button className="  bg-[#df1231] px-3 py-1 border border-white rounded-md cursor-pointer font-bold  text-[#ffff] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-[#ff1f4b]">Login</button>
            </div>
        </nav>
    )
}

export default Navbar