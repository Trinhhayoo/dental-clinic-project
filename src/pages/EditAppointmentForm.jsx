// Import React and necessary libraries
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getAppointmentDetail, getDentistFreeAppointment, editAppointmentId } from '../redux/services/Api';
import { Button } from '@material-tailwind/react';
import { useNavigate } from "react-router-dom";
import { HandleDelele } from '../components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// Define the EmployeeProfile component
const EditAppointmentForm = () => {
    const navigate = useNavigate();
    const { token } = useSelector(
        (state) => state.user
      );
    const [appointmentDetail, setAppointmentDetail] = useState();
    const [reload, setReload] = useState('reload');
    const { appointmentId } = useParams();
    const [dentistFree, setDentistFree] = useState([]);
    const [isDropdownOpenDentist, setDropdownOpenDentist] = useState(false);
    const [filterDentist, setFilterDentist] = useState(null);
    const [date_new, setDateNew] = useState();
    const [time_new, setTimeNew] = useState();

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
    const toggleDropdownDentist = () => {
        setDropdownOpenDentist(!isDropdownOpenDentist);

    };

    const handleOptionDentist = (Dentist) => {
        setFilterDentist(Dentist);
        setDropdownOpenDentist(false); // Đóng dropdown sau khi chọn
        // Thêm logic của bạn để xử lý sự kiện khi chọn một tùy chọn
    };

    useEffect(() => {
        const FetchData = async () => {
            const date_n = date_new ? date_new : formatToYYYYMMDD(appointmentDetail?.[3]);
            const time_n = time_new ? time_new : appointmentDetail?.[4];
            debugger
            try {
                const { data: response } = await getDentistFreeAppointment(date_n, time_n, token);
                setDentistFree(response);


            } catch (error) {
                console.error(error.message);
            }

        }

        FetchData();


    }, [time_new, isDropdownOpenDentist]);

    const formatDate = (datetimeString) => {
        const date = new Date(datetimeString);
        console.log(date.toLocaleDateString());
        return date.toLocaleDateString(); // Adjust the format as needed
    };
    const formatDateForInput = (inputDate) => {
        const parts = formatDate(inputDate).split("/");
        const formattedDate = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
        return formattedDate;
    };
    const formatToYYYYMMDD = (dateString) => {

        const date = new Date(dateString);

        // Kiểm tra xem ngày có hợp lệ không
        if (isNaN(date.getTime())) {
            return null;
        }


        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        // Tạo chuỗi định dạng "yyyy-MM-dd"
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    };





    const handleTimeChange = (e) => {
        const originalValue = e.target.value;
        const formattedValue = originalValue.length === 5 ? `${originalValue}:00` : originalValue;


        setTimeNew(formattedValue);
    };

    const AddFunct = async () => {
       
        const appointmentInfo = {
            "appointment_id": appointmentId,
            "dentist_old": appointmentDetail?.[5],
            "date_old": formatDateForInput(appointmentDetail?.[3]),
            "time_old": appointmentDetail?.[4],
            "dentist_new": filterDentist ? filterDentist : appointmentDetail?.[5],
            "date_new": date_new ? date_new : formatDateForInput(appointmentDetail?.[3]),
            "time_new": time_new ? time_new : appointmentDetail?.[4],
        }

        
        await editAppointmentId(appointmentInfo, token).then(response => {
            if (response.data != null) {
                navigate(`/Appointment/${response.data.appointmentID}`)
            }


        });
    }





    const handleSubmit = (e) => {
        debugger
        e.preventDefault();
        AddFunct();

    };

    return (

        <div className="max-w-md mx-auto flex items-center flex-col bg-white rounded-xl overflow-hidden justify-center py-4 px-32  shadow-md md:max-w-2xl my-20 ">
            <div className=" py-8 items-center  flex flex-col gap-2">
                <div className='flex flex-col items-center justify-center '>
                    <p className="uppercase flex items-center tracking-wide text-md text-indigo-500 font-semibold">

                        Edit Appointment
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{appointmentDetail ? appointmentDetail[0] : ''}</h2>
                </div>



                {/* <div className='flex flex-col'>
          <p className="font-bold mb-2">Role:</p>
          <p> {empDetail.role}</p>
          </div> */}

                <div className="mt-4 items-center justify-center ">
                    <div className='grid grid-cols-[2fr,2fr] py-4'>
                        <div className='flex flex-col'>
                            <p className="font-bold mb-2">Patient </p>
                            <p>{appointmentDetail ? appointmentDetail[9] : ''}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className="font-bold mb-2">
                                Dentist
                            </p>

                            <div className="relative">


                                {isDropdownOpenDentist && (
                                    <div className=" h-[calc(100vh-80vh)]  overflow-y-scroll hide-scrollbar  absolute top-full mt-2 bg-white border border-gray-300 rounded-md mr-4 py-2 w-40">
                                        {dentistFree?.map((dentist, index) => (
                                            <p
                                                key={index}
                                                className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center"
                                                onClick={() => handleOptionDentist(dentist)}
                                            >
                                                {dentist}

                                            </p>
                                        ))}
                                    </div>
                                )}
                                <p className='cursor-pointer text-blue-500' onClick={toggleDropdownDentist}>

                                    {
                                        filterDentist &&

                                        <p>{filterDentist} "Thay đổi bác sĩ"</p>
                                    }
                                    {
                                        !filterDentist &&

                                        <p> {appointmentDetail ? appointmentDetail[10] : "Thay đổi bác sĩ"}</p>
                                    }

                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-[2fr,2fr] py-4'>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                Date:
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="A_DATE"
                                value={date_new ? date_new : appointmentDetail ? formatDateForInput(appointmentDetail[3]) : ""}
                                onChange={(e) => setDateNew(e.target.value)}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                                Time:
                            </label>
                            <input
                                type="time"
                                minTime="09:00:00"
                                maxTime="16:00:00"
                                id="time"
                                name="A_TIME"
                                value={time_new ? time_new : appointmentDetail ? appointmentDetail[4] : ""}
                                onChange={(e) => handleTimeChange(e)}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-[2fr,1fr,1fr]'>
                        <div className='flex flex-col'>
                            <p className="font-bold mb-2">
                                Room
                            </p>

                            <p>{appointmentDetail ? appointmentDetail[6] : ''}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className="font-bold mb-2">
                                OrderNumber:
                            </p>
                            <p>{appointmentDetail ? appointmentDetail[7] : ''}</p>
                        </div>

                    </div>

                    <div className='flex flex-col'>
                        <p className="font-bold mb-2">
                            Status
                        </p>
                        <p>{appointmentDetail ? appointmentDetail[8] : ''}</p>
                    </div>




                </div>

            </div>
            <div className='flex flex-row gap-4'>

                <div className='flex flex-row gap-32'>
                    <Button className="border-none bg-blue-500 py-4 w-24 justify-center flex flex-row items-center" onClick={handleSubmit}>Save</Button>


                </div>
            </div>

        </div>
    );
};


// Export the component
export default EditAppointmentForm;
