import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { addRequest, findPatient } from '../redux/services/Api';
import { PatientNotFound } from '../components';
const AddRequestForm = () => {
  const navigate = useNavigate();
  const [phonePP, setPhonePP] = useState();
  const [patientId, setPatientId] = useState();
  const [isPresent, setIspresent] = useState(false);
  const [dateRequest, setDateRequest] = useState();
  const [timeRequest, setTimeRequest] = useState('09:00:00');
  const [noteRequest, setNoteRequest] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const searchFunc = async () => {

    await findPatient(phonePP, 10).then(response => {
      setPatientId(response.data);
      debugger
      if (response.data === 0) {
        // Hiển thị modal nếu không tìm thấy bệnh nhân
        handleClick();
      } else {
        setPatientId(response.data);
      }

    });

  }

  const handleClick = () => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);
    setDelete(true);
  };

  const handleCancelRegister = () => {
    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);
    debugger
  };

  const something = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const inputValue = document.getElementById('search-field').value;
      setPhonePP(inputValue);
      // Trigger your custom form submission logic
      searchFunc();
    }
  }
  const handleTimeChange = (e) => {
    const originalValue = e.target.value;
    const formattedValue = originalValue.length === 5 ? `${originalValue}:00` : originalValue;

    // Thực hiện các xử lý khác nếu cần

    setTimeRequest(formattedValue);
  };



  const addFunct = async () => {
    debugger
    const requestInfo = {
      "patient_id": patientId,
      "dateRequest": dateRequest,
      "timeRequest": timeRequest,
      "noteRequest": noteRequest,
      "phoneNumber": phonePP
    }
    console.log(requestInfo);

    await addRequest(requestInfo).then(response => {
      if (response.data != null) {
        navigate(`/Request/${response.data.request_id}`)
      }


    });
  }





  const handleSubmit = (e) => {
    debugger
    e.preventDefault();
    addFunct();

  };

  return (
    <div className="max-w-md flex flex-col mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Request</h2>

      <form

        autoComplete="off"
        className="w-full" >
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Phone number</label>
        <div class=" relative w-full items-center ">

          <input
            name="search-field"
            autoComplete="off"
            id="search-field"
            type="search"
            value={phonePP}
            onKeyDown={(e) => something(e)}
            onChange={(e) => setPhonePP(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full" placeholder="Patient Phone number" required />

        </div>
      </form>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {isDeleteModalOpen && (
          <PatientNotFound handleConfirmDelete={handleConfirmDelete} handleCancelRegister={handleCancelRegister} />
        )}

        {/* Second column */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="A_DATE"
            value={dateRequest}
            onChange={(e) => setDateRequest(e.target.value)}
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
            value={timeRequest}
            onChange={(e) => handleTimeChange(e)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Note:
          </label>
          <input
            type="text"
            id="note"
            name="RQ_NOTE"
            value={noteRequest}
            onChange={(e) => setNoteRequest(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
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
          >
            <p className="flex">Save</p>
          </Button>
        </div>
      </form>

    </div>
  );
};

export default AddRequestForm;
