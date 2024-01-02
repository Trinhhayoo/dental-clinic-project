import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addEmployee, findPatient, register, login } from '../redux/services/Api';
import { useSelector, useDispatch } from 'react-redux';
import { setPatient, setRole , setUser, setToken, setUserId} from '../redux/features/userSlice';
const AddPatientForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();


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

    await findPatient(phone).then(response => {


      if (response.data != null) {
        debugger
        setPatientId(response?.data);


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
      "name": empName,
      "phone": phone,
      "password": pass,

    }

    await register(userInfo).then(response => {
      if (response.data != null) {

        
        setPatientId(response?.data);
        dispatch(setUser(userInfo.phone));
        
        dispatch(setRole("Patient"));
         navigate(`/PatientDetail/${response?.data}`);
         debugger
        //  login(userInfo).then(response => {
        //   if (response.data != null) {
    
        //    debugger
        //     dispatch(setToken(response?.data));
            
    
        //  //  navigate(`/AddRequestForm`);
    
        //   }
    
    
        // });
        

      

      }


    });
    
  }
  // const Login = async () => {

  //   const userInfo = {
  //     "userName": phone,
  //     "password": pass,

  //   }

  //   await login(userInfo).then(response => {
  //     if (response.data != null) {

  //      debugger
  //       dispatch(setToken(response?.data));
        

  //    //  navigate(`/AddRequestForm`);

  //     }


  //   });
    
  // }





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
