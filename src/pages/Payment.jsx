import { useSelector } from "react-redux/es/hooks/useSelector";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import payment from "../assets/payment.json"
import { FaPlus } from "react-icons/fa6";

import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"; 

const RecentPayment = ({ recentPayment }) => {
    const navigate = useNavigate();
    const handleEditButtonClick = (paymentId) => {
        navigate(`/EditPaymentForm/${paymentId}`);
    };

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = React.useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visiblePayments = recentPayment.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <div>
            <div className=' px-4 mt-4 border-none bg-gray-200 grid grid-cols-[2fr,2fr,2fr,2fr,2fr,1fr] rounded-mds  font-bold py-4'>

                <p>Payment's ID</p>
                <p>Payer</p>
                <p>Contact</p>
                <p>Type</p>
                <p>Status</p>

            </div>
            <div className="mt-4 flex flex-col gap-1 ">
                {visiblePayments.map((payment, index) => (

                    <div key={index} className='w-full grid grid-cols-[2fr,2fr,2fr,2fr,2fr,1fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
                        <p>{payment.PM_TREATMENT_PLAN_ID}</p>

                        <h3 className='font-bold text-base text-100 '>
                            {payment.PAYER}
                        </h3>

                        <div className='flex flex-row  items-center  gap-6 '>
                            <p className='text-black-100 '>
                                {payment?.PAYER_PHONENUMBER}
                            </p>
                        </div >

                        <div className='flex flex-row  items-center  gap-6 '>
                        <p className='text-black-100 '>
                                {payment?.PAYMENT_DATE}
                            </p>
                        </div>

                        <div className="hidden md:flex flex-col">
                            <p className='text-gray-400   text-xs mt-1'>
                                {payment.TYPE_PAY}
                            </p>
                            <p className='text-gray-400  text-xs mt-1'>
                                {/* {song?.subtitle} */}
                                {payment.PAYMENT_STATUS}
                            </p>

                        </div>
                          
                        <Button
                            id="editPaymentForm"
                            onClick={() => handleEditButtonClick(payment.PM_TREATMENT_PLAN_ID)}
                            className="border-none  bg-purple-500 py-3 px-3 flex flex-row items-center gap-1">

                            <FaPlus className="flex" size={15} />
                            <p className="flex">Edit</p>
                        </Button>


                    </div>
                ))}
            </div>
            <div className="flex flex-row">
            {recentPayment.length < itemsPerPage * currentPage && (
                <div className="flex justify-end mt-4">
                    <button
                        className="text-blue-700 hover:underline focus:outline-none"
                        onClick={handlePrevPage}
                    >
                        <MdOutlineKeyboardDoubleArrowLeft size={30} />
                    </button>
                </div>
            )}
            {recentPayment.length > itemsPerPage * currentPage && (
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
const Payment = () => {
    const { username } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        navigate('/AddPaymentForm');
      };
    return (
        <div className="flex flex-col my-5">
            <div className="flex flex-row mb-4 items-center ">

                <h2 className=" flex-grow text-black font-bold">Payment List</h2>
                <Button
                    id="addpayment"
                    onClick={handleAddButtonClick}
                    className="border-none  bg-purple-500 py-4 px-4 flex flex-row items-center gap-2">

                    <FaPlus className="flex" size={15} />
                    <p className="flex">Add Payment</p>
                </Button>
            </div>
            <div className="flex">
                <form className="w-full" >
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class=" relative w-full items-center ">

                        <input type="search" id="default-search" class="   w-2/5   p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Payer, Payment's id..." required />
                        <CiSearch type="submit" size = {20} class=" absolute start-2.5 top-2.5 text-black cursor-pointer" />
                    </div>
                </form>
            </div>
            <RecentPayment recentPayment={payment} />
        </div>
    )
};
export default Payment;