

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Loader, Error } from "../components";
import { CiFilter } from "react-icons/ci";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";


  
  

import { FaPlus } from "react-icons/fa6";

import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { HandleDelele } from '../components';

import {getRequestList,addRequest,filterRequestShift,searchRequest,deleteRequestID, findPatient ,filterRequestStatus} from "../redux/services/Api";
import { useDispatch, useSelector } from "react-redux";


const RequestComponent = ({ requestDetail, handleDeleteClick }) => {






    return (
        <div>

            <div className='w-full grid grid-cols-[2fr,2fr,2fr,2fr,2fr,0.5fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
                <h3 className='font-bold text-base text-100 '>


                    <Link className="pt-1" to={`/request/${requestDetail?.request_id}`}>
                        {requestDetail?.request_id}
                    </Link>



                </h3>

                <div className='flex flex-row  items-center  gap-6 '>



                    <p className='text-black-100 '>
                        {requestDetail?.phoneNumber}

                    </p>

                </div >
                <div>
                    {requestDetail?.noteRequest}
                </div>
                <div className="hidden md:flex flex-col">
                    <p className='text-gray-400   text-xs mt-1'>
                        {requestDetail?.dateRequest}
                    </p>
                    <p className='text-gray-400  text-xs mt-1'>
                        {/* {song?.subtitle} */}
                        {requestDetail?.timeRequest}
                    </p>


                </div>
                <p>{requestDetail?.statusRequest}</p>
                <div className="flex flex-row gap-2">
                   
                    <MdDelete className="text-red-500" onClick={() => handleDeleteClick(requestDetail)} />

                </div>


            </div>



        </div>
    )


};
const Request = () => {
    const { token } = useSelector(
        (state) => state.user
      );
    const navigate = useNavigate();
    const [requests, setRequest] = useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    
   const [filterStatus, setFilterStatus] = useState(null);
    const [filterShift, setFilterShift] = useState(null);
    const [isDropdownOpenStatus, setDropdownOpenStatus] = useState(false);
    const [isDropdownOpenShift, setDropdownOpenShift] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [requestDelete, setRequestDelete] = useState();
   
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const FetchData = async () => {

            try {
                const { data: response } = await getRequestList(token);
               setRequest(response)

            } catch (error) {
                console.error(error.message);
            }

        }

        FetchData();
    }, [isDelete]);
    useEffect(() => {

        const FetchData = async () => {

         debugger
            await deleteRequestID(requestDelete?.request_id, token).then(response => {
                if (response.data != null) {
                    navigate("/deleteSuccess");
                }
            });

        }
        if (isDelete == true) {
            FetchData();
        }


    }, [isDelete]);




    useEffect(() => {

        const FilterData = async (filterShift) => {
            try {
                const { data: response } = await filterRequestShift(filterShift, token);

                setRequest(response);
               
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        if (filterShift != null) {
            FilterData(filterShift);
        }


    }, [filterShift]);
    useEffect(() => {

        const FilterData = async () => {
            try {
                const { data: response } = await filterRequestStatus(filterStatus, token);

                setRequest(response);
               debugger
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        if (filterStatus != null) {
            FilterData();
        }


    }, [filterStatus]);


    const handleDeleteClick = (e) => {
        debugger
        // Open the delete confirmation modal
        setIsDeleteModalOpen(true);
        setRequestDelete(e);


    };

    const handleConfirmDelete = () => {
        // Close the delete confirmation modal
        setIsDeleteModalOpen(false);
        setDelete(true);



    };

    const handleCancelDelete = () => {
        // Close the delete confirmation modal
        setIsDeleteModalOpen(false);
    };
  



    const handleOptionShift = (shift) => {
        setFilterShift(shift);

        setDropdownOpenShift(false); // Đóng dropdown khi chọn một giá trị
    };

    const toggleDropdownStatus = () => {
        setDropdownOpenStatus(!isDropdownOpenStatus);
    };
    const handleOptionStatus= (status) => {
        setFilterStatus(status);

        setDropdownOpenStatus(false); // Đóng dropdown khi chọn một giá trị
    };

    const toggleDropdownShift = () => {
        setDropdownOpenShift(!isDropdownOpenShift);
    };
 


    const itemsPerPage = 6;

    // Assuming you have a state variable to track the current page


    // Calculate the starting index based on the current page and itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleRequest = requests?.slice(startIndex, startIndex + itemsPerPage);

    // Function to handle next page click
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }
    const searchFunc = async () => {

        await searchRequest(searchTerm, token).then(response => {
            setRequest(response.data);
            console.log(requests)
        });
       
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        //chuyển sang trang chứa kết quả search
        searchFunc();

    };


    return (
        <div className="flex flex-col my-5">
            <div className="flex flex-row mb-4 items-center ">

                <h2 className=" flex-grow text-black font-bold">Request List</h2>
                <Link className="pt-1" to={`/AddRequestForm`}>
                    <Button


                        className="border-none  bg-purple-500 py-4 px-4 flex flex-row items-center gap-2">

                        <FaPlus className="flex" size={15} />
                        <p className="flex">Add Request</p>
                    </Button>
                </Link>

            </div>
            <div className="flex flex-row">
                <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="w-full" >
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class=" relative w-full items-center ">

                        <input
                            name="search-field"
                            autoComplete="off"
                            id="search-field"
                            type="search"
                            value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                            class="   w-2/5   p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Employee name, employee id..." required />
                        <CiSearch type="submit" size={20} class=" absolute start-2.5 top-2.5 text-black cursor-pointer" />
                    </div>
                </form>
              
                <div className="relative">
                    <button className="border-none flex flex-row items-center gap-2" onClick={() => toggleDropdownShift()}>
                        <p className="text-black">{filterShift}</p>
                        <CiFilter size={30} />
                    </button>

                    {isDropdownOpenShift && (
                        <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-md py-2 w-40">
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionShift('Sang')}>Sáng</p>
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionShift('Chieu')}>Chiều</p>
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionShift('All')}>Tất Cả</p>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button className="border-none flex flex-row items-center gap-2" onClick={() => toggleDropdownStatus()}>
                        <p className="text-black">{filterStatus}</p>
                        <CiFilter size={30} />
                    </button>

                    {isDropdownOpenStatus && (
                        <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-md py-2 w-40">
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionStatus('Accepted')}>Accepted</p>
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionStatus('Declined')}>Declined</p>
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionStatus('pending')}>pending</p>
                        </div>
                    )}
                </div>




            </div>

            <div className=' px-4 mt-4 border-none bg-gray-200 grid grid-cols-[2fr,2fr,2fr,2fr,2fr,0.5fr] rounded-mds  font-bold py-4'>

                <p>Request ID</p>
                <p>PhoneNumber</p>
                <p>Note</p>
               
                <p>Date Time</p>
                <p>Status</p>

            </div>
            <div className="mt-4 flex flex-col gap-1 ">
                {visibleRequest?.map((request, index) => (
                    <React.Fragment key={index}>
                        <RequestComponent requestDetail={request} isDelete={isDelete} handleDeleteClick={handleDeleteClick} />
                        {isDeleteModalOpen && (
                            <HandleDelele handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} requestDetail ={request} />
                        )}
                    </React.Fragment>
                ))}

            </div>
            <div className="flex flex-row">
                {currentPage > 1 && (
                    <div className="flex justify-end mt-4">
                        <button
                            className="text-blue-700 hover:underline focus:outline-none"
                            onClick={handlePrevPage}
                        >
                            <MdOutlineKeyboardDoubleArrowLeft size={30} />
                        </button>
                    </div>
                )}
                {requests?.length > itemsPerPage * currentPage && (
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

export default Request;
