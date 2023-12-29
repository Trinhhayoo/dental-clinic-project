import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import treatmentPlanData from '../assets/treatmentplan.json';
import { Button } from '@material-tailwind/react';

const EditTreatmentPlanForm = () => {
  const { treatmentplanId } = useParams();
  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedTreatmentPlan = treatmentPlanData.find(
      (plan) => plan.TREATMENT_PLAN_ID === parseInt(treatmentplanId)
    );
    setTreatmentPlan(selectedTreatmentPlan);
  }, [treatmentplanId]);

  const handleInputChange = (fieldName, value) => {
    setTreatmentPlan({
      ...treatmentPlan,
      [fieldName]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated treatment plan:', treatmentPlan);
    // Add logic to update data or dispatch actions if using Redux
  };

  const renderInputField = (fieldName, label) => (
    <div key={fieldName} className="mb-3">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      <input
        type="text"
        value={treatmentPlan[fieldName] || ''}
        onChange={(e) => handleInputChange(fieldName, e.target.value)}
        className="mt-1 p-2 w-full border rounded-md"
      />
    </div>
  );

  if (!treatmentPlan) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-4 font-bold text-xl">Edit Treatment Plan {treatmentPlan.TREATMENT_PLAN_ID}</h2>
      <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
        {renderInputField('TP_PATIENT_ID', 'Patient ID')}
        {renderInputField('TP_DENTIST_ID', 'Dentist ID')}
        {renderInputField('TP_PRESCRIPTION', 'Prescription')}
        {renderInputField('TP_ASSISTANT_ID', 'Assistant ID')}
        {renderInputField('TP_NOTE', 'Note')}
        {renderInputField('TP_STATUS', 'Status')}
        {renderInputField('TP_TREATMENT_ID', 'Treatment ID')}
        {renderInputField('PARENT_TREATMENT_ID', 'Parent Treatment ID')}
        {renderInputField('TP_DATE', 'Date')}
        {/* Add other fields as needed */}
        
        <div className="mt-4 flex gap-4 justify-between">
          <Button
            onClick={() => navigate(-1)}
            className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[100%]"
          >
            <p className="flex">Back</p>
          </Button>

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

export default EditTreatmentPlanForm;
