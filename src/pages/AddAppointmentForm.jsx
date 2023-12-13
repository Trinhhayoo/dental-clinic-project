import React, { useState } from 'react';

const AddAppointmentForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    A_ORDER_ID: '',
    A_DATE: '',
    A_ROOM_ID: '',
    A_DENTIST_ID: '',
    A_TIME: '',
    A_REQUEST_ID: '',
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
          <label htmlFor="orderID" className="block text-sm font-medium text-gray-700">
            Order ID:
          </label>
          <input
            type="text"
            id="orderID"
            name="A_ORDER_ID"
            value={formData.A_ORDER_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

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
          <label htmlFor="roomID" className="block text-sm font-medium text-gray-700">
            Room ID:
          </label>
          <input
            type="text"
            id="roomID"
            name="A_ROOM_ID"
            value={formData.A_ROOM_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="dentistID" className="block text-sm font-medium text-gray-700">
            Dentist ID:
          </label>
          <input
            type="text"
            id="dentistID"
            name="A_DENTIST_ID"
            value={formData.A_DENTIST_ID}
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

        {/* Add more fields as needed */}

        <div>
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAppointmentForm;
