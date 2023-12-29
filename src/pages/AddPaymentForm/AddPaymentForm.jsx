import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import iconBank from '../../assets/bank.png';
import iconCash from '../../assets/cash.png';
import './AddPaymentForm.css';
import { FaCheck } from 'react-icons/fa';

function PaymentOptions({onChange}) {

  const [selected, setSelected] = useState("cash");

  const handleOptionChange = (value) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div>
        <input 
          type="radio"
          id="cash"
          name="payment"
          checked={selected === "cash"}
          onChange={() => setSelected("cash")} 
        />

        <input
          type="radio" 
          id="bank"
          name="payment" 
          checked={selected === "bank"}
          onChange={() => setSelected("bank")}
        />

        <div className="category">
          <label
            className={`payment-option ${selected === "cash" ? "selected" : ""}`}
            htmlFor="cash"
            onClick={()=> handleOptionChange("cash")}
          >
            <div className="imgName">
              <div className="imgContainer">
                <img src={iconCash} alt="Cash Icon"/>  
              </div>
              <span>Cash</span> 
            </div>
            
            <span className="check">
              <FaCheck/>
            </span>
          </label>
            
          <label
            className={`payment-option ${selected === "bank" ? "selected" : ""}`}
            htmlFor="bank"
            onClick={()=> handleOptionChange("banking")}
          >
            <div className="imgName">
              <div className="imgContainer">
                <img src={iconBank} alt="Bank Icon" />  
              </div>
              <span>Bank Transfer</span> 
            </div>
            
            <span className="check">
              <FaCheck/>
            </span>  
          </label>
        </div>
    </div>
  );
}

const AddPaymentForm = () => {
  const [formData, setFormData] = useState({
    PM_TREATMENT_PLAN_ID: '',
    PAYMENT_DATE: '',
    PAYER: '',
    PAYER_PHONENUMBER:'',
    PAID_MONEY: '',
    EXCESS_MONEY: '',
    TYPE_PAY: '',
    PAYMENT_STATUS: '',
    PAYMENT_NOTE: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    navigate('/Payment');
  };

  const handlePaymentTypeChange = (value) => {
    setFormData({ ...formData, TYPE_PAY: value });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-center text-2xl font-semibold mb-3">Add Payment</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
        <div>
          <label htmlFor="treatmentPlanID" className="block text-sm font-medium text-gray-700">
            Treatment Plan ID:
          </label>
          <input
            type="text"
            id="treatmentPlanID"
            name="PM_TREATMENT_PLAN_ID"
            value={formData.PM_TREATMENT_PLAN_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="typePay" className="block text-sm font-medium text-gray-700">
              Type Pay:
          </label>

          <PaymentOptions onChange={handlePaymentTypeChange}
        />
      </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Payment Date:
          </label>
          <input
            type="datetime-local"
            id="date"
            name="PAYMENT_DATE"
            value={formData.PAYMENT_DATE}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="payer" className="block text-sm font-medium text-gray-700">
            Payer:
          </label>
          <input
            type="text"
            id="payer"
            name="PAYER"
            value={formData.PAYER}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="payerPhoneNumber" className="block text-sm font-medium text-gray-700">
            Payer Phone Number
          </label>
          <input
            type="text"
            id="payerPhoneNumber"
            name="PAYER_PHONENUMBER"
            value={formData.PAYER_PHONENUMBER}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="paidMoney" className="block text-sm font-medium text-gray-700">
            Paid Money:
          </label>
          <input
            type="text"
            id="paidMoney"
            name="PAID_MONEY"
            value={formData.PAID_MONEY}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="excessMoney" className="block text-sm font-medium text-gray-700">
            Excess Money:
          </label>
          <input
            type="text"
            id="excessMoney"
            name="EXCESS_MONEY"
            value={formData.EXCESS_MONEY}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Payment Status:
          </label>
          <input
            type="text"
            id="status"
            name="PAYMENT_STATUS"
            value={formData.PAYMENT_STATUS}
            onChange={handleInputChange}
            className="mb-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Payment Note:
          </label>
          <input
            type="text"
            id="note"
            name="PAYMENT_NOTE"
            value={formData.PAYMENT_NOTE}
            onChange={handleInputChange}
            className="mb-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mt-4 flex gap-4 justify-between">
          <Link to="/payment">
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

export default AddPaymentForm;