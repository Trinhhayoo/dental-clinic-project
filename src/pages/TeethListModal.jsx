import React from 'react';
import teethData from "../assets/teeth.json";
import surfaceData from "../assets/surface.json";
import ttPlanData from "../assets/tt_plan.json";

const TeethListModal = ({ treatmentPlan, closeModal }) => {
  const teethList = ttPlanData
    .filter((tt) => tt.TT_TREATMENT_PLAN_ID === treatmentPlan.TREATMENT_PLAN_ID)
    .map((ttPlan, ttIndex) => ({
      tooth: teethData.find((teeth) => teeth.TEETH_ID === ttPlan?.TT_TEETH_TREATMETN_ID)?.TEETH_NAME,
      surface: surfaceData.find((surface) => surface.SURFACE_TEETH_ID === ttPlan?.TT_SURFACE_ID)?.SURFACE_NAME,
    }));

  return (
    <div className="modal" style={{ top: '20%' }}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Teeth List for Treatment Plan {treatmentPlan.TREATMENT_PLAN_ID}</h2>
        <ul>
          {teethList.map((teeth, index) => (
            <li key={index}>
              Tooth: {teeth.tooth}, Surface: {teeth.surface}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeethListModal;
