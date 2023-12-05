import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';



import { links } from "../assets/constant";

const NavLinks = () => {

    const { role } = useSelector((state) => state.user);
    const location = useLocation();
    console.log(location);
debugger


    return (

        <div id="sideBarItem" className="mt-10">
            {links.map((item) => {
                
                const isActive =
                    location.pathname == item.to ||
                    (location.pathname.includes(item.to));
                    console.log(isActive)
                if (role === "Admin" && (item.name === 'Schedule')) {
                    return (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            className={`flex flex-row justify-start items-center my-8 text-xs font-medium hover:text-gray-400  ${isActive ? "text-blue-500 font-bold" : "text-gray-500"
                                }`}
                        >
                            <item.icon className="w-4 h-6 mr-2" />
                            {item.name}
                        </NavLink>
                    )

                }
                else if (item.name !== 'Schedule') {

                    return (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            className={`flex flex-row justify-start items-center my-8 text-xs font-medium hover:text-gray-400  ${isActive ? "text-blue-500 font-bold" : "text-gray-500"
                        }`}

                        >
                            <item.icon className="w-4 h-6 mr-2" />
                            {item.name}
                        </NavLink>
                    )

                }

            }
            )
            }

        </div>
    );
}
debugger
const Sidebar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-gray-300">
                <a
                    href="/"
                    className="text-white flex my-8 px-6 w-full items-center justify-center">
                    <div className="text-black text-3xl">DENTAL CLINIC</div>
                    {/* <img src={logo} alt="logo" className="h-14" /> */}
                </a>
                <NavLinks />
            </div>

            <div className="absolute md:hidden block top-6 right-3">
                {mobileMenuOpen ? (
                    <RiCloseLine
                        className="w-6 h-6 text-gray-100 mr-2"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                ) : (
                    <HiOutlineMenu
                        className="w-6 h-6 text-gray-100 mr-2"
                        onClick={() => setMobileMenuOpen(true)}
                    />
                )}
            </div>

            <div
                className={`absolute top-0 h-screen w-2/3 backdrop-blur-lg backdrop-brightness-50 z-10 p-6 md:hidden smooth-transition
      ${mobileMenuOpen ? "left-0" : "-left-full"}`}>
                {/* <img src={logo} alt="logo" className="w-full h-24 object-contain" /> */}
                <NavLinks handleClick={() => setMobileMenuOpen(false)} />
            </div>
        </>
    );
};

export default Sidebar;