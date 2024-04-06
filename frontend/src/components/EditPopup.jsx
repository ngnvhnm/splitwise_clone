import React, { useState } from "react";

const EditPopup = ({
  onClose,
  visible,
  textEditing,
  editClicking,
  editText,
}) => {
  if (!visible) return null;

  const handleClick = () => {
    editClicking(editText.id, editText);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="grid grid-flow-row">
        <input
          value={editText.title}
          onChange={(e) => textEditing(e.target.value, "title")}
          className="my-2 py-1 px-2 rounded-2xl"
          type="text"
          name="title"
          placeholder="Title"
        />
        <input
          value={editText.who_pays}
          onChange={(e) => textEditing(e.target.value, "who_pays")}
          className="my-2 py-1 px-2 rounded-2xl"
          type="text"
          name="who_pays"
          placeholder="Who Pays"
        />
        <input
          value={editText.paid_amount}
          onChange={(e) => textEditing(e.target.value, "paid_amount")}
          className="my-2 py-1 px-2 rounded-2xl"
          type="number"
          name="paid_amount"
          placeholder="Paid Amount"
        />
        <input
          value={editText.no_of_people}
          onChange={(e) => textEditing(e.target.value, "no_of_people")}
          className="my-2 py-1 px-2 rounded-2xl"
          type="number"
          name="no_of_people"
          placeholder="Number of People"
        />
        <input
          value={editText.who_owes}
          onChange={(e) => textEditing(e.target.value, "who_owes")}
          className="my-2 py-1 px-2 rounded-2xl"
          type="text"
          name="who_owes"
          placeholder="Who Owes"
        />
        <button
          onClick={handleClick}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Edit
        </button>
        <button
          onClick={onClose}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditPopup;
