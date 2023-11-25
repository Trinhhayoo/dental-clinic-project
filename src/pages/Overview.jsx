import { useSelector } from "react-redux/es/hooks/useSelector";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import request from "../assets/request.json";
import appointment from "../assets/appointment.json";
import patient from "../assets/patient.json"
import { IoMdCheckmark } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import React, { useEffect, useState } from 'react';

import { reports } from "../assets";

const GenderCircle = ({ maleCount, femaleCount }) => {
  const [malePercentage, setMalePercentage] = useState(0);
  const [femalePercentage, setFemalePercentage] = useState(0);

  useEffect(() => {
    const total = maleCount + femaleCount;
    const malePercentage = (maleCount / total) * 100;
    const femalePercentage = (femaleCount / total) * 100;

    setMalePercentage(malePercentage);
    setFemalePercentage(femalePercentage);
  }, [maleCount, femaleCount]);

  return (
    <div className=" flex flex-col">
      <div className="flex items-center flex-row pb-2 ">
        <p className="flex flex-grow font-bold">Gender</p>
      </div>
      <div className="h-[calc(100vh-75vh)]  px-4 py-4 bg-white flex flex-col  items-center rounded-lg ">

        <div
          className=" w-24 h-24 mb-4 rounded-full bg-transparent"
          style={{
            background: `conic-gradient(
            yellow ${femalePercentage}%, 
            transparent ${femalePercentage}% ${malePercentage}%, 
            blue ${malePercentage}%
          )`
          }}
        ></div>

        <div className=" items-center flex flex-row gap-4">
          <div className="w-3 h-3 items-center flex rounded-full bg-yellow-200 "></div>
          <div className="flex flex-col justify-center"> <p className="text-gray-500 flex items-center text-sm font-bold">Female </p> <p className="text-gray-500 flex  justify-center text-sm font-bold">{femalePercentage.toFixed(0)}%</p></div>
          <div className="w-3 h-3 rounded-full bg-blue-500 ml-2"></div>
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm font-bold">Male</p>
            <p className="text-gray-500 text-sm flex  justify-center font-bold"> {malePercentage.toFixed(0)}%</p>
          </div>

        </div>


      </div>
    </div>

  );
};


