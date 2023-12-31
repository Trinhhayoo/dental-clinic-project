

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

import { getAppointmentlist, addRequest, filterRequestShift, getAppointmentByPatient, deleteRequestID, findPatient, filterRequestStatus } from "../redux/services/Api";
import { useDispatch, useSelector } from "react-redux";


const AppointmentComponent = ({ appointmentDetail, handleDeleteClick }) => {


    const formatDate = (datetimeString) => {
        const date = new Date(datetimeString);
        return date.toLocaleDateString(); // Adjust the format as needed
    };



    return (
        <div>

            <div className='w-full grid grid-cols-[1.5fr,1fr,1fr,2fr,2fr,0.5fr,0.5fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
                <h3 className='font-bold text-base text-100 '>


                    <Link className="pt-1" to={`/Appointment/${appointmentDetail?.appointmentID}`}>
                        {appointmentDetail?.appointmentID}
                    </Link>



                </h3>
                <div className="hidden md:flex flex-col">
                    <p className='text-gray-400   text-xs mt-1'>
                        {formatDate(appointmentDetail?.date)}
                    </p>
                    <p className='text-gray-400  text-xs mt-1'>
                        {/* {song?.subtitle} */}
                        {appointmentDetail?.time}
                    </p>


                </div>

                <div className="hidden md:flex flex-col">
                    <p className='text-gray-400   text-xs mt-1'>
                        {appointmentDetail?.roomID}
                    </p>
                    <p className='text-gray-400  text-xs mt-1'>
                        {/* {song?.subtitle} */}
                        {appointmentDetail?.orderNumber}
                    </p>


                </div>
                <div>
                    {appointmentDetail?.patientName}
                </div>
                <div>
                    <Link to={`/Dentist/${appointmentDetail?.dentistID}/${appointmentDetail?.EmpID}`} >

                        {appointmentDetail?.dentistName}
                    </Link>
                </div>
                <p>{appointmentDetail?.status}</p>

                <div className="flex flex-row gap-2">

                    <MdDelete className="text-red-500" onClick={() => handleDeleteClick(appointmentDetail)} />

                </div>


            </div>



        </div>
    )


};
const Appointment = () => {
    const { token } = useSelector(
        (state) => state.user
    );
    const navigate = useNavigate();
    const [appointments, setAppointment] = useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);

    const [filterStatus, setFilterStatus] = useState(null);
    const [filterShift, setFilterShift] = useState(null);
    const [isDropdownOpenStatus, setDropdownOpenStatus] = useState(false);
    const [isDropdownOpenShift, setDropdownOpenShift] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [requestDelete, setRequestDelete] = useState();

    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpenRoom, setDropdownOpenRoom] = useState(false);
    const [filterRoom, setFilterRoom] = useState(null);

    // Generate an array of room names from 1 to 110
    const roomNames = Array.from({ length: 110 }, (_, index) => `Phòng ${index + 1}`);

    const toggleDropdownRoom = () => {
        setDropdownOpenRoom(!isDropdownOpenRoom);
    };

    const handleOptionRoom = (room) => {
        setFilterRoom(room);
        setDropdownOpenRoom(false); // Đóng dropdown sau khi chọn
        // Thêm logic của bạn để xử lý sự kiện khi chọn một tùy chọn
    };

    useEffect(() => {
        const FetchData = async () => {

            try {
                const { data: response } = await getAppointmentlist(token);
                setAppointment(response);
                debugger

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

                setAppointment(response);
                

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

                setAppointment(response);

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
    const handleOptionStatus = (status) => {
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
    const visibleAppointment = appointments?.slice(startIndex, startIndex + itemsPerPage);

    // Function to handle next page click
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }
    const searchFunc = async () => {

        await getAppointmentByPatient(searchTerm, token).then(response => {
            setAppointment(response.data);
            debugger
            console.log(appointments)
        });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        //chuyển sang trang chứa kết quả search
        searchFunc();

    };
    console.log(visibleAppointment);

    return (
        <div className="flex flex-col my-5 ">
            <div className="flex flex-row mb-4 items-center ">

                <h2 className=" flex-grow text-black font-bold">Request List</h2>
                <Link className="pt-1" to={`/AddAppointmentForm`}>
                    <Button


                        className="border-none  bg-purple-500 py-4 px-4 flex flex-row items-center gap-2">

                        <FaPlus className="flex" size={15} />
                        <p className="flex">Add Appointment</p>
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
                        {
                            <p className="text-black">
                                {filterShift ? filterShift : "Buổi"}
                            </p>
                        }
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
                    <button className="border-none flex flex-row items-center gap-2" onClick={toggleDropdownRoom}>
                        {
                            <p className="text-black">
                                {filterRoom ? filterRoom : "Phòng"}
                            </p>
                        }

                        <CiFilter size={30} />
                    </button>

                    {isDropdownOpenRoom && (
                        <div className=" h-[calc(100vh-80vh)]  overflow-y-scroll hide-scrollbar  absolute top-full mt-2 bg-white border border-gray-300 rounded-md mr-4 py-2 w-40">
                            {roomNames?.map((roomName, index) => (
                                <p
                                    key={index}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                                    onClick={() => handleOptionRoom(roomName)}
                                >
                                    {roomName}
                                    <CiFilter size={20} />
                                </p>
                            ))}
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
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionStatus('NEW')}>New</p>
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionStatus('RETREATMENT')}>RETREATMENT</p>
                        </div>
                    )}
                </div>




            </div>

            <div className=' px-4 mt-4 border-none bg-gray-200 grid grid-cols-[1.5fr,1fr,1fr,2fr,2fr,0.5fr,0.5fr] rounded-mds  font-bold py-4'>

                <p>Appointment ID</p>
                <div className="flex flex-col">
                    <p className="text-xs">Date</p>
                    <p className="text-xs">Time</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-xs">Room</p>
                    <p className="text-xs">Order</p>
                </div>

                <p>Patient</p>
                <p>Dentist</p>
                <p>Status</p>


            </div>
            <div className="mt-4 flex flex-col gap-1 ">
                {visibleAppointment?.map((appointment, index) => (
                    <React.Fragment key={index}>
                        <AppointmentComponent appointmentDetail={appointment} isDelete={isDelete} handleDeleteClick={handleDeleteClick} />
                        {isDeleteModalOpen && (
                            <HandleDelele handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} appointmentDetail={appointment} />
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
                {appointments?.length > itemsPerPage * currentPage && (
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

export default Appointment;
