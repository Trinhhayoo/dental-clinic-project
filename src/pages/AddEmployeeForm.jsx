// AddEmployeeForm.jsx

import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const AddEmployeeForm = ({ handleAddEmployee }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    EMPLOYEE_ID: '',
    NAME: '',
    GENDER: '',
    DATE_OF_BIRTH: '',
    ADDRESS: '',
    ROLE_TYPE: '', // Updated to include role type
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
    handleAddEmployee(formData);
    // You can add logic to send the data to your backend or perform other actions
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="employeeID" className="block text-sm font-medium text-gray-700">
            Employee ID:
          </label>
          <input
            type="text"
            id="employeeID"
            name="EMPLOYEE_ID"
            value={formData.EMPLOYEE_ID}
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
            name="NAME"
            value={formData.NAME}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender:
          </label>
          <input
            type="text"
            id="gender"
            name="GENDER"
            value={formData.GENDER}
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
            name="DATE_OF_BIRTH"
            value={formData.DATE_OF_BIRTH}
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
            name="ADDRESS"
            value={formData.ADDRESS}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="roleType" className="block text-sm font-medium text-gray-700">
            Role Type:
          </label>
          <select
            id="roleType"
            name="ROLE_TYPE"
            value={formData.ROLE_TYPE}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="" disabled>
              Select Role Type
            </option>
            <option value="Dentist">Dentist</option>
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="mt-4 flex gap-4 justify-between">
          <Link to="/Employee">
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

export default AddEmployeeForm;
