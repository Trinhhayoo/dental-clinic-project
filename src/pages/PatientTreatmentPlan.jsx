import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import treatmentPlanData from '../assets/treatmentplan.json';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

const PatientTreatmentPlan = () => {
  const itemsPerPage = 5;
  const { patientId } = useParams();
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const patientTreatmentPlans = treatmentPlanData.filter(
      (plan) => plan.TP_PATIENT_ID === parseInt(patientId)
    );
    setTreatmentPlans(patientTreatmentPlans);
  }, [patientId]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleTreatmentPlans = treatmentPlans.slice(startIndex, startIndex + itemsPerPage);

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

  const handleGoToTreatmentPlans = () => {
    // Navigate to the "/PatientTreatmentPlan" page
    navigate('/TreatmentPlan');
  };

  if (visibleTreatmentPlans.length === 0) {
    return <p>No treatment plans found for this patient.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Patient Treatment Plans</h2>
      <ul>
        {visibleTreatmentPlans.map((plan) => (
          <li key={plan.TREATMENT_PLAN_ID}>
            <p>Prescription: {plan.TP_PRESCRIPTION}</p>
            <p>Note: {plan.TP_NOTE}</p>
            <p>Status: {plan.TP_STATUS}</p>
            <p>Date: {plan.TP_DATE}</p>
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
            onClick={handleGoToTreatmentPlans}
          >
            Go to Treatment Plans
          </button>
        </div>

        {treatmentPlans.length > itemsPerPage * currentPage && (
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

export default PatientTreatmentPlan;
