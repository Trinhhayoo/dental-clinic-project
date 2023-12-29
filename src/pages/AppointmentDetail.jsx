// Import React and necessary libraries
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getRequestID,deleteRequestID, deleteAppointmentId, getAppointmentDetail } from '../redux/services/Api';
import { Button } from '@material-tailwind/react';
import { useNavigate } from "react-router-dom";
import { HandleDelele } from '../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Define the EmployeeProfile component
const AppointmentDetail = () => {
  const navigate = useNavigate();
  const { token } = useSelector(
    (state) => state.user
  );
  const [appointmentDetail, setAppointmentDetail] = useState();
  const [reload, setReload] = useState('reload');
  const { appointmentId } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDelete, setDelete] = useState(false);

  useEffect(() => {


    setReload("reload-" + new Date().getTime());

  }, []);
  useEffect(() => {
    
    const FetchData = async () => {


      await getAppointmentDetail(appointmentId, token).then(response => {
        setAppointmentDetail(response.data);

        console.log(response);


      });

    }
    FetchData();
  }, [reload]);
  useEffect(() => {
    const FetchData = async () => {

      
    //   await deleteRequestID(requestId).then(response => {
    //    if(response != null){
    //     navigate("/deleteSuccess");
    //    }
         
        
    //   });

    }
    if(isDelete == true){
        FetchData();
    }
   
  }, [isDelete]);

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    return date.toLocaleDateString(); // Adjust the format as needed
  };
  const dateFormat = (date) => {
    const originalDate = new Date(date);

    // Chuyển đổi thành chuỗi ngày tháng
    return originalDate.toISOString().split('T')[0];
  }
  useEffect(() => {
    const FetchData = async () => {

      
      await deleteAppointmentId(appointmentId, token).then(response => {
       if(response != null){
        navigate("/deleteSuccess");
       }
         
        
      });

    }
    if(isDelete == true){
        FetchData();
    }
   
  }, [isDelete]);
 

  const handleDeleteClick = () => {
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);
    setDelete(true);

   
   
  };

  const handleCancelDelete = () => {
    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);
  };

  return (
    
    <div className="max-w-md mx-auto flex items-center flex-col bg-white rounded-xl overflow-hidden justify-center py-4 px-32  shadow-md md:max-w-2xl my-20 ">
      <div className=" py-8 items-center  flex flex-col gap-2">
        <div className='flex flex-col items-center justify-center '>
          <p className="uppercase flex items-center tracking-wide text-md text-indigo-500 font-semibold">

            Appointment Information
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{appointmentDetail?appointmentDetail[0] : ''}</h2>
        </div>



        {/* <div className='flex flex-col'>
          <p className="font-bold mb-2">Role:</p>
          <p> {empDetail.role}</p>
          </div> */}

        <div className="mt-4 items-center justify-center ">
        <div className='grid grid-cols-[2fr,2fr] py-4'>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">Patient </p>
            <p>{appointmentDetail?appointmentDetail[9] : ''}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Dentist
            </p>
            <p>{appointmentDetail?appointmentDetail[10] : ''}</p>
          </div>
          </div>
          <div className='grid grid-cols-[2fr,2fr] py-4'>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">Date: </p>
            <p>{formatDate(appointmentDetail?appointmentDetail[3] : '')}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Time:
            </p>
            <p>{appointmentDetail?appointmentDetail[4] : ''}</p>
          </div>
          </div>
          <div  className='grid grid-cols-[2fr,1fr,1fr]'>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Room
            </p>
            
            <p>{appointmentDetail?appointmentDetail[6] : ''}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              OrderNumber:
            </p>
            <p>{appointmentDetail?appointmentDetail[7] : ''}</p>
          </div>
        
          </div>
         
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Status
            </p>
            <p>{appointmentDetail?appointmentDetail[8] : ''}</p>
          </div>

        
         
         
        </div>

      </div>
      <div className='flex flex-row gap-4'>
      <div className='flex flex-row gap-32'>
      <Button className="border-none bg-blue-500 py-4 w-24 justify-center flex flex-row items-center"  onClick={handleDeleteClick}>Delete</Button>

      {isDeleteModalOpen && (
        <HandleDelele handleConfirmDelete = {handleConfirmDelete} handleCancelDelete ={handleCancelDelete} empDetail={appointmentDetail} />
      )}
     
      
      </div>
      <div className='flex flex-row gap-32'>
      <Link className="pt-1" to={`/EditAppointmentForm/${appointmentDetail?appointmentDetail[0] : ''}`}>
      <Button className="border-none bg-blue-500 py-4 w-24 justify-center flex flex-row items-center"  >Edit</Button>
                </Link>


      
     
      
      </div>
      </div>
      
    </div>
  );
};


// Export the component
export default AppointmentDetail;
