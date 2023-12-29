import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import appointmentData from '../assets/appointment.json';

const AppointmentDetail = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const selectedAppointment = appointmentData.find(
      (appointment) => appointment.APPOINTMENT_ID === parseInt(appointmentId)
    );
    setAppointment(selectedAppointment);
  }, [appointmentId]);

  if (!appointment) {
    return <p>Loading...</p>;
  }

  const renderDetailField = (label, value) => (
    <div key={label} className="mb-3">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      <p className="mt-1 p-2 border rounded-md">{value}</p>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Appointment Detail</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {renderDetailField('Patient ID', appointment.A_PATIENT_ID)}
          {renderDetailField('Order Number', appointment.A_ORDER_NUMBER)}
          {renderDetailField('Date', appointment.A_DATE)}
          {renderDetailField('Room ID', appointment.A_ROOM_ID)}
        </div>
        <div>
          {renderDetailField('Dentist ID', appointment.A_DENTIST_ID)}
          {renderDetailField('Time', appointment.A_TIME)}
          {renderDetailField('Request ID', appointment.A_REQUEST_ID)}
          {/* Add other fields as needed */}
        </div>
      </div>
      <div className="mt-4 flex gap-4 justify-between col-span-2">
        {/* Add your Link components for different actions */}
        {/* For example, you can link to an Edit page */}
        <Link to={`/EditAppointmentForm/${appointment.APPOINTMENT_ID}`}>
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">Edit</p>
          </Button>
        </Link>
        {/* Add other actions as needed */}
        <Link to="/Appointments">
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">Back</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentDetail;
