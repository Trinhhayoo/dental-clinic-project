import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const AddPatientForm = ({ handleAddPatient }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    PATIENT_ID: '',
    PP_NAME: '',
    PP_ORAL_HEALTH: '',
    PP_ALLERGY: '',
    PP_TOTAL_COST: '',
    PP_TOTAL_PAID: '',
    PP_PHONENUMBER: '',
    PP_EMAIL: '',
    PP_ADDRESS: '',
    PP_DATE_OF_BIRTH: '',
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
    handleAddPatient(formData);
    // You can add logic to send the data to your backend or perform other actions
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Patient</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* First column */}
        <div>
          <label htmlFor="patientID" className="block text-sm font-medium text-gray-700">
            Patient ID:
          </label>
          <input
            type="text"
            id="patientID"
            name="PATIENT_ID"
            value={formData.PATIENT_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
            Patient Name:
          </label>
          <input
            type="text"
            id="patientName"
            name="PP_NAME"
            value={formData.PP_NAME}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="oralHealth" className="block text-sm font-medium text-gray-700">
            Oral Health:
          </label>
          <input
            type="text"
            id="oralHealth"
            name="PP_ORAL_HEALTH"
            value={formData.PP_ORAL_HEALTH}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="allergy" className="block text-sm font-medium text-gray-700">
            Allergy:
          </label>
          <input
            type="text"
            id="allergy"
            name="PP_ALLERGY"
            value={formData.PP_ALLERGY}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Second column */}
        <div>
          <label htmlFor="totalCost" className="block text-sm font-medium text-gray-700">
            Total Cost:
          </label>
          <input
            type="text"
            id="totalCost"
            name="PP_TOTAL_COST"
            value={formData.PP_TOTAL_COST}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="totalPaid" className="block text-sm font-medium text-gray-700">
            Total Paid:
          </label>
          <input
            type="text"
            id="totalPaid"
            name="PP_TOTAL_PAID"
            value={formData.PP_TOTAL_PAID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="PP_PHONENUMBER"
            value={formData.PP_PHONENUMBER}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="PP_EMAIL"
            value={formData.PP_EMAIL}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="PP_ADDRESS"
            value={formData.PP_ADDRESS}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="PP_DATE_OF_BIRTH"
            value={formData.PP_DATE_OF_BIRTH}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mt-4 flex gap-4 justify-between">
          <Link to="/Patient">
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

export default AddPatientForm;
