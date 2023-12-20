import { useSelector } from "react-redux/es/hooks/useSelector";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

import treatmentplan from "../assets/treatmentplan.json"
import { FaPlus } from "react-icons/fa6";

import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"; 



const Recenttreatmentplan = ({ recenttreatmentplan }) => {
    const navigate = useNavigate();
    const handleEditButtonClick = (treatmentplanId) => {
        navigate(`/EdittreatmentplanForm/${treatmentplanId}`);
    };

    const itemsPerPage = 6;

    // Assuming you have a state variable to track the current page
    const [currentPage, setCurrentPage] = React.useState(1);

    // Calculate the starting index based on the current page and itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibletreatmentplans = recenttreatmentplan.slice(startIndex, startIndex + itemsPerPage);

    // Function to handle next page click
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <div>


            <div className=' px-4 mt-4 border-none bg-gray-200 grid grid-cols-[1fr,2fr,2fr,2fr,3fr,2fr,1fr] rounded-mds  font-bold py-4'>

                <p>Number</p>
                <p>Patient</p>
                <p>Precription</p>
                <p>Dentist</p>
                <p>Note</p>
                <p>Status</p>

            </div>
            <div className="mt-4 flex flex-col gap-1 ">
                {visibletreatmentplans.map((treatmentplan, index) => (

                    <div key={index} className='w-full grid grid-cols-[1fr,2fr,2fr,2fr,3fr,2fr,1fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
                        <h3 className='font-bold text-base text-100 '>
                            {treatmentplan.TREATMENT_PLAN_ID}
                        </h3>

                        <div className='flex flex-row  items-center  gap-6 '>



                            <p className='text-black-100 '>
                                {treatmentplan.TP_PATIENT_ID}

                            </p>

                        </div >
                        <div>
                        <p>{treatmentplan.TP_PRESCRIPTION}</p>
     
                        </div>
                        <div className="hidden md:flex flex-col">
                            <p className='text-gray-400   text-xs mt-1'>
                                {treatmentplan.TP_DENTIST_ID}
                            </p>
                            <p className='text-gray-400  text-xs mt-1'>
                                {/* {song?.subtitle} */}
                                {treatmentplan.TP_ASSISTANT_ID}
                            </p>


                        </div>
                        <p>{treatmentplan.TP_NOTE}</p>
                        <p>{treatmentplan.TP_STATUS}</p>
                          
                        <Button
                            id="edittreatmentplan"
                            onClick={() => handleEditButtonClick(treatmentplan.treatmentplan_ID)}
                            //onClick={handleSignIn}
                            className="border-none  bg-purple-500 py-4 px-4 flex flex-row items-center gap-2">

                            <FaPlus className="flex" size={15} />
                            <p className="flex">Edit</p>
                        </Button>


                    </div>
                ))}
            </div>
            <div className="flex flex-row">
            {recenttreatmentplan.length < itemsPerPage * currentPage && (
                <div className="flex justify-end mt-4">
                    <button
                        className="text-blue-700 hover:underline focus:outline-none"
                        onClick={handlePrevPage}
                    >
                        <MdOutlineKeyboardDoubleArrowLeft size={30} />
                    </button>
                </div>
            )}
            {recenttreatmentplan.length > itemsPerPage * currentPage && (
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
const TreatmentPlan = () => {
    const { username } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        navigate('/AddTreatmentPlan');
      };
    return (
        <div className="flex flex-col my-5">
            <div className="flex flex-row mb-4 items-center ">

                <h2 className=" flex-grow text-black font-bold">treatmentplan List</h2>
                <Button
                    id="addtreatmentplan"
                    onClick={handleAddButtonClick}
                    //onClick={handleSignIn}
                    className="border-none  bg-purple-500 py-4 px-4 flex flex-row items-center gap-2">

                    <FaPlus className="flex" size={15} />
                    <p className="flex">Add treatmentplan</p>
                </Button>
            </div>
            <div className="flex">
                <form className="w-full" >
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class=" relative w-full items-center ">

                        <input type="search" id="default-search" class="   w-2/5   p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="treatmentplan name, treatmentplan id..." required />
                        <CiSearch type="submit" size = {20} class=" absolute start-2.5 top-2.5 text-black cursor-pointer" />
                    </div>
                </form>
            </div>



            <Recenttreatmentplan recenttreatmentplan={treatmentplan} />
         

        </div>
    )


};
export default TreatmentPlan;