const AppointmentRequest = ({ request }) => {

  return (


    <div className=" flex flex-col">
      <div className="flex items-center flex-row pb-2 ">
        <p className="flex flex-grow font-bold">Appointment Request</p>
        <div className="flex flex-row items-center">
          <p className=" flex flex-grow-0 text-sm items-center justify-center">View all </p>
          <MdKeyboardDoubleArrowRight />
        </div>
      </div>
      <div className="h-[calc(100vh-50vh)]  px-4 py-2 bg-white rounded-lg ">
        {
          request.slice(0, 7).map((item, index) => (
            <div key={index} className="my-2 grid grid-cols-[1fr,3fr,1fr] justify-center">
              <div className="bg-gray-500 w-10  h-10 flex items-center justify-center rounded-full">
                <FaMale className="text-white" />
              </div>

              <div className="flex flex-col">
                <p className="text-gray-600">{item.RQ_NAME}</p>
                <div className="flex flex-row text-sm text-gray-300 gap-1">
                  <p>{item.RQ_AGE}</p>
                  <p>{item.RQ_DATE}</p>
                  <p>{item.RQ_TIME}</p>
                </div>

              </div>
              {item.RQ_STATUS == "Declined" && <div className=" border flex border-none rounded-md w-full my-[10px] px-[1.5px] items-center justify-center bg-red-100 text-red-500 text-[8px] "> {item.RQ_STATUS} </div>}
              {item.RQ_STATUS == "Confirmed" && <div className=" border flex border-none rounded-md w-full my-[10px] px-[1.5px] items-center justify-center bg-blue-100 text-purple-500 text-[8px]"> {item.RQ_STATUS} </div>}
              {item.RQ_STATUS === "Pending" && <div className=" flex flex-row items-center justify-center gap-2">
                <div className="border border-red-200 rounded-md p-1">
                  <IoMdCheckmark className="text-red-500 text-xs" />
                </div>

                <div className="border border-solid border-blue-200 rounded-md p-1  ">
                  <HiMiniXMark className="text-purple-500 text-xs" />
                </div>
              </div>}


            </div>
          ))
        }
      </div>
    </div>
  )

};
const TodayAppointment = ({ todayappointment }) => {

  return (


    <div className=" flex flex-col">
      <div className="flex items-center flex-row pb-2 ">
        <p className="flex flex-grow font-bold">Appointment Request</p>
        <div className="flex flex-row items-center">
          <p className=" flex flex-grow-0 text-sm items-center justify-center">View all </p>
          <MdKeyboardDoubleArrowRight />
        </div>
      </div>
      <div className="h-[calc(100vh-50vh)]  px-4 py-2 bg-white rounded-lg ">
        {
          todayappointment.slice(0, 7).map((item, index) => (
            <div key={index} className="my-2 grid grid-cols-[1fr,3fr,1fr] justify-center">
              <div className="bg-gray-500 w-10  h-10 flex items-center justify-center rounded-full">
                <FaMale className="text-white" />
              </div>

              <div className="flex flex-col">
                <p className="text-gray-600">{item.A_DENTIST_NAME}</p>
                <div className="flex flex-row text-sm text-gray-300 ">
                  <p className="text-sm">{item.A_ROOM_ID}</p>

                </div>

              </div>
              <div className="flex text-gray-500 text-xs">{item.A_TIME} </div>


            </div>
          ))
        }
      </div>
    </div>
  )
};
const RecentPatient = ({ recentpatient }) => {
  return (
    <div>
    <div className="flex items-center flex-row pb-2 ">
        <p className="flex flex-grow font-bold">Recent Patient</p>
        <div className="flex flex-row items-center">
          <p className=" flex flex-grow-0 text-sm items-center justify-center">View all </p>
          <MdKeyboardDoubleArrowRight />
        </div>
      </div>
  
    <div className=' px-4 mt-4 border-none bg-gray-200 grid grid-cols-[2fr,2fr,2fr,2fr,2fr] rounded-mds  font-bold py-4'>

      <p>Patient's Name</p>
      <p>Oral Health</p>
      <p className='hidden md:flex '>Gender</p>
      <p>Contact</p>
      <p>Patient ID</p>

    </div>
    <div className="mt-4 flex flex-col gap-1 ">
      {recentpatient.slice(0, 4).map((patient, index) => (

        <div key={index} className='w-full grid grid-cols-[2fr,2fr,2fr,2fr,2fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
          <h3 className='font-bold text-base text-100 '>
            {patient.PP_NAME}
          </h3>

          <div className='flex flex-row  items-center  gap-6 '>



            <p className='text-black-100 '>
              {patient?.PP_ORAL_HEALTH}

            </p>

          </div >
          <div>
            Female
          </div>
          <div className="hidden md:flex flex-col">
            <p className='text-gray-400   text-xs mt-1'>
              {patient.PP_PHONENUMBER}
            </p>
            <p className='text-gray-400  text-xs mt-1'>
              {/* {song?.subtitle} */}
              {patient.PP_EMAIL}
            </p>


          </div>
          <p>{patient.PATIENT_ID}</p>







        </div>
      ))}
    </div>
  
  </div>
  )

 
};
const Overview = () => {
  const { username } = useSelector((state) => state.user);
  const male = 110;
  const female = 400;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-4">

        {username && <h3 >Welcome {username}</h3>}
        {!username && <h1 className="font-bold">Welcome Guest</h1>}
        <p className="text-sm text-gray-500">Have a nice day at great work</p>
      </div>
      <div className="grid grid-cols-4 items-center gap-4 h-20  ">
        {reports.map((item, index) =>
          <div key={index} className={`border h-full rounded-md px-1  bg-red-300  grid grid-cols-3`}>


            <div className="col-span-1 flex justify-center items-center bg-white bg-opacity-50 m-6 rounded-full">
              <item.icon className="text-gray-500" />
            </div>

            <div className="col-span-2 flex flex-col justify-center">
              <p className="font-bold text-white text-3xl">{item.value}</p>
              <p className="text-gray-200 text-sm font-bold">{item.name}</p>
            </div>
          </div>
        )}

      </div>
      <div className="grid grid-cols-[4fr,3fr,4fr] gap-4 mt-8 mb-8">
        <AppointmentRequest request={request} />

        <GenderCircle maleCount={40} femaleCount={60} />


        <TodayAppointment todayappointment={appointment} />
      </div>
      
      <RecentPatient recentpatient={patient} />
    
     
    </div>
  )


};
export default Overview;


