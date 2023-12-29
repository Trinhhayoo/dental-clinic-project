import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import treatmentPlanData from '../assets/treatmentplan.json';
import { Button } from '@material-tailwind/react';
import TeethListModal from './TeethListModal';
import PrescriptionListModal from './PrescriptionListModal';

const TreatmentPlanDetail = () => {
  const { treatmentplanId } = useParams();
  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [isTeethModalOpen, setIsTeethModalOpen] = useState(false);
  const [isPrescriptionsModalOpen, setIsPrescriptionsModalOpen] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const selectedTreatmentPlan = treatmentPlanData.find(
      (plan) => plan.TREATMENT_PLAN_ID === parseInt(treatmentplanId)
    );
    setTreatmentPlan(selectedTreatmentPlan);
  }, [treatmentplanId]);

  useEffect(() => {
    // Fetch prescriptions based on the selected treatment plan
    const fetchPrescriptions = async () => {
      // Replace this with your actual API call or data retrieval logic
      const response = await fetch(`/api/prescriptions/${treatmentplanId}`);
      const data = await response.json();
      setPrescriptions(data);
    };

    if (treatmentPlan) {
      fetchPrescriptions();
    }
  }, [treatmentPlan, treatmentplanId]);

  if (!treatmentPlan) {
    return <p>Loading...</p>;
  }

  const renderDetailField = (label, value) => (
    <div key={label} className="mb-3">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      <p className="mt-1 p-2 border rounded-md">{value}</p>
    </div>
  );

  const openTeethModal = () => {
    setIsTeethModalOpen(true);
  };

  const closeTeethModal = () => {
    setIsTeethModalOpen(false);
  };

  const openPrescriptionsModal = () => {
    setIsPrescriptionsModalOpen(true);
  };

  const closePrescriptionsModal = () => {
    setIsPrescriptionsModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Treatment Plan Detail</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {renderDetailField('Patient ID', treatmentPlan.TP_PATIENT_ID)}
          {renderDetailField('Dentist ID', treatmentPlan.TP_DENTIST_ID)}
          {renderDetailField('Prescription', treatmentPlan.TP_PRESCRIPTION)}
          {renderDetailField('Assistant ID', treatmentPlan.TP_ASSISTANT_ID)}
          {renderDetailField('Note', treatmentPlan.TP_NOTE)}
        </div>
        <div>
          {renderDetailField('Status', treatmentPlan.TP_STATUS)}
          {renderDetailField('Treatment ID', treatmentPlan.TP_TREATMENT_ID)}
          {renderDetailField('Parent Treatment ID', treatmentPlan.PARENT_TREATMENT_ID)}
          {renderDetailField('Date', treatmentPlan.TP_DATE)}
        </div>
      </div>
      <div className="mt-4 flex gap-4 justify-between col-span-2">
        <Link to={`/EditTreatmentPlanForm/${treatmentPlan.TREATMENT_PLAN_ID}`}>
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">Edit</p>
          </Button>
        </Link>
        <Link to="/TreatmentPlan">
          <Button className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[25%]">
            <p className="flex">Back</p>
          </Button>
        </Link>
        <Button
          id="viewteeth"
          onClick={openTeethModal}
          className="border-none bg-purple-500 py-4 px-7 flex flex-row items-center gap-2"
        >
          <p className="flex">Teeth</p>
        </Button>
        <Button
          id="viewprescriptions"
          onClick={openPrescriptionsModal}
          className="border-none bg-purple-500 py-4 px-7 flex flex-row items-center gap-2"
        >
          <p className="flex">View Prescriptions</p>
        </Button>
      </div>
      {isTeethModalOpen && (
        <TeethListModal
          treatmentPlan={treatmentPlan}
          closeModal={closeTeethModal}
        />
      )}
      {isPrescriptionsModalOpen && (
        <PrescriptionListModal
          prescriptions={prescriptions}
          closeModal={closePrescriptionsModal}
        />
      )}
    </div>
  );
};

export default TreatmentPlanDetail;
