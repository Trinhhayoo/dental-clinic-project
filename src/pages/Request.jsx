import { useSelector } from "react-redux/es/hooks/useSelector";
import { MdKeyboardDoubleArrowRight, MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { FaMale, FaFemale } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import request from "../assets/request.json"
import { useNavigate } from "react-router-dom"; 


const Recentrequest = ({ recentrequest }) => {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visiblerequests = recentrequest.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <div>
            <div className='px-4 mt-4 border-none bg-gray-200 grid grid-cols-[2fr,2fr,2fr,2fr,2fr,2fr] rounded-mds font-bold py-4'>
                <p>Request Number</p>
                <p>Patient Name</p>
                <p>Phone</p>
                <p>Time</p>
                <p>Note</p>
                <p>Status</p>
            </div>
            <div className="mt-4 flex flex-col gap-1">
                {visiblerequests.map((request, index) => (
                    <div key={index} className='w-full grid grid-cols-[2fr,2fr,2fr,2fr,2fr,2fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
                        <h3 className='font-bold text-base text-100 '>
                            {request.REQUEST_ID}
                        </h3>
                        <div className='flex flex-row  items-center  gap-6 '>
                            <p className='text-black-100 '>
                                {request?.RQ_NAME}
                            </p>
                        </div>
                        <div>
                            <p className='text-black-100 '>
                                {request?.RQ_PHONE}
                            </p>
                        </div>
                        <div className="hidden md:flex flex-col">
                            <p className='text-black-400   text-xs mt-1'>
                                {request.RQ_DATE}
                            </p>
                            <p className='text-black-400  text-xs mt-1'>
                                {request.RQ_TIME}
                            </p>
                        </div>
                        <p>{request.RQ_NOTE}</p>
                        <div className = 'flex items-center justify-center'>
                        {request.RQ_STATUS === "Confirmed" && (
                            <button className="border flex border-none rounded-md w-full my-[2px] px-[4px] items-center justify-center bg-blue-100 text-blue-500 text-[15px] ">
                                Confirmed
                            </button>
                        )}
                        {request.RQ_STATUS === "Declined" && (
                            <button className="border flex border-none rounded-md w-full my-[2px] px-[5px] items-center justify-center bg-red-100 text-red-500 text-[15px] ">
                                Decline
                            </button>
                        )}
                        {request.RQ_STATUS === "Pending" && (
                            <div className="flex gap-2">
                                <button className="bg-white-500 text-blue py-1 px-2 rounded-md border border-green-600">
                                    <MdOutlineCheck size={20} />
                                </button>
                                <button className="bg-white-500 text-red py-1 px-2 rounded-md border border-red-600">
                                    <MdOutlineClose size={20} />
                                </button>
                            </div>
                        )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-row">
                {recentrequest.length < itemsPerPage * currentPage && (
                    <div className="flex justify-end mt-4">
                        <button
                            className="text-blue-700 hover:underline focus:outline-none"
                            onClick={handlePrevPage}
                        >
                            <MdOutlineKeyboardDoubleArrowLeft size={30} />
                        </button>
                    </div>
                )}
                {recentrequest.length > itemsPerPage * currentPage && (
                    <div className="flex justify-end mt-4 flex-grow">
                        <button
                            className="text-blue-700 hover:underline focus:outline-none"
                            onClick={handleNextPage}
                        >
                            <MdOutlineKeyboardDoubleArrowRight size={30} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Request = () => {
    const { username } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        navigate('/AddRequestForm');
      };

    return (
        <div className="flex flex-col my-5">
            <div className="flex flex-row mb-4 items-center ">
                <h2 className=" flex-grow text-black font-bold">Request List</h2>
                <Button
                    id="addRequest"
                    onClick={handleAddButtonClick}
                    className="border-none bg-purple-500 py-4 px-4 flex flex-row items-center gap-2"
                >
                    <FaPlus className="flex" size={15} />
                    <p className="flex">Add request</p>
                </Button>
            </div>
            <div className="flex">
                <form className="w-full" >
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative w-full items-center ">
                        <input type="search" id="default-search" className="w-2/5 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="request name, request id..." required />
                        <CiSearch type="submit" size={20} className="absolute start-2.5 top-2.5 text-black cursor-pointer" />
                    </div>
                </form>
            </div>
            <Recentrequest recentrequest={request} />
        </div>
    );
};

export default Request;
