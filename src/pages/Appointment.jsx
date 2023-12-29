import { useSelector } from "react-redux/es/hooks/useSelector";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 

import appointment from "../assets/appointment.json"
import employeeList from "../assets/employee.json"
import patientList from "../assets/patient.json"

import { FaPlus } from "react-icons/fa6";

import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";



const Recentappointment = ({ recentappointment }) => {
    const navigate = useNavigate();
    const handleViewButtonClick = (appointmentId) => {
        navigate(`/AppointmentDetail/${appointmentId}`);
    };

    const itemsPerPage = 6;

    // Assuming you have a state variable to track the current page
    const [currentPage, setCurrentPage] = React.useState(1);

    // Calculate the starting index based on the current page and itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleappointments = recentappointment.slice(startIndex, startIndex + itemsPerPage);

    // Function to handle next page click
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <div>


            <div className=' px-4 mt-4 border-none bg-gray-200 grid grid-cols-[2fr,2fr,2fr,2fr,2fr,1fr] rounded-mds  font-bold py-4'>

                <p>Appointmen's number</p>
                <p>Time</p>
                <p>Patient</p>
                <p>Dentist</p>
                <p>Room</p>

                <p>  </p>

            </div>
            <div className="mt-4 flex flex-col gap-1 ">
                {visibleappointments.map((appointment, index) => (

                    <div key={index} className='w-full grid grid-cols-[2fr,2fr,2fr,2fr,2fr,1fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
                        <h3 className='font-bold text-base text-100 '>
                            {appointment.A_ORDER_NUMBER}
                        </h3>

                        <div className="hidden md:flex flex-col">
                            <p className='text-black-400   text-xs mt-1'>
                                {appointment.A_DATE}
                            </p>
                            <p className='text-black-400  text-xs mt-1'>
                                {/* {song?.subtitle} */}
                                {appointment.A_TIME}
                            </p>


                        </div>
                        <div>
                        <p className='text-black-100 '>
                        {patientList.find(patient => patient.PATIENT_ID === appointment.A_PATIENT_ID)?.PP_NAME}

                        </p>
                        </div>
                        
                        <div className="hidden md:flex flex-col">
                        <p className='text-black-100 '>
                        {employeeList.find(employee => employee.EMPLOYEE_ID === appointment.A_DENTIST_ID)?.EMP_NAME}
                        </p>
                           


                        </div>
                        <p>{appointment.A_ROOM_ID}</p>
                        
                        <Button
                            id="editappointment"
                            onClick={() => handleViewButtonClick(appointment.A_ORDER_NUMBER)}
                            //onClick={handleSignIn}
                            className="border-none  bg-purple-500 py-4 px-4 flex flex-row items-center gap-2">

                            <FaPlus className="flex" size={15} />
                            <p className="flex">View</p>
                        </Button>


                    </div>
                    
                ))}
            </div>
            <div className="flex flex-row">
            {recentappointment.length < itemsPerPage * currentPage && (
                <div className="flex justify-end mt-4">
                    <button
                        className="text-blue-700 hover:underline focus:outline-none"
                        onClick={handlePrevPage}
                    >
                        <MdOutlineKeyboardDoubleArrowLeft size={30} />
                    </button>
                </div>
            )}
            {recentappointment.length > itemsPerPage * currentPage && (
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
    )


};
const Appointment = () => {
    const { username } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        navigate('/AddAppointmentForm');
      };

   

    return (
        <div className="flex flex-col my-5">
            <div className="flex flex-row mb-4 items-center ">

                <h2 className=" flex-grow text-black font-bold">Appointment List</h2>
                <Button
                    id="addAppointment"
                    onClick={handleAddButtonClick}
                    //onClick={handleSignIn}
                    className="border-none  bg-purple-500 py-4 px-4 flex flex-row items-center gap-2">

                    <FaPlus className="flex" size={15} />
                    <p className="flex">Add appointment</p>
                    
                </Button>
            </div>
            <div className="flex">
                <form className="w-full" >
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class=" relative w-full items-center ">

                        <input type="search" id="default-search" class="   w-2/5   p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="appointment name, appointment id..." required />
                        <CiSearch type="submit" size = {20} class=" absolute start-2.5 top-2.5 text-black cursor-pointer" />
                    </div>
                </form>
            </div>



            <Recentappointment recentappointment={appointment} />
         

        </div>
    )


};
export default Appointment;