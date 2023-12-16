import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const AddRequestForm = ({ handleAddRequest }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    REQUEST_ID: '',
    RQ_PATIENT_ID: '',
    RQ_AGE: '',
    RQ_NAME: '',
    RQ_DATE: '',
    RQ_TIME: '',
    RQ_NOTE: '',
    RQ_PHONE: '',
    RQ_STATUS: 'Pending', // Set default value to 'Pending'
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
    handleAddRequest(formData);
    // You can add logic to send the data to your backend or perform other actions
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Request</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* First column */}
        <div>
          <label htmlFor="requestID" className="block text-sm font-medium text-gray-700">
            Request ID:
          </label>
          <input
            type="text"
            id="requestID"
            name="REQUEST_ID"
            value={formData.REQUEST_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="patientID" className="block text-sm font-medium text-gray-700">
            Patient ID:
          </label>
          <input
            type="text"
            id="patientID"
            name="RQ_PATIENT_ID"
            value={formData.RQ_PATIENT_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age:
          </label>
          <input
            type="text"
            id="age"
            name="RQ_AGE"
            value={formData.RQ_AGE}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="RQ_NAME"
            value={formData.RQ_NAME}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Second column */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="text"
            id="date"
            name="RQ_DATE"
            value={formData.RQ_DATE}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time:
          </label>
          <input
            type="text"
            id="time"
            name="RQ_TIME"
            value={formData.RQ_TIME}
            onChange={handleInputChange}
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
            value={formData.RQ_NOTE}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="RQ_PHONE"
            value={formData.RQ_PHONE}
            onChange={handleInputChange}
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
