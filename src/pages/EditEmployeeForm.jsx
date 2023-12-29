import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import employeeData from '../assets/employee.json';
import { Button } from '@material-tailwind/react';

const EditEmployeeForm = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedEmployee = employeeData.find(
      (employee) => employee.EMPLOYEE_ID === employeeId
    );
    setEmployee(selectedEmployee);
  }, [employeeId]);

  const handleInputChange = (fieldName, value) => {
    setEmployee({
      ...employee,
      [fieldName]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated employee:', employee);
    // Add logic to update data or dispatch actions if using Redux
  };

  const renderInputField = (fieldName, label) => (
    <div key={fieldName} className="mb-3">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      <input
        type="text"
        value={employee[fieldName] || ''}
        onChange={(e) => handleInputChange(fieldName, e.target.value)}
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
  );

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-4 font-bold text-xl">Edit Employee {employee.EMPLOYEE_ID}</h2>
      <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
        {renderInputField('EMP_NAME', 'Name')}
        {renderInputField('GENDER', 'Gender')}
        {renderInputField('DATE_OF_BIRTH', 'Date of Birth')}
        {renderInputField('ADDRESS', 'Address')}
        {renderInputField('EMPLOYEE_ID', 'Employee ID')}
        {renderInputField('USER_ID', 'User ID')}
        {/* Add other fields as needed */}
        
        <div className="mt-4 flex gap-4 justify-between">
          <Button
            onClick={() => navigate(-1)}
            className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]"
          >
            <p className="flex">Back</p>
          </Button>

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

export default EditEmployeeForm;
