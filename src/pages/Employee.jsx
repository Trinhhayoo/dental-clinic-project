
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

import { useNavigate } from "react-router-dom"; 


import { FaPlus } from "react-icons/fa6";

import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";

import {
    useGetEmployeeListQuery,
    useGetEmployeeListFilterGenderQuery
} from "../redux/services/CoreApi";
import { getEmpList, filterEmpGenderRole } from "../redux/services/Api";
import { useDispatch, useSelector } from "react-redux";

const EmpComponent = ({ emp }) => {





    return (
        <div>




            <div className='w-full grid grid-cols-[2fr,2fr,2fr,2fr,2fr,0.5fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
                <h3 className='font-bold text-base text-100 '>
                    {emp?.empName}
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
                    <MdEdit />
                    <MdDelete className="text-red-500" />
                </div>


            </div>



        </div>
    )


};
const Employee = () => {
    // const { username } = useSelector((state) => state.user);
    // const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = React.useState(1);
    const [employees, setEmployee] = useState([]);
    const [filterGender, setFilterGender] = useState('Giới tính');
    const [filterRole, setFilterRole] = useState("Role");
   // Đảm bảo fetchData không thay đổi khi component re-render
    // Fetch data callback
  // Fetch data callback
  useEffect(() => {
    const FetchData = async () =>{
     
      try {
        const {data: response} = await getEmpList();
        setEmployee(response);
      } catch (error) {
        console.error(error.message);
      }
      
    }

    FetchData();
  }, []);
  
  useEffect(() => {
    const FetchData = async (filterGender, filterRole) => {
        try {
            const {data: response} = await filterEmpGenderRole(filterGender, filterRole);
            
          setEmployee(response);
          console.log(employees);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    FetchData(filterGender,filterRole);
  }, [filterGender, filterRole]);

  

      
    const handleOptionGender = (gender) => {
        setFilterGender(gender);
        
    };
    const handleOptionRole = (role) => {
        setFilterRole(role);
        
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

<<<<<<< HEAD
    return (
        <div>


            <div className=' px-4 mt-4 border-none bg-gray-200 grid grid-cols-[2fr,2fr,2fr,2fr,2fr,0.5fr] rounded-mds  font-bold py-4'>

                <p>Employee's Name</p>
                <p>Gender</p>
                <p className='hidden md:flex '>Contact</p>
                <p>Role</p>
                <p>Patient ID</p>

            </div>
            <div className="mt-4 flex flex-col gap-1 ">
                {visibleDentists?.map((emp, index) => (

                    <div key={index} className='w-full grid grid-cols-[2fr,2fr,2fr,2fr,2fr,0.5fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
                        <h3 className='font-bold text-base text-100 '>
                            {emp?.NAME}
                        </h3>
                        
                        <div className='flex flex-row  items-center  gap-6 '>



                            <p className='text-black-100 '>
                                {emp?.GENDER}

                            </p>

                        </div >
                        <div>
                            Female
                        </div>
                        <div className="hidden md:flex flex-col">
                            <p className='text-gray-400   text-xs mt-1'>
                                {emp?.DATE_OF_BIRTH}
                            </p>
                            <p className='text-gray-400  text-xs mt-1'>
                                {/* {song?.subtitle} */}
                                {emp?.ADDRESS}
                            </p>


                        </div>
                        <p>{emp?.EMPLOYEE_ID}</p>
                        <div className="flex flex-row gap-2"> 
                            <MdEdit  />
                            <MdDelete className="text-red-500" />
                        </div>
                        
                        
                    </div>
                ))}
            </div>
            <div className="flex flex-row">
            {employees.length < itemsPerPage * currentPage && (
                <div className="flex justify-end mt-4">
                    <button
                        className="text-blue-700 hover:underline focus:outline-none"
                        onClick={handlePrevPage}
                    >
                        <MdOutlineKeyboardDoubleArrowLeft size={30} />
                    </button>
                </div>
            )}
            {employees.length > itemsPerPage * currentPage && (
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
const Employee = () => {
    const { username } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        navigate('/AddEmployeeForm');
      };

=======
>>>>>>> 54da7e04262720775fb91f2fb094c077f4399b14

    return (
        <div className="flex flex-col my-5">
            <div className="flex flex-row mb-4 items-center ">

                <h2 className=" flex-grow text-black font-bold">Employee List</h2>
                <Button
                    id="addEmployee"
                    onClick={handleAddButtonClick}
                    //onClick={handleSignIn}
                    className="border-none  bg-purple-500 py-4 px-4 flex flex-row items-center gap-2">

                    <FaPlus className="flex" size={15} />
                    <p className="flex">Add Employee</p>
                </Button>
            </div>
            <div className="flex flex-row">
                <form className="w-full" >
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class=" relative w-full items-center ">

                        <input type="search" id="default-search" class="   w-2/5   p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Employee name, employee id..." required />
                        <CiSearch type="submit" size={20} class=" absolute start-2.5 top-2.5 text-black cursor-pointer" />
                    </div>
                </form>
                <div className="relative">
                    <button className="border-none flex flex-row items-center gap-2" onClick={() => handleOptionRole('Role')}>
                        <p className="text-black">{filterRole}</p>
                        <CiFilter size={30} />
                    </button>

                    <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-md py-2 w-40">
                        <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionRole('Admin')}>Admin</p>
                        <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionRole('Dentist')}>Dentist</p>
                        <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionRole('Staff')}>Staff</p>
                        <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionRole('All')}>Tất Cả</p>
                    </div>
                </div>
                <div className="relative">
                    <button className="border-none flex flex-row items-center gap-2" onClick={() => handleOptionGender('Giới tính')}>
                        <p className="text-black">{filterGender}</p>
                        <CiFilter size={30} />
                    </button>

                    <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-md py-2 w-40">
                        <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionGender('Nam')}>Nam</p>
                        <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionGender('Nu')}>Nữ</p>
                        <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionGender('All')}>Tất Cả</p>
                    </div>
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
                    <EmpComponent key={index} emp={emp} />
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


