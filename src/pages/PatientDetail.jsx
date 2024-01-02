import { PatientDetail, viewPlanList, deleteEmpID, PatientTP } from "../redux/services/Api";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { FaMale } from "react-icons/fa";
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { HandleDelele } from '../components';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useSelector } from 'react-redux';
const TodayAppointment = ({ item }) => {
  
  return (


    <div className="my-2 grid grid-cols-[3fr,1fr] justify-center">


      <div className="flex flex-col">
        <p className="text-gray-600">{item?.treatmentPlan_id}</p>
        <div className="flex flex-row text-sm text-gray-300 ">
          <p className="text-sm">{item?.date}</p>

        </div>

      </div>
      {item?.status == "CANCEDLED" && <div className=" border flex border-none rounded-md w-full my-[10px] px-[1.5px] items-center justify-center bg-red-100 text-red-500 text-[8px] "> {item.status} </div>}
      {item?.status == "DONE" && <div className=" border flex border-none rounded-md w-full my-[10px] px-[1.5px] items-center justify-center bg-blue-100 text-green-500 text-[8px]"> {item.status} </div>}
      {item?.status == "PENDING" && <div className=" border flex border-none rounded-md w-full my-[10px] px-[1.5px] items-center justify-center bg-gray-100 text-red-500 text-[8px] "> {item.status} </div>}



    </div>



  )
};
const Dentist = () => {
  const navigate = useNavigate();
  const { token } = useSelector(
    (state) => state.user
  );
  const { patientId } = useParams();
  const [dentistDetail, setDentistDetail] = useState();
  const [treatmentPlanList, setTreatmentPlanList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDelete, setDelete] = useState(false);

  useEffect(() => {

    const FetchData = async () => {


      await PatientDetail(patientId, token).then(response => {
        setDentistDetail(response.data);

        console.log(response);
      });
      await PatientTP(patientId, token).then(response => {
        setTreatmentPlanList(response.data);
        debugger
        console.log(response);
      });

    }
    FetchData();
  }, []);
  useEffect(() => {
    const FetchData = async () => {

      const userData = {
        "empID": dentistDetail?.employeeID,
      };
      await deleteEmpID(dentistDetail?.userID, userData, token).then(response => {
        if (response.data == "delete success") {
          navigate("/deleteSuccess");
        }
      });

    }
    FetchData();
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
  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  const handleCancelDelete = () => {
    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto py-4 flex items-center flex-col bg-white rounded-xl overflow-hidden  shadow-md md:max-w-2xl my-20  ">

      <div className=" py-8  flex flex-col gap-2">
        <div className='flex flex-col items-center justify-center '>
          <p className="uppercase flex items-center tracking-wide text-md text-indigo-500 font-semibold">

            Patient Information
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">{dentistDetail?.name}</h2>
        </div>

        <div className="mt-4 ">

          <div className='flex flex-col'>
            <p className="font-bold mb-2">Gender: </p>
            <p>{dentistDetail?.gender}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Address:
            </p>
            <p>{dentistDetail?.address}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Email
            </p>
            <p>{dentistDetail?.email}</p>
          </div>



          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Date of Birth
            </p>
            <p>{formatDate(dentistDetail?.dob)}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Oral Health
            </p>
            <p>{dentistDetail?.oralhealth}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Allergy
            </p>
            <p>{dentistDetail?.allergy}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Total Cost
            </p>
            <p>{dentistDetail?.cost}</p>
          </div>
          <div className='flex flex-col'>
            <p className="font-bold mb-2">
              Total Paid
            </p>
            <p>{dentistDetail?.paid}</p>
          </div>



        </div>

      </div>
      <div className=" flex flex-col py-8 items-center">
        <div className="flex items-center justify-center flex-row pb-2  ">
          <p className="flex flex-grow font-bold items-center">Treatment Plan</p>

        </div>
        <div className="h-[calc(100vh-60vh)] w-[calc(100vh-60vh)] overflow-y-scroll hide-scrollbar   px-4 py-2 bg-white rounded-lg  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] ">
          {
            treatmentPlanList?.map((item, index) => (
              <TodayAppointment key={index} item={item} />
            ))
          }
        </div>
      </div>


      <div className='flex flex-row gap-32'>
        <Button className="border-none bg-blue-500 py-4 w-24 justify-center flex flex-row items-center" onClick={handleDeleteClick}>Delete</Button>

        {isDeleteModalOpen && (
          <HandleDelele handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} empDetail={dentistDetail} />
        )}
        <Button className="border-none  bg-blue-500 py-4 w-24 justify-center flex flex-row items-center ">Edit</Button>
      </div>

    </div>

  );
};
export default Dentist;