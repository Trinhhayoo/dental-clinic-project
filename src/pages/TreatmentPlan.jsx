// Import các biểu tượng và thư viện khác...
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useSelector } from "react-redux/es/hooks/useSelector";
import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import ttPlanData from "../assets/tt_plan.json";
import teethData from "../assets/teeth.json";
import surfaceData from "../assets/surface.json";
import treatmentData from "../assets/treatment.json";
import treatmentplan from "../assets/treatmentplan.json";
import EmployeeList from "../assets/employee.json";
import TeethListModal from './TeethListModal';
import patient from "../assets/patient.json"
import { Link } from 'react-router-dom';


   
const Recenttreatmentplan = ({ recenttreatmentplan }) => {
  const navigate = useNavigate();
  

  const handleViewButtonClick = (treatmentplanId) => {
      navigate(`/TreatmentPlanDetail/${treatmentplanId}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreatmentPlan, setSelectedTreatmentPlan] = useState(null);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibletreatmentplans = recenttreatmentplan.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  }


  return (
    <div>
      <div className='px-4 mt-4 border-none bg-gray-200 grid grid-cols-[2fr,2fr,2fr,2fr,2fr,1fr,1fr] rounded-mds font-bold py-4'>
        <p>Number</p>
        <p>Patient</p>
        <p>Dentist</p>
        <p>Precription</p>
        <p>Treatment</p>
        <p></p>
        <p></p>
      </div>

      <div className="mt-4 flex flex-col gap-1 ">
        {visibletreatmentplans.map((treatmentplan, index) => {
          const ttPlan = ttPlanData.find(tt => tt.TT_TREATMENT_PLAN_ID === treatmentplan.TREATMENT_PLAN_ID);

          return (
            <div key={index} className='w-full grid grid-cols-[2fr,2fr,2fr,2fr,2fr,1fr,1fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
              <h3 className='font-bold text-base text-100 '>
                {treatmentplan.TREATMENT_PLAN_ID}
              </h3>

              <div className='flex flex-row  items-center  gap-6 '>
                <p className='text-black-100 '>
                  {patient.find(patient => patient.PATIENT_ID === treatmentplan.TP_PATIENT_ID)?.PP_NAME}
                </p>
              </div>

              <div className="hidden md:flex flex-col">
                <p className='text-gray-400   text-xs mt-1'>
                  {EmployeeList.find(Employee => Employee.EMPLOYEE_ID === treatmentplan.TP_DENTIST_ID)?.EMP_NAME}
                </p>
                <p className='text-gray-400  text-xs mt-1'>
                  {EmployeeList.find(Employee => Employee.EMPLOYEE_ID === treatmentplan.TP_ASSISTANT_ID)?.EMP_ffNAME}
                </p>
              </div>
              <div>
                <p>{treatmentplan.TP_PRESCRIPTION}</p>
              </div>

              {/* <p className='text-black-100 '>
                {surfaceData.find(surface => surface.SURFACE_TEETH_ID === ttPlan?.TT_SURFACE_ID)?.SURFACE_NAME}
              </p> */}
              <p className='text-black-100 '>
                {treatmentData.find(treatment => treatment.TREATMENT_ID === treatmentplan?.TP_TREATMENT_ID)?.TREATMENT_NAME}
              </p>
              <Button
                id="edittreatmentplan"
                onClick={() => handleViewButtonClick(treatmentplan.TREATMENT_PLAN_ID)}
                //onClick={handleSignIn}
                className="border-none  bg-purple-500 py-4 px-7 flex flex-row items-center gap-2">
                <p className="flex">View</p>
            </Button>
            <Button
                id="edittreatmentplan"
               // onClick={() => handleViewButtonClick(treatmentplan.TREATMENT_PLAN_ID)}
                //onClick={handleSignIn}
                className="border-none  bg-purple-500 py-4 px-7 flex flex-row items-center gap-2">
                <p className="flex">Delete</p>
            </Button>
            </div>
          );
        })}
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
  );
};

const TreatmentPlan = () => {
  const { username } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // const handleAddButtonClick = () => {
  //   navigate('/AddTreatmentPlan');
  // };

  return (
    <div className="flex flex-col my-5">
      <div className="flex flex-row mb-4 items-center ">
        <h2 className=" flex-grow text-black font-bold">Treatmentplan List</h2>
        {/* <Button
          id="addtreatmentplan"
          onClick={handleAddButtonClick}
          className="border-none  bg-purple-500 py-4 px-4 flex flex-row items-center gap-2">
          <FaPlus className="flex" size={15} />
          <p className="flex">Add treatmentplan</p>
        </Button> */}
        <Link to="/SearchPatient">
          <Button className="border-none bg-purple-500 py-4 px-6 flex items-center gap-2 w-[100%]">
          <FaPlus className="flex" size={15} />

          <p className="flex"> Add treatmentplan</p>
          </Button>
        </Link>
      </div>

      <div className="flex">
        <form className="w-full" >
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative w-full items-center ">
            <input type="search" id="default-search" className="w-2/5 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="treatmentplan name, treatmentplan id..." required />
            <CiSearch type="submit" size={20} className="absolute start-2.5 top-2.5 text-black cursor-pointer" />
          </div>
        </form>
      </div>

      <Recenttreatmentplan recenttreatmentplan={treatmentplan} />
    </div>
  );
};

export default TreatmentPlan;
