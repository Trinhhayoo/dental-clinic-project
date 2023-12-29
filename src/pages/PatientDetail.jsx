// PatientDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import patientData from '../assets/patient.json';
import { Button } from '@material-tailwind/react';

const PatientDetail = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const selectedPatient = patientData.find(
      (patient) => patient.PATIENT_ID === parseInt(patientId)
    );
    setPatient(selectedPatient);
  }, [patientId]);

  if (!patient) {
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
      <h2 className="text-2xl font-semibold mb-4 text-center">Patient Detail</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {renderDetailField('Name', patient.PP_NAME)}
          {renderDetailField('Oral Health', patient.PP_ORAL_HEALTH)}
          {renderDetailField('Allergy', patient.PP_ALLERGY)}
          {renderDetailField('Total Cost', patient.PP_TOTAL_COST)}
        </div>
        <div>
          {renderDetailField('Total Paid', patient.PP_TOTAL_PAID)}
          {renderDetailField('Phone Number', patient.PP_PHONENUMBER)}
          {renderDetailField('Email', patient.PP_EMAIL)}
          {renderDetailField('Date of Birth', patient.PP_DATE_OF_BIRTH)}
        </div>
      </div>
      <div className="mt-4 flex gap-4 justify-between col-span-2">
        <Link to={`/PatientTreatmentPlan/${patient.PATIENT_ID}`}>
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">TreatmentPlan</p>
          </Button>
        </Link>
        <Link to={`/EditPatientForm/${patient.PATIENT_ID}`}>
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">Edit</p>
          </Button>
        </Link>
        <Link to={`/PatientAppointments/${patient.PATIENT_ID}`}>
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">Appointments</p>
          </Button>
        </Link>
        <Link to="/Patient">
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">Back</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PatientDetail;
