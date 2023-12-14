import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import appointmentData from '../assets/appointment.json';
import { Button } from '@material-tailwind/react';

const EditAppointmentForm = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedAppointment = appointmentData.find(
            (appointment) => appointment.A_ORDER_NUMBER === parseInt(appointmentId)
        );
        setAppointment(selectedAppointment);
    }, [appointmentId]);

    const handleInputChange = (fieldName, value) => {
        setAppointment({
            ...appointment,
            [fieldName]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated appointment:', appointment);
        // Add logic to update data or dispatch actions if using Redux
    };

    const renderInputField = (fieldName, label) => (
        <div key={fieldName} className="mb-3">
            <label className="block text-sm font-bold text-gray-700">{label}</label>
            <input
                type="text"
                value={appointment[fieldName] || ''}
                onChange={(e) => handleInputChange(fieldName, e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
            />
        </div>
    );

    if (!appointment) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="mt-4 font-bold text-xl">Edit Appointment {appointment.A_ORDER_NUMBER}</h2>
            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
                {renderInputField('A_DATE', 'Date')}
                {renderInputField('A_TIME', 'Time')}
                {renderInputField('A_DENTIST_NAME', 'Dentist')}
                {renderInputField('A_ROOM_ID', 'Room')}
                {renderInputField('A_ORDER_ID', 'Order ID')}
                {renderInputField('A_PATIENT_ID', 'Patient ID')}
                {renderInputField('A_REQUEST_ID', 'Request ID')}

                <div className="mt-4 flex gap-4 justify-between">
                    <Link to="/Appointment">
                        <Button
                            className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]"
                        >
                            <p className="flex">Back</p>
                        </Button>
                    </Link>

                    <Button
                        type="submit"
                        className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]"
                    >
                        <p className="flex">Save</p>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditAppointmentForm;
