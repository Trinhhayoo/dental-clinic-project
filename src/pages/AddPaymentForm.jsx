// AddPaymentForm.js

import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { GiReceiveMoney } from 'react-icons/gi';
import { MdAttachMoney } from 'react-icons/md';

const AddPaymentForm = ({ handleAddPayment, onCancel }) => {
  const [formData, setFormData] = useState({
    PM_TREATMENT_PLAN_ID: '',
    TYPE_PAY: '',
    PAYMENT_ID: '',
    PAYMENT_DATE: '',
    PAYER: '',
    PAYER_PHONENUMBER: '',
    PAID_MONEY: '',
    EXCESS_MONEY: '',
    PAYMENT_STATUS: '',
    PAYMENT_NOTE: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodSelect = (paymentMethod) => {
    setFormData({ ...formData, TYPE_PAY: paymentMethod });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPayment(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Payment</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Treatment Plan ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Treatment Plan ID:</label>
          <input
            type="text"
            name="PM_TREATMENT_PLAN_ID"
            value={formData.PM_TREATMENT_PLAN_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Method:</label>
          <div className="flex gap-2 mt-1">
            <Button
              type="button"
              onClick={() => handlePaymentMethodSelect('cash')}
              className={`${
                formData.TYPE_PAY === 'cash' ? 'bg-purple-500 text-white' : 'bg-white text-black'
              } p-2 rounded-md flex items-center`}
            >
              <GiReceiveMoney className="mr-2" />
              Cash
            </Button>
            <Button
              type="button"
              onClick={() => handlePaymentMethodSelect('transfer')}
              className={`${
                formData.TYPE_PAY === 'transfer' ? 'bg-purple-500 text-white' : 'bg-white text-black'
              } p-2 rounded-md flex items-center`}
            >
              <MdAttachMoney className="mr-2" />
              Transfer
            </Button>
          </div>
        </div>

        {/* Payment ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment ID:</label>
          <input
            type="text"
            name="PAYMENT_ID"
            value={formData.PAYMENT_ID}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Payment Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Date:</label>
          <input
            type="text"
            name="PAYMENT_DATE"
            value={formData.PAYMENT_DATE}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Payer */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Payer:</label>
          <input
            type="text"
            name="PAYER"
            value={formData.PAYER}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Payer Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Payer Phone Number:</label>
          <input
            type="text"
            name="PAYER_PHONENUMBER"
            value={formData.PAYER_PHONENUMBER}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Paid Money */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Paid Money:</label>
          <input
            type="text"
            name="PAID_MONEY"
            value={formData.PAID_MONEY}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Excess Money */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Excess Money:</label>
          <input
            type="text"
            name="EXCESS_MONEY"
            value={formData.EXCESS_MONEY}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Payment Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Status:</label>
          <input
            type="text"
            name="PAYMENT_STATUS"
            value={formData.PAYMENT_STATUS}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Payment Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Note:</label>
          <input
            type="text"
            name="PAYMENT_NOTE"
            value={formData.PAYMENT_NOTE}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mt-4 flex gap-4 justify-between">
          <Button
            type="button"
            onClick={onCancel}
            className="border-none bg-gray-500 py-4 px-10 flex items-center gap-2 w-[45%]"
          >
            <p className="flex">Cancel</p>
          </Button>

          <Button
            type="submit"
            className="border-none bg-purple-500 py-4 px-10 flex items-center gap-2 w-[45%]"
          >
            <p className="flex">Save</p>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPaymentForm;
