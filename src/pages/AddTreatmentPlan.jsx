import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import roomsData from "../assets/room.json";
import dentistsData from "../assets/employee.json";
import { useNavigate, useParams } from 'react-router-dom';

import { createTreatmentPlan, getParentTreatment, getreatment, findPatient, getDentistFreeAppointment } from '../redux/services/Api';
import { PatientNotFound } from '../components';
import { useSelector } from 'react-redux';
const AddTreatmentPlan = () => {
  const navigate = useNavigate();
  const { token } = useSelector(
    (state) => state.user
  );
  const { patientId, dentistId, date, time } = useParams();




  const [isDropdownOpenParentTreatment, setDropdownOpenParentTreatment] = useState(false);
  const [isDropdownOpenTreatment, setDropdownOpenTreatment] = useState(false);
  const [isDropdownOpenTeeth, setDropdownOpenTeeth] = useState(false);
  const [isDropdownOpenSurface, setDropdownOpenSurface] = useState(false);
  const [parentTreatmentPlan, setParentTreatmentPlan] = useState(null);
  const [parentList, setParentList] = useState([]);

  const [treatmentList, setTreatmentList] = useState([]);
  const [treatment, setTreatment] = useState(null);

  const [teeth, setTeeth] = useState([]);
  const [teethList, setTeethList] = useState(['thuốc 1', 'thuốc 2', 'thuốc 3']);
  const [surface, setSurface] = useState(null);
  const [prescription, setPrescription] = useState();
  const [note, setNote] = useState();
  const [isDropdownOpenMedicines, setIsDropdownOpenMedicines] = useState(false);

  const handleOptionTeeth = (index) => {

    const selectedTeethCopy = [...teeth];
    const selectedTeethIndex = selectedTeethCopy.indexOf(teethList[index]);
    if (selectedTeethIndex === -1) {
      // Nếu thuốc chưa được chọn, thêm vào danh sách
      selectedTeethCopy.push(teethList[index]);
    } else {
      // Nếu thuốc đã được chọn, bỏ chọn khỏi danh sách
      selectedTeethCopy.splice(selectedTeethIndex, 1);
    }

    setTeeth(selectedTeethCopy);
  };



  const toggleDropdownMedicines = () => {
    setIsDropdownOpenMedicines(!isDropdownOpenMedicines);
  };





  // Generate an array of room names from 1 to 110
  console.log(teeth);
  const toggleDropdownParent = () => {
    setDropdownOpenParentTreatment(!isDropdownOpenTreatment);
  };

  const handleOptionParent = (parentTreatment) => {
    setParentTreatmentPlan(parentTreatment);

    setDropdownOpenParentTreatment(false); // Đóng dropdown sau khi chọn
    // Thêm logic của bạn để xử lý sự kiện khi chọn một tùy chọn
  };

  const toggleDropdownTreatment = () => {
    setDropdownOpenTreatment(!isDropdownOpenTreatment);
  };

  const handleOptionTreatment = (treatment) => {
    setTreatment(treatment);
    debugger
    setDropdownOpenTreatment(false); // Đóng dropdown sau khi chọn
    // Thêm logic của bạn để xử lý sự kiện khi chọn một tùy chọn
  };

  const toggleDropdownTeeth = () => {
    setDropdownOpenTeeth(!isDropdownOpenTeeth);
   if (isDropdownOpenMedicines == true){
    setIsDropdownOpenMedicines(!isDropdownOpenMedicines);
   }
  };



  


  useEffect(() => {
    const FetchData = async () => {

      try {
        const { data: response } = await getParentTreatment(token);
        setParentList(response);

        debugger
      } catch (error) {
        console.error(error.message);
      }

    }

    FetchData();
  }, []);

  useEffect(() => {

    const FetchData = async () => {

      try {
        const { data: response } = await getreatment(parentTreatmentPlan, token);
        setTreatmentList(response);
        debugger

      } catch (error) {
        console.error(error.message);
      }

    }
    if (parentTreatmentPlan != null) {
      FetchData();
    }

  }, [parentTreatmentPlan, isDropdownOpenTreatment]);





  const AddFunct = async () => {

    const treatmentPlanInfo = {
      "patient_id": patientId,
      "dentist_id": dentistId,
      "prescription": prescription,
      "assistant_id": null,
      "note": note,
      "parent_treatment_id": parentTreatmentPlan,
      "teeth_array": teeth,
      "surfaceteeth_array": surface,
      "treatment_id": treatment
    }

    await createTreatmentPlan(treatmentPlanInfo, token).then(response => {
      debugger
      if (response.data != null) {

        navigate("/deleteSuccess");
      }
      debugger

    });


  };



  const handleSubmit = (e) => {
    debugger
    e.preventDefault();

    AddFunct();


  };










  return (
    <div className="max-w-md flex flex-col mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Treatment Plan</h2>


      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Patient ID
          </label>
          <p>{patientId}</p>

        </div>
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Dentist ID
          </label>
          <p>{dentistId}</p>

        </div>
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <p>{date}</p>

        </div>
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <p>{time}</p>

        </div>

        <div className="relative">



          {isDropdownOpenParentTreatment && (
            <div className=" h-[calc(100vh-80vh)]  overflow-y-scroll hide-scrollbar  absolute top-full mt-2 bg-white border border-gray-300 rounded-md mr-4 py-2 w-40">
              {parentList?.map((parent, index) => (
                <p
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                  onClick={() => handleOptionParent(index + 1)}
                >
                  {parent?.parent_treatment_id}

                </p>
              ))}
            </div>
          )}
          <p className='cursor-pointer text-blue-500' onClick={toggleDropdownParent}>
            {
              !parentTreatmentPlan && "Chọn danh muc dieu tri"
            }
            {
              parentTreatmentPlan
            }
          </p>
        </div>
        <div className="relative">

          {isDropdownOpenTreatment && (
            <div className=" h-[calc(100vh-80vh)]  overflow-y-scroll hide-scrollbar  absolute top-full mt-2 bg-white border border-gray-300 rounded-md mr-4 py-2 w-40">
              {treatmentList?.map((treatment, index) => (

                <p
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                  onClick={() => handleOptionTreatment(treatment?.treatment_id)}
                >
                  {treatment?.treatment_id}

                </p>
              ))}
            </div>
          )}
          <p className='cursor-pointer text-blue-500' onClick={toggleDropdownTreatment}>
            {
              !treatment && "Chọn muc dieu tri"
            }
            {
              treatment
            }
          </p>
        </div>
        <div className="relative">

          {isDropdownOpenTeeth && (
            <div className=" h-[calc(100vh-80vh)]  overflow-y-scroll hide-scrollbar  absolute top-full mt-2 bg-white border border-gray-300 rounded-md mr-4 py-2 w-40">
              {teethList?.map((treatment, index) => (
                <p
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                  onClick={() => handleOptionTeeth(index)}
                >
                  {`${treatment} ${teeth.includes(treatment) ? '✕' : '+'}`}

                </p>
              ))}
              <div className="flex justify-end px-4 mt-2">
                <Button className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md" onClick={toggleDropdownTeeth}>
                  OK
                </Button>
               

              </div>

            </div>
          )}
          {
            teeth.length === 0 &&
            <p className='cursor-pointer text-blue-500 ' onClick={toggleDropdownTeeth}>
              {
                "Chọn thuốc"
              }
              {
                teeth
              }
            </p>
          }

        </div>
        <div className="relative">

          {
            teeth.length !== 0 &&

            <p className='cursor-pointer text-blue-500 ' onClick={toggleDropdownMedicines}>

              {
                "Danh sách thuốc"
              }
            </p>
          }
          {isDropdownOpenMedicines && (
            <div className="h-[calc(100vh-80vh)] overflow-y-scroll hide-scrollbar absolute top-full mt-2 bg-white border border-gray-300 rounded-md mr-4 py-2 w-40">
              {teeth?.map((medicine, index) => (
                <p
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                // onClick={() => handleOptionMedicines(index)}
                >
                  {`${medicine}`}
                </p>
              ))}
              <div className="flex justify-end px-4 mt-2">
                <Button className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md" onClick={toggleDropdownMedicines}>
                  Thoát
                </Button>
                <Button className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md" onClick={toggleDropdownTeeth}>
                  Chỉnh sửa
                </Button>

              </div>
            </div>
          )}

        </div>




        <div className="mt-4 flex gap-4 justify-between">
          <Link to="/Request">
            <Button
              className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]"
            >
              <p className="flex">Back</p>
            </Button>
          </Link>

          <Button
            type="submit"
            className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[55%]"
            onClick={handleSubmit}
          >
            <p className="flex">Save</p>
          </Button>
        </div>
      </form>

    </div>
  );
};

export default AddTreatmentPlan;
