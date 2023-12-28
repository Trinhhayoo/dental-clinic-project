import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import roomsData from "../assets/room.json"; // Adjust the import path based on your project structure
import dentistsData from "../assets/employee.json"; // Adjust the import path based on your project structure

const AddAppointmentForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    A_DATE: '',
    A_TIME: '',
    A_REQUEST_ID: '',
    selectedRoom: '', // Add this line
    selectedDentist: '', // Add this line
    // Add more fields as needed
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary actions with the form data
    console.log('Form data submitted:', formData);
    // You can add logic to send the data to your backend or perform other actions
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Appointment</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="datetime-local"
            id="date"
            name="A_DATE"
            value={formData.A_DATE}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time:
          </label>
          <input
            type="time"
            id="time"
            name="A_TIME"
            value={formData.A_TIME}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="requestID" className="block text-sm font-medium text-gray-700">
            Request ID:
          </label>
          <input
            type="text"
            id="requestID"
            name="A_REQUEST_ID"
            value={formData.A_REQUEST_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="roomID" className="block text-sm font-medium text-gray-700">
            Room ID:
          </label>
          <select
            id="roomID"
            name="selectedRoom"
            value={formData.selectedRoom}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="" disabled>Select a room</option>
            {roomsData.map(room => (
              <option key={room.ROOM_ID} value={room.ROOM_ID}>
                {room.ROOM_NAME}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dentistID" className="block text-sm font-medium text-gray-700">
            Dentist ID:
          </label>
          <select
            id="dentistID"
            name="selectedDentist"
            value={formData.selectedDentist}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="" disabled>Select a dentist</option>
            {dentistsData.map(dentist => (
              <option key={dentist.EMPLOYEE_ID} value={dentist.EMPLOYEE_ID}>
                {dentist.EMP_NAME}
              </option>
            ))}
          </select>
        </div>

        {/* Add more fields as needed */}

        <div className="mt-4 flex gap-4 justify-between">
          <Link to="/Appointment">
            <Button
              className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]"
            >
              <p className="flex">Back</p>
            </Button>
          </Link>

          <Button
            type="submit"
            className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]"
          >
            <p className="flex">Save</p>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAppointmentForm;
