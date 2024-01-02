import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import roomsData from "../assets/room.json";
import dentistsData from "../assets/employee.json";
import { useNavigate, useParams } from 'react-router-dom';

import { addRequest, findPatient, getDentistFreeAppointment, createAppointment, getDentistFree, createApp } from '../redux/services/Api';
import { PatientNotFound } from '../components';
import { useSelector } from 'react-redux';
const AddAppointmentForm = () => {
  const navigate = useNavigate();
  const { user_id } = useSelector(
    (state) => state.user
  );
  const { requestId, patientId, date, time } = useParams();
  const [dentistFree, setDentistFree] = useState([]);
  const [dateAppointment, setDate] = useState();
  const [timeAppointment, setTime] = useState('09:00:00');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isClick, setClick] = useState(false);
  const [isDropdownOpenDentist, setDropdownOpenDentist] = useState(false);
  const [filterDentist, setFilterDentist] = useState(null);

  // Generate an array of room names from 1 to 110


  const toggleDropdownDentist = () => {
    setDropdownOpenDentist(!isDropdownOpenDentist);
  };

  const handleOptionDentist = (Dentist) => {
    setFilterDentist(Dentist);
    setDropdownOpenDentist(false); // Đóng dropdown sau khi chọn
    // Thêm logic của bạn để xử lý sự kiện khi chọn một tùy chọn
  };


  const FetchData = async () => {
debugger
    try {
      //  const { data: response } = await getDentistFreeAppointment(date, time, token);
      const { data: response } = await getDentistFree(dateAppointment, timeAppointment);
      debugger
      setDentistFree(response);


    } catch (error) {
      console.error(error.message);
    }

  };



  const AddFunct = async () => {

    const appointmentInfo = {

      "date": dateAppointment,
      "time": timeAppointment,
      "patient_id": user_id,
      "dentist_id": parseInt(filterDentist, 10)
    }

    await createApp(appointmentInfo).then(response => {
      debugger
      if (response.data != null) {
       
        navigate(`/AppointmentDetail/${response.data}`)
      }


    });


  };
  const handleTimeChange = (e) => {
    const originalValue = e.target.value;
    const formattedValue = originalValue.length === 5 ? `${originalValue}:00` : originalValue;

    // Thực hiện các xử lý khác nếu cần

    setTime(formattedValue);
  };



  const handleSubmit = (e) => {
    debugger
    e.preventDefault();
    if (filterDentist != null) {
      AddFunct();
    }

  };
  const handleFindDentistFree = (e) => {
    e.preventDefault();
    if (timeAppointment != null && dateAppointment != null){
      FetchData();
    }
    
  }


  return (
    <div className="max-w-md flex flex-col mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Appointment</h2>
      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700">
          Patient ID
        </label>
        <p>{user_id}</p>

      </div>
      <form onSubmit={handleFindDentistFree} className="flex flex-col gap-4">

       

    
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="A_DATE"
            value={dateAppointment}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time:
          </label>
          <input
            type="time"
            minTime="09:00:00"
            maxTime="16:00:00"
            id="time"
            name="A_TIME"
            value={timeAppointment}
            onChange={(e) => handleTimeChange(e)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mt-4 flex gap-4 justify-between">


          <Button
            type="submit"
            className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[55%]"
          >
            <p className="flex">Find Free Dentist</p>
          </Button>
        </div>

      </form>

      <form className="flex flex-col gap-4">


        <div className="relative">





          {isDropdownOpenDentist && (
            <div className=" h-[calc(100vh-80vh)]  overflow-y-scroll hide-scrollbar  absolute top-full mt-2 bg-white border border-gray-300 rounded-md mr-4 py-2 w-40">
              {dentistFree?.map((dentist, index) => (
                <p
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                  onClick={() => handleOptionDentist(dentist?.user_id)}
                >
                  {dentist?.name}

                </p>
              ))}
            </div>
          )}
          <p className='cursor-pointer text-blue-500' onClick={toggleDropdownDentist}>
            {
              !filterDentist && "Chọn bác sĩ"
            }
            {
              filterDentist
            }
          </p>
        </div>

        <div className="mt-4 flex gap-4 justify-between">
          <Link to="/Request">
            <Button
              className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]"
            >
              <p className="flex">Back</p>
            </Button>
          </Link>

          <Button
            type="submit"
            className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[55%]"
            onClick={handleSubmit}
          >
            <p className="flex">Save</p>
          </Button>
        </div>
      </form>

    </div>
  );
};

export default AddAppointmentForm;
