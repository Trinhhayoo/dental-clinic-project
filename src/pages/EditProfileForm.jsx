import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import patientData from '../assets/patient.json';
import { Button } from '@material-tailwind/react';

const EditProfile = () => {
    const { patientId } = useParams();
    const [patient, setPatient] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedPatient = patientData.find(
            (patient) => patient.PATIENT_ID === parseInt(patientId)
        );
        setPatient(selectedPatient);
    }, [patientId]);

    const handleInputChange = (fieldName, value) => {
        setPatient({
            ...patient,
            [fieldName]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated patient:', patient);
        navigate("/patient")
    };

    const renderInputField = (fieldName, label) => (
        <div key={fieldName} className="mb-3">
            <label className="block text-sm font-bold text-gray-700">{label}</label>
            <input
                type="text"
                value={patient[fieldName] || ''}
                onChange={(e) => handleInputChange(fieldName, e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
            />
        </div>
    );

    if (!patient) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="mt-4 font-bold text-xl">Edit Profile {patient.PP_NAME}</h2>
            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
                {renderInputField('PP_NAME', 'Name')}
                {renderInputField('PP_ORAL_HEALTH', 'Oral Health')}
                {renderInputField('PP_ALLERGY', 'Allergy')}
                {renderInputField('PP_TOTAL_COST', 'Total Cost', 'number')}
                {renderInputField('PP_TOTAL_PAID', 'Total Paid', 'number')}
                {renderInputField('PP_PHONENUMBER', 'Phone Number')}
                {renderInputField('PP_EMAIL', 'Email')}
                {renderInputField('PP_ADDRESS', 'Address')}
                {renderInputField('PP_DATE_OF_BIRTH', 'Date of Birth', 'date')}

                <div className="mt-4 flex gap-4 justify-between">
                    <Link to="/Patient">
                        <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]" >
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

export default EditProfile;
