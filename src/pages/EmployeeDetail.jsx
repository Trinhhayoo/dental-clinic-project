// EmployeeDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import  employeeData from "../assets/employee.json";
const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const selectedEmployee = employeeData.find(
      (employee) => employee.EMPLOYEE_ID === employeeId
    );
    setEmployee(selectedEmployee);
  }, [employeeId]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  const renderDetailField = (label, value) => (
    <div key={label} className="mb-3">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      <p className="mt-1 p-2 border rounded-md">{value}</p>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Employee Detail</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {renderDetailField('Name', employee.EMP_NAME)}
          {renderDetailField('Gender', employee.GENDER)}
          {renderDetailField('Date of Birth', employee.DATE_OF_BIRTH)}
          {renderDetailField('Address', employee.ADDRESS)}
        </div>
        <div>
          {renderDetailField('Employee ID', employee.EMPLOYEE_ID)}
          {renderDetailField('User ID', employee.USER_ID)}
          {/* Add other fields as needed */}
        </div>
      </div>
      <div className="mt-4 flex gap-4 justify-between col-span-2">
        {/* Add your Link components for different actions */}
        {/* For example, you can link to an Edit page */}
        <Link to={`/EditEmployeeForm/${employee.EMPLOYEE_ID}`}>
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">Edit</p>
          </Button>
        </Link>
        {/* Add other actions as needed */}
        <Link to="/Employee">
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">Back</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetail;
