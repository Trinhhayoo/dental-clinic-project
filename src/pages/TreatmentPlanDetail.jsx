// Import React and necessary libraries
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getRequestID, deleteRequestID, deleteAppointmentId, TreatmentPlanById, getTeethById } from '../redux/services/Api';
import { Button } from '@material-tailwind/react';
import { useNavigate } from "react-router-dom";
import { HandleDelele } from '../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const TodayAppointment = ({ item }) => {


  return (


    <div className="my-2 grid grid-cols-[1fr,1fr] justify-center">



      <p className="text-gray-600">{item?.[2]}</p>

      <p className="text-sm">{item?.[3]}</p>








    </div>

  )








};

// Define the EmployeeProfile component
const TreatmentPlanDetail = () => {

  const [reload, setReload] = useState('reload');
  const { treatmentplanId } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const navigate = useNavigate();
  const [teethList, setTeethList] = useState([]);
  const { token } = useSelector(
    (state) => state.user
  );
  const [appointmentDetail, setAppointmentDetail] = useState(null);


  useEffect(() => {


    setReload("reload-" + new Date().getTime());

  }, []);
  useEffect(() => {

    const FetchData = async () => {


      await TreatmentPlanById(treatmentplanId, token).then(response => {
        setAppointmentDetail(response.data);

        console.log(response);


      });
      await getTeethById(treatmentplanId, token).then(response => {
        setTeethList(response.data);
        debugger
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
    if (isDelete == true) {
      FetchData();
    }

  }, [isDelete]);


  useEffect(() => {
    const FetchData = async () => {


      await deleteAppointmentId(treatmentplanId, token).then(response => {
        if (response != null) {
          navigate("/deleteSuccess");
        }


      });

    }
    if (isDelete == true) {
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

            TreatmentPlan Information
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{appointmentDetail?.treatmentPlan_id}</h2>
        </div>



        {/* <div className='flex flex-col'>
          <p className="font-bold mb-2">Role:</p>
          <p> {empDetail.role}</p>
          </div> */}

        <div className="mt-4 items-center justify-center ">
          <div className='grid grid-cols-[2fr,2fr] py-4 gap-4'>
            <div className='flex flex-col'>
              <p className="font-bold mb-2">Patient </p>
              <p>{appointmentDetail?.patient_id}</p>
            </div>
            <div className='flex flex-col'>
              <p className="font-bold mb-2">
                Date
              </p>
              <p>{appointmentDetail?.date}</p>
            </div>
          </div>
          <div className='grid grid-cols-[2fr,2fr] py-4 gap-4'>
            <div className='flex flex-col'>
              <p className="font-bold mb-2"> Dentist</p>
              <p>{appointmentDetail?.dentist_id}</p>
            </div>
            <div className='flex flex-col'>
              <p className="font-bold mb-2">
                Assistant
              </p>
              <p>{appointmentDetail?.assistant_id ? appointmentDetail.assistant_id : "Khong co"}</p>
            </div>
          </div>
          <div className='grid grid-cols-[2fr,2fr] py-4 gap-4'>
            <div className='flex flex-col'>
              <p className="font-bold mb-2"> Treatment</p>
              <p>{appointmentDetail?.treatment_id}</p>
            </div>
            <div className='flex flex-col'>
              <p className="font-bold mb-2">
                Status
              </p>
              <p>{appointmentDetail?.status}</p>
            </div>
          </div>

          <div className=" flex flex-col py-8 items-center">
            <div className="flex items-center justify-center flex-col pb-2  ">
              <p className="flex flex-grow font-bold items-center">Teeth List</p>
              <div className=' flex flex-row gap-4'>
                <p className='font-bold text-blue-400'>Teeth</p>
                <p className='font-bold text-blue-400'>Surface</p>
              </div>
            </div>
            <div className="h-[calc(100vh-90vh)] w-[calc(100vh-80vh)] overflow-y-scroll hide-scrollbar   px-4 py-2 bg-white rounded-lg  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] ">
              {
                teethList?.map((item, index) => (
                  <TodayAppointment key={index} item={item} />
                ))
              }
            </div>
          </div>






        </div>

      </div>
      <div className='flex flex-row gap-4'>

        <div className='flex flex-row gap-32'>
          <Link className="pt-1" to={`/AddPaymentForm/${treatmentplanId}`}>
            <Button className="border-none bg-blue-500 py-4 w-24 justify-center flex flex-row items-center"  >Thanh toán</Button>
          </Link>





        </div>
      </div>

    </div>
  );
};


// Export the component
export default TreatmentPlanDetail;
