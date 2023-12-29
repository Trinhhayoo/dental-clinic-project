import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { addRequest, findPatient, getDentistFreeAppointment, createAppointment } from '../redux/services/Api';
import { PatientNotFound } from '../components';
import { useSelector } from 'react-redux';
const AddAppointmentForm = () => {
  const navigate = useNavigate();
  const { token } = useSelector(
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

  useEffect(() => {
    const FetchData = async () => {

      try {
        const { data: response } = await getDentistFreeAppointment(date, time, token);
        setDentistFree(response);


      } catch (error) {
        console.error(error.message);
      }

    }

    FetchData();
  }, []);






  
    const AddFunct = async () => {

      const appointmentInfo = {
        "request_id": parseInt(requestId, 10),
        "date_chosen": date,
        "time_chosen": time,
        "patient_id": parseInt(patientId, 10),
        "dentist_id": parseInt(filterDentist, 10)
      }

      await createAppointment(appointmentInfo, token).then(response => {
        debugger
        if(response.data != null){
          navigate(`/Appointment/${response.data}`)
        }
        debugger

      });
    
   
  };

  

  const handleSubmit = (e) => {
    debugger
    e.preventDefault();
    if (filterDentist != null) {
      AddFunct();
    }

  };










  return (
    <div className="max-w-md flex flex-col mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Appointment</h2>


      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Patient ID
          </label>
          <p>{patientId}</p>

        </div>
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <p>{date}</p>

        </div>
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <p>{time}</p>

        </div>

        <div className="relative">

       



          {isDropdownOpenDentist && (
            <div className=" h-[calc(100vh-80vh)]  overflow-y-scroll hide-scrollbar  absolute top-full mt-2 bg-white border border-gray-300 rounded-md mr-4 py-2 w-40">
              {dentistFree.map((dentist, index) => (
                <p
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                  onClick={() => handleOptionDentist(dentist)}
                >
                  {dentist}

                </p>
              ))}
            </div>
          )}
           <p className='cursor-pointer text-blue-500' onClick={toggleDropdownDentist}>
            {
              !filterDentist &&  "Chọn bác sĩ"
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
