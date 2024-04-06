import React, { useState } from "react";
import axios from "axios";

const MyFormComponent = ({ setFinance, fetchData }) => {
  const init = {
    title: "",
    who_pays: "",
    paid_amount: "",
    no_of_people: "",
    who_owes: "",
  };

  const [formData, setFormData] = useState(init);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/finance/", formData);
      console.log("Data submitted successfully!");
      setFormData(init);
      fetchData();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="my-2 mr-2 py-1 px-2 rounded-2xl"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        className="my-2 mr-2 py-1 px-2 rounded-2xl"
        type="text"
        name="who_pays"
        value={formData.who_pays}
        onChange={handleChange}
        placeholder="Who Pays"
      />
      <input
        className="my-2 mr-2 py-1 px-2 rounded-2xl"
        type="number"
        name="paid_amount"
        value={formData.paid_amount}
        onChange={handleChange}
        placeholder="Paid Amount"
      />
      <input
        className="my-2 mr-2 py-1 px-2 rounded-2xl"
        type="number"
        name="no_of_people"
        value={formData.no_of_people}
        onChange={handleChange}
        placeholder="Number of People"
      />
      <input
        className="my-2 mr-2 py-1 px-2 rounded-2xl"
        type="text"
        name="who_owes"
        value={formData.who_owes}
        onChange={handleChange}
        placeholder="Who Owes"
      />
      <button
        type="submit"
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        Submit
      </button>
    </form>
  );
};

export default MyFormComponent;
