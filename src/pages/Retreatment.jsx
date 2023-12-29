// Import React and necessary libraries
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { retreatmentDetail, UpdateretreatmentDetail } from '../redux/services/Api';
import { Button } from '@material-tailwind/react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
// Define the EmployeeProfile component
const RetreatmentDetail = () => {
  const navigate = useNavigate();
  const [requestDetail, setRequestDetail] = useState();

  const { retreatment_id } = useParams();
 

 
  useEffect(() => {
    
     retreatmentDetail(parseInt(retreatment_id,10)).then(response => {
        
        setRequestDetail(response.data);
      

      });

  }, []);
 

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    return date.toLocaleDateString(); // Adjust the format as needed
  };
  const dateFormat = (date) => {
    const originalDate = new Date(date);

    // Chuyển đổi thành chuỗi ngày tháng
    return originalDate.toISOString().split('T')[0];
  }

 
const updateAndAdd = async () => {
    await UpdateretreatmentDetail(parseInt(retreatment_id,10)).then(response => {
        
        navigate(`/AddAppointmentForm/null/${requestDetail?.[5]}/${dateFormat(requestDetail?.[3])}/09:00:00`);
      

      });

}
 

 
  return (
    
    <div className="max-w-md mx-auto flex items-center flex-col bg-white rounded-xl overflow-hidden justify-center py-4 px-32  shadow-md md:max-w-2xl my-20 ">
      <div className=" py-8 items-center  flex flex-col gap-2 ">
        <div className='flex flex-col items-center justify-center '>
          <p className="uppercase flex items-center tracking-wide text-md text-indigo-500 font-semibold">

            Retreatment Information
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{requestDetail?.[0]}</h2>
        </div>



        {/* <div className='flex flex-col'>
          <p className="font-bold mb-2">Role:</p>
          <p> {empDetail.role}</p>
          </div> */}

        <div className="mt-4 items-center justify-center ">
          <div className='grid grid-cols-[2fr,2fr] py-4'>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">Date: </p>
            <p>{formatDate(requestDetail?.[3])}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Note
            </p>
            
            <p>{requestDetail?.[2]}</p>
          </div>
          </div>
          <div  className='grid grid-cols-[2fr,2fr]'>
          
          <div className='flex flex-col pb-4'>
            <p className="font-bold mb-2">
              Treatment Plan ID
            </p>
            <p>{requestDetail?.[1]}</p>
          </div>
        
          </div>
          <div  className='grid grid-cols-[2fr,1fr,1fr]'>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Status
            </p>
            <p>{requestDetail?.[4]}</p>
          </div>

         {
          requestDetail?.[4] == "PENDING" &&
       
             <Button onClick={updateAndAdd} className="border-none  text-xs bg-blue-500 py-4 w-24 justify-center flex flex-row items-center"  >Create Appointment</Button>
          
    
         }
        
          </div>
         
         
        </div>

      </div>
   
      
    </div>
  );
};


// Export the component
export default RetreatmentDetail;
