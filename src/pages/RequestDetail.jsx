// Import React and necessary libraries
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getRequestID,deleteRequestID } from '../redux/services/Api';
import { Button } from '@material-tailwind/react';
import { useNavigate } from "react-router-dom";
import { HandleDelele } from '../components';
import { Link } from 'react-router-dom';
// Define the EmployeeProfile component
const RequestDetail = () => {
  const navigate = useNavigate();
  const [requestDetail, setRequestDetail] = useState();
  const [reload, setReload] = useState('reload');
  const { requestId } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDelete, setDelete] = useState(false);

  useEffect(() => {


    setReload("reload-" + new Date().getTime());

  }, []);
  useEffect(() => {
    
    const FetchData = async () => {


      await getRequestID(requestId).then(response => {
        setRequestDetail(response.data);

        console.log(response);


      });

    }
    FetchData();
  }, [reload]);
  useEffect(() => {
    const FetchData = async () => {

      
      await deleteRequestID(requestId).then(response => {
       if(response != null){
        navigate("/deleteSuccess");
       }
         
        
      });

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

            Request Information
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{requestDetail?.request_id}</h2>
        </div>



        {/* <div className='flex flex-col'>
          <p className="font-bold mb-2">Role:</p>
          <p> {empDetail.role}</p>
          </div> */}

        <div className="mt-4 items-center justify-center ">
          <div className='grid grid-cols-[2fr,2fr] py-4'>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">Date: </p>
            <p>{formatDate(requestDetail?.dateRequest)}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Time:
            </p>
            <p>{requestDetail?.timeRequest}</p>
          </div>
          </div>
          <div  className='grid grid-cols-[2fr,1fr,1fr]'>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Note
            </p>
            
            <p>{requestDetail?.noteRequest}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Phone number:
            </p>
            <p>{requestDetail?.phoneNumber}</p>
          </div>
        
          </div>
          <div  className='grid grid-cols-[2fr,1fr,1fr]'>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Status
            </p>
            <p>{requestDetail?.statusRequest}</p>
          </div>

         {
          requestDetail?.statusRequest == "pending" &&
          <Link to = {`/AddAppointmentForm/${requestDetail?.request_id}/${requestDetail?.patient_id}/${dateFormat(requestDetail?.dateRequest)}/${requestDetail?.timeRequest}`}>
             <Button className="border-none  text-xs bg-blue-500 py-4 w-24 justify-center flex flex-row items-center"  >Create Appointment</Button>
          </Link>
       
         }
        
          </div>
         
         
        </div>

      </div>
      <div className='flex flex-row gap-32'>
      <Button className="border-none bg-blue-500 py-4 w-24 justify-center flex flex-row items-center"  onClick={handleDeleteClick}>Delete</Button>

      {isDeleteModalOpen && (
        <HandleDelele handleConfirmDelete = {handleConfirmDelete} handleCancelDelete ={handleCancelDelete} empDetail={requestDetail} />
      )}
     
      
      </div>
      
    </div>
  );
};


// Export the component
export default RequestDetail;
