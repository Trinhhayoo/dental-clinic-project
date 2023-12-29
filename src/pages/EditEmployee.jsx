import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { editEmployee, getEmpID } from '../redux/services/Api';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
const EditEmployee = () => {
  const navigate = useNavigate();
  const { token } = useSelector(
    (state) => state.user
  );
  const { employeeID } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);


  const [empName, setEmpName] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();

  const [reload, setReload] = useState('reload');
  const [employeeId, setEmployeeId] = useState();
  const [userId, setUserId] = useState();

  const options = [
    { id: 1, label: 'Nam' },
    { id: 2, label: 'Nữ' },
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

    const FetchData = async () => {


      await getEmpID(employeeID, token).then(response => {
        setEmpName(response?.data?.empName);
        setGender(response?.data?.gender);
        setAddress(response?.data?.address);
        // Parse and format the date
        const parsedDate = moment(response?.data?.dob).format('YYYY-MM-DD');
        setDob(parsedDate);
        setEmployeeId(response?.data?.employeeID);
        setUserId(response?.data?.userid);
        setSelectedOption(response?.data?.gender)
        debugger


      });

    }
    FetchData();
  }, [reload]);

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




  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  const addFunct = async () => {

    const userInfo = {
      "address": address,
      "dob": dob,
      "userid": parseInt(userId, 10),
      "employeeID": employeeID,
      "empName": empName,
      "gender": selectedOption.label ? selectedOption.label : gender
    }
    debugger
    await editEmployee(userInfo, token).then(response => {
      navigate(`/Employee/${response.data.employeeID}`)


    });
  }





  const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    addFunct();

  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
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

            onClick={() => setShowOptions(!showOptions)}
            value={selectedOption ? selectedOption : gender}
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

export default EditEmployee;