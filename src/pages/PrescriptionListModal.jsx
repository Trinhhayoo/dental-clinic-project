import React from 'react';

const PrescriptionListModal = ({ prescriptions, treatmentPlanId, closeModal }) => {
  // Filter prescriptions based on the treatment plan ID
  const filteredPrescriptions = prescriptions.filter(
    (prescription) => prescription.P_TREATMENT_PLAN_ID === treatmentPlanId
  );

  return (
    <div className="modal" style={{ top: '20%' }}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Prescription List for Treatment Plan {treatmentPlanId}</h2>
        <ul>
          {filteredPrescriptions.map((prescription, index) => (
            <li key={index}>
              Prescription ID: {prescription.PRESCRIPTION_ID}<br />
              Description: {prescription.P_DESCRIPTION}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PrescriptionListModal;
