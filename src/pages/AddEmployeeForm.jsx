import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../redux/services/Api';

const AddEmployeeForm = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRole, setShowRole] = useState(false);
  const dropdownRole = useRef(null);
  const [empName, setEmpName] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [role, setRole] = useState();


  const options = [
    { id: 1, label: 'Nam' },
    { id: 2, label: 'Nữ' },
  ];
  const roles = [
    { id: 1, label: 'Dentist' },
    { id: 2, label: 'Staff' },
    { id: 2, label: 'Admin' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRole.current && !dropdownRole.current.contains(event.target)) {
        setShowRole(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };
  const handleRole = (option) => {
    setSelectedRole(option);
    setShowRole(false);
  };
  const addFunct = async () => {

    const userInfo = {
      "empName": empName,
      "gender": selectedOption.label,
      "dob": dob,
      "address": address,
      "role": selectedRole.label
    }
    debugger
    await addEmployee(userInfo).then(response => {
      if (response.data != null) {
        // Sử dụng split() để tách chuỗi thành mảng
        const values = response.data.split(',');

        // values[0] sẽ là giá trị đầu tiên, values[1] sẽ là giá trị thứ hai
        const userId =parseInt(values[0], 10);
        const employeeId = values[1];

        debugger
        if (role == "Dentist") {
          navigate(`/Dentist/${userId}/${employeeId}`)
        }

        else {

          navigate(`/Employee/${employeeId}`)
        }

      }


    });
  }





  const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    addFunct();

  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="NAME"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="relative" ref={dropdownRef}>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <input
            type="text"
            placeholder="Chọn giới tính"
            onClick={() => setShowOptions(!showOptions)}
            value={selectedOption ? selectedOption.label : ''}
            readOnly
            className="bg-white border text-black py-2 px-4 rounded-md w-full"
          />

          {showOptions && (
            <div className="absolute top-0 mt-2 bg-white border border-gray-300 w-40 rounded">
              {options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className="cursor-pointer py-2 px-4 hover:bg-gray-200"
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="DATE_OF_BIRTH"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>


        <div className="relative" ref={dropdownRole}>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            placeholder="Chọn Role"
            onClick={() => setShowRole(!showRole)}
            value={selectedRole ? selectedRole.label : ''}
            readOnly
            className="bg-white border text-black py-2 px-4 rounded-md w-full"
          />

          {showRole && (
            <div className="absolute top-0 mt-2 bg-white border border-gray-300 w-40 rounded">
              {roles.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleRole(option)}
                  className="cursor-pointer py-2 px-4 hover:bg-gray-200"
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add more fields as needed */}

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