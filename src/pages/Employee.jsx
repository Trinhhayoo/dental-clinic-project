
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

import { getEmpList, filterEmpGenderRole, deleteEmpID, searchEmp } from "../redux/services/Api";
import { useDispatch, useSelector } from "react-redux";

const EmpComponent = ({ emp, handleDeleteClick }) => {




debugger

    return (
        <div>

            <div className='w-full grid grid-cols-[2fr,2fr,2fr,2fr,2fr,0.5fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
                <h3 className='font-bold text-base text-100 '>
                    {
                        emp.role == "Dentist" && <Link className="pt-1" to={`/Dentist/${emp.UserID}/${emp.employeeID}`}>
                            {emp?.empName}
                        </Link>
                    }
                    {emp.role != "Dentist" &&
                        <Link className="pt-1" to={`/Employee/${emp.employeeID}`}>
                            {emp?.empName}
                        </Link>
                    }


                </h3>

                <div className='flex flex-row  items-center  gap-6 '>



                    <p className='text-black-100 '>
                        {emp?.gender}

                    </p>

                </div >
                <div>
                    {emp.role}
                </div>
                <div className="hidden md:flex flex-col">
                    <p className='text-gray-400   text-xs mt-1'>
                        {emp?.dob}
                    </p>
                    <p className='text-gray-400  text-xs mt-1'>
                        {/* {song?.subtitle} */}
                        {emp?.address}
                    </p>


                </div>
                <p>{emp?.employeeID}</p>
                <div className="flex flex-row gap-2">
                <Link className="pt-1" to={`/EditEmployee/${emp?.employeeID}`}>
                <MdEdit />
                        </Link>
                    


                    <MdDelete className="text-red-500" onClick={() => handleDeleteClick(emp)} />

                </div>


            </div>



        </div>
    )


};
const Employee = () => {


    const [currentPage, setCurrentPage] = React.useState(1);
    const [employees, setEmployee] = useState([]);
    const [filterGender, setFilterGender] = useState(null);
    const [filterRole, setFilterRole] = useState(null);
    const [isDropdownOpenGender, setDropdownOpenGender] = useState(false);
    const [isDropdownOpenRole, setDropdownOpenRole] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [empDelete, setEmpDelete] = useState();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    // Đảm bảo fetchData không thay đổi khi component re-render
    // Fetch data callback
    // Fetch data callback
    useEffect(() => {
        const FetchData = async () => {

            try {
                const { data: response } = await getEmpList();
                setEmployee(response);

            } catch (error) {
                console.error(error.message);
            }

        }

        FetchData();
    }, []);



    useEffect(() => {

        const FetchData = async () => {

            const userData = {
                "empID": empDelete?.employeeID,
            };

            await deleteEmpID(empDelete?.UserID, userData).then(response => {
                if (response.data == "delete success") {
                    navigate("/deleteSuccess");
                }
            });

        }
        if (isDelete == true) {
            FetchData();
        }


    }, [isDelete]);




    useEffect(() => {

        const FilterData = async (filterGender, filterRole) => {
            try {
                const { data: response } = await filterEmpGenderRole(filterGender, filterRole);

                setEmployee(response);
                console.log(employees);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        if (filterGender != null || filterRole != null) {
            FilterData(filterGender, filterRole);
        }


    }, [filterGender, filterRole]);



    // useEffect(() => {


    //     toggleDropdownGender();
    // }, [filterGender]);

    // useEffect(() => {


    //     toggleDropdownRole();
    // }, [filterRole]);

    const handleDeleteClick = (e) => {
        // Open the delete confirmation modal
        setIsDeleteModalOpen(true);
        setEmpDelete(e);


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


    const itemsPerPage = 6;

    // Assuming you have a state variable to track the current page


    // Calculate the starting index based on the current page and itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleEmp = employees?.slice(startIndex, startIndex + itemsPerPage);

    // Function to handle next page click
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }




    const handleOptionRole = (role) => {
        setFilterRole(role);

        setDropdownOpenRole(false); // Đóng dropdown khi chọn một giá trị
    };

    const toggleDropdownRole = () => {
        setDropdownOpenRole(!isDropdownOpenRole);
    };



    const handleOptionGender = (gender) => {
        setFilterGender(gender);

        setDropdownOpenGender(false); // Đóng dropdown khi chọn một giá trị
    };

    const toggleDropdownGender = () => {
        setDropdownOpenGender(!isDropdownOpenGender);
    };
    const searchFunc = async () => {

        await searchEmp(searchTerm).then(response => {
            setEmployee(response.data);


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

                <h2 className=" flex-grow text-black font-bold">Employee List</h2>
                <Link className="pt-1" to={`/AddEmployee/`}>
                <Button
                   
                   
                   className="border-none  bg-purple-500 py-4 px-4 flex flex-row items-center gap-2">

                   <FaPlus className="flex" size={15} />
                   <p className="flex">Add Employee</p>
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
                    <button className="border-none flex flex-row items-center gap-2" onClick={() => toggleDropdownRole()} >
                        <p className="text-black">{filterRole}</p>
                        <CiFilter size={30} />
                    </button>
                    {isDropdownOpenRole && (
                        <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-md py-2 w-40">
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionRole('Admin')}>Admin</p>
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionRole('Dentist')}>Dentist</p>
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionRole('Staff')}>Staff</p>
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionRole('All')}>Tất Cả</p>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button className="border-none flex flex-row items-center gap-2" onClick={() => toggleDropdownGender()}>
                        <p className="text-black">{filterGender}</p>
                        <CiFilter size={30} />
                    </button>

                    {isDropdownOpenGender && (
                        <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-md py-2 w-40">
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionGender('Nam')}>Nam</p>
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionGender('Nu')}>Nữ</p>
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionGender('All')}>Tất Cả</p>
                        </div>
                    )}
                </div>




            </div>

            <div className=' px-4 mt-4 border-none bg-gray-200 grid grid-cols-[2fr,2fr,2fr,2fr,2fr,0.5fr] rounded-mds  font-bold py-4'>

                <p>Employee's Name</p>
                <p>Gender</p>
                <p className='hidden md:flex '>Role</p>
                <p>Address</p>
                <p>Patient ID</p>

            </div>
            <div className="mt-4 flex flex-col gap-1 ">
                {visibleEmp?.map((emp, index) => (
                    <React.Fragment key={index}>
                        <EmpComponent emp={emp} isDelete={isDelete} handleDeleteClick={handleDeleteClick} />
                        {isDeleteModalOpen && (
                            <HandleDelele handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} empDetail={emp} />
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
                {employees?.length > itemsPerPage * currentPage && (
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
export default Employee;


