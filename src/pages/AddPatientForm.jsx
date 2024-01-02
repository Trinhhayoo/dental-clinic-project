import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addEmployee,  findPatient } from '../redux/services/Api';
import { useSelector, useDispatch } from 'react-redux';
import { setPatient, setRole } from '../redux/features/userSlice';
const AddPatientForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { token } = useSelector(
    (state) => state.user
  );

  const [empName, setEmpName] = useState();
  const [phone, setPhone] = useState();
  const [pass, setPass] = useState();
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [patientId, setPatientId] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleClick = () => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const searchFunc = async () => {

    await findPatient(phone, token).then(response => {
      setPatientId(response.data);
      debugger
      if (response.data === 0) {
        // Hiển thị modal nếu không tìm thấy bệnh nhân
        handleClick();
      } else {
        setPatientId(response?.data?.userId);
        setRole(response?.data?.Role);
        
      }

    });

  }

  const something = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const inputValue = document.getElementById('search-field').value;
      setPhone(inputValue);
      // Trigger your custom form submission logic
      searchFunc();
    }
  }

  const addFunct = async () => {

    const userInfo = {
      "empName": empName,
      "dob": dob,
      "address": address,
      "phone": phone,

      "password": pass,

    }

    await addEmployee(userInfo, token).then(response => {
      if (response.data != null) {
        // Sử dụng split() để tách chuỗi thành mảng
        const values = response.data.split(',');


        // values[0] sẽ là giá trị đầu tiên, values[1] sẽ là giá trị thứ hai
        const userId = parseInt(values[0], 10);
        const employeeId = values[1];




        navigate(`/AddRequestForm`);

      }


    });
  }





  const handleSubmit = (e) => {
    e.preventDefault();

    addFunct();

  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
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
            value={phone}
            onKeyDown={(e) => something(e)}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full" placeholder="Patient Phone number" required />

        </div>
      </form>
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
      

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="text"
            id="password"
            name="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
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

export default AddPatientForm;
