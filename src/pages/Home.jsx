import React from 'react';
import banner from '../assets/banner.jpg';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div>
                {/*Navbar*/}
            </div>
            <div className="relative">
                <img src={banner} alt="Logo" className="w-full h-auto" />
                <div className="absolute top-[75%] left-[15%] transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl">
                    ER / IPR Data
                </div>
            </div>

            <div className="fixed bottom-[80px] right-4 flex space-x-4 mt-4 ">
                {/* Add Icon */}
                <div className="bg-[#0079BE] p-2 rounded-md shadow-lg shadow-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 fill-white hover: cursor-pointer"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                {/* Print Icon */}
                <div className="bg-[#0079BE] p-2 rounded-md shadow-lg shadow-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 fill-white hover: cursor-pointer"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
            <footer className="fixed bottom-0 w-full bg-[#02447C] text-white  shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
                <div className="flex flex-wrap justify-center items-center text-[11px] gap-x-2 gap-y-2 p-2 ">
                    <a href="#" className="hover:underline">Contact Us</a>
                    <span className="text-gray-300">|</span>
                    <a href="#" className="hover:underline">Terms & Conditions</a>
                    <span className="text-gray-300">|</span>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <span className="text-gray-300">|</span>
                    <a href="#" className="hover:underline">Copyright Policy</a>
                    <span className="text-gray-300">|</span>
                    <a href="#" className="hover:underline">Website Policy</a>
                    <span className="text-gray-300">|</span>
                    <a href="#" className="hover:underline">Help</a>
                    <span className="text-gray-300">|</span>
                    <a href="#" className="hover:underline">Web Information Manager</a>
                </div>
                <div className="mt-4 mb-2 text-[10px] text-center text-gray-300">
                    &copy; 2025, DRDO, Ministry of Defence, Government of India
                </div>
            </footer>



        </div>
    );
};

export default Home;
