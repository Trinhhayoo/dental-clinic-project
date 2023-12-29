import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import appointmentData from '../assets/appointment.json';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

const PatientAppointments = () => {
  const itemsPerPage = 5;
  const { patientId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const patientAppointments = appointmentData.filter(
      (appointment) => appointment.A_PATIENT_ID === parseInt(patientId)
    );
    setAppointments(patientAppointments);
  }, [patientId]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleAppointments = appointments.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleGoBack = () => {
    // Go back to the previous page
    navigate(-1);
  };

  const handleGoToAppointments = () => {
    // Navigate to the "/Appointment" page
    navigate('/Appointment');
  };

  if (visibleAppointments.length === 0) {
    return <p>No appointments found for this patient.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Patient Appointments</h2>
      <ul>
        {visibleAppointments.map((appointment) => (
          <li key={appointment.APPOINTMENT_ID}>
            <p>Date: {appointment.A_DATE}</p>
            <p>Time: {appointment.A_TIME}</p>
            <p>Room: {appointment.A_ROOM_ID}</p>
            <p>Dentist: {appointment.A_DENTIST_ID}</p>
            {/* Add more fields as needed */}
            <hr />
          </li>
        ))}
      </ul>

      <div className="flex flex-row justify-between mt-4">
        <button
          className="text-blue-700 hover:underline focus:outline-none"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <MdOutlineKeyboardDoubleArrowLeft size={30} />
          Previous Page
        </button>

        <div>
          <button
            className="text-blue-700 hover:underline focus:outline-none mr-4"
            onClick={handleGoBack}
          >
            Go Back
          </button>
          <button
            className="text-blue-700 hover:underline focus:outline-none"
            onClick={handleGoToAppointments}
          >
            Go to Appointments
          </button>
        </div>

        {appointments.length > itemsPerPage * currentPage && (
          <button
            className="text-blue-700 hover:underline focus:outline-none"
            onClick={handleNextPage}
          >
            Next Page
            <MdOutlineKeyboardDoubleArrowRight size={30} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
