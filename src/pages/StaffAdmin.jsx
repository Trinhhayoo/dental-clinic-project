// Import React and necessary libraries
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getEmpID, deleteEmpID } from '../redux/services/Api';
import { Button } from '@material-tailwind/react';
import { useNavigate } from "react-router-dom";
import { HandleDelele } from '../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Define the EmployeeProfile component
const StaffAdmin = () => {
  const navigate = useNavigate();
  const { token } = useSelector(
    (state) => state.user
  );
  const [empDetail, setEmpDetail] = useState();
  const [reload, setReload] = useState('reload');
  const { employeeId } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDelete, setDelete] = useState(false);

  useEffect(() => {


    setReload("reload-" + new Date().getTime());

  }, []);
  useEffect(() => {
    
    const FetchData = async () => {


      await getEmpID(employeeId, token).then(response => {
        setEmpDetail(response.data);

        console.log(response);


      });

    }
    FetchData();
  }, [reload]);
  useEffect(() => {
    const FetchData = async () => {

      const userData = {
        "empID": empDetail?.employeeID,
      };
      debugger
      await deleteEmpID(empDetail?.userid, userData, token).then(response => {
        if(response.data == "delete success"){
          navigate("/deleteSuccess");
        }
      });

    }
    FetchData();
  }, [isDelete]);

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    return date.toLocaleDateString(); // Adjust the format as needed
  };
 

  const handleDeleteClick = () => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);
    setDelete(true);

   console.log(isDelete);
   
  };

  const handleCancelDelete = () => {
    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);
  };

  return (
    
    <div className="max-w-md mx-auto py-4 flex items-center flex-col bg-white rounded-xl overflow-hidden  shadow-md md:max-w-2xl my-20 ">
      <div className=" py-8  flex flex-col gap-2">
        <div className='flex flex-col items-center justify-center '>
          <p className="uppercase flex items-center tracking-wide text-md text-indigo-500 font-semibold">

            Employee Information
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{empDetail?.empName}</h2>
        </div>



        {/* <div className='flex flex-col'>
          <p className="font-bold mb-2">Role:</p>
          <p> {empDetail.role}</p>
          </div> */}

        <div className="mt-4 ">
          <div className='grid grid-cols-[2fr,2fr] py-4'>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">Gender: </p>
            <p>{empDetail?.gender}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Address:
            </p>
            <p>{empDetail?.address}</p>
          </div>
          </div>
          <div  className='grid grid-cols-[2fr,1fr,1fr]'>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Date of Birth
            </p>
            <p>{formatDate(empDetail?.dob)}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Employee ID:
            </p>
            <p>{empDetail?.employeeID}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              User ID:
            </p>
            <p>{empDetail?.userID}</p>
          </div>
          </div>

         
        </div>

      </div>
      <div className='flex flex-row gap-32'>
      <Button className="border-none bg-blue-500 py-4 w-24 justify-center flex flex-row items-center"  onClick={handleDeleteClick}>Delete</Button>

      {isDeleteModalOpen && (
        <HandleDelele handleConfirmDelete = {handleConfirmDelete} handleCancelDelete ={handleCancelDelete} empDetail={empDetail} />
      )}
      <Link to={`/EditEmployee/${empDetail?.employeeID}`}>
      <Button  className="border-none  bg-blue-500 py-4 w-24 justify-center flex flex-row items-center ">Edit</Button>
      </Link>
      
      </div>
      
    </div>
  );
};


// Export the component
export default StaffAdmin;
