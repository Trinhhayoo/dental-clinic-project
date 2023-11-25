import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import {  useDispatch } from "react-redux";
import Na from "../assets/Na.jpeg";
import { selectUser } from "../assets";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button } from "@material-tailwind/react";

import { setLogout } from "../redux/features/userSlice";

const Userbar = () => {
  const { username } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    navigate("/signin");
  };
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogout = () => {
    dispatch(setLogout());
   
    navigate("/home");
  };
  return (
    <div className="flex justify-end pl-6 pr-6 pt-4 pb-4 gap-4 bg-gray-300">
     
      {!username ? (
        <div className="flex  gap-1">
          <Button
            id="signinOutside"
            onClick={handleSignIn}
            className="border border-blue-500 bg-blue-500 py-2 ">
            Sign in
          </Button>
          <Button
            id="signupOutside"
            onClick={handleSignUp}
            className="border border-blue-500 bg-blue-500 py-2  ">
            Sign up
          </Button>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="w-[180px] relative flex pt-1 pb-1 pl-2 pr-4 items-center gap-2 rounded-[20px] bg-[#2A2A2A]">
            <img
              src={Na}
              className="ml-1 mt-1 mb-1 w-[25px] h-[25px] object-cover rounded-2xl  bg-lightgray bg-center bg-cover bg-no-repeat"
            />
            <div className="relative w-[100px] overflow-hidden">
              <p
                className="items-center animate-marquee text-gray-100"
                id="truncate-text">
                {username}
              </p>
            </div>

            <img
              className="absolute right-4"
              src={selectUser}
              onClick={() => {
                setDropdown(!dropdown);
              }}
            />
          </div>
          {dropdown ? (
            <div className="py-2 space-y-2 w-[180px] absolute top-[64px] rounded-lg z-10 bg-[#2A2A2A] text-white">
              <div className="text-center hover:underline hover:bg-slate-500">
                Profile
              </div>
              <div
                onClick={handleLogout}
                className="text-center hover:underline hover:bg-slate-500">
                Log out
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Userbar;