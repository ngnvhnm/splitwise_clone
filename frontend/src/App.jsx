import DynamicTable from "./components/DynamicTable";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import MyFormComponent from "./components/Form";
import EditPopup from "./components/EditPopup";

function App() {
  const [finance, setFinance] = useState([]);

  useEffect(() => {
    fetchData();
    // console.log(finance);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/finance/");
      const financeData = response.data;
      setFinance(financeData);
    } catch (error) {
      console.log("Cannot get data", error);
    }
  };

  const [editText, setEditText] = useState({
    id: "",
    title: "",
    who_pays: "",
    paid_amount: "",
    no_of_people: "",
    who_owes: "",
  });

  const handleDelete = async (id) => {
    try {
      console.log("Deleting item with ID:", id);
      await axios.delete(`http://127.0.0.1:8000/api/finance/${id}/`);

      const newData = finance.filter((fin) => fin.id !== id);
      setFinance(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, value) => {
    try {
      console.log(value);
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/finance/${id}/`,
        value
      );
      const newFinance = finance.map((fin) =>
        fin.id === id ? response.data : fin
      );
      setFinance(newFinance);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextChange = (value, fieldName) => {
    setEditText((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    console.log(editText);
  };

  const handleCheckBox = async (id, value) => {
    handleEdit(id, {
      already_paid: !value,
    });
  };

  const [showModal, setShowModal] = useState(false);
  const handleOnClose = () => setShowModal(false);

  const financeDataArrays = finance.map((financeItem) => [
    financeItem.title,
    financeItem.who_pays,
    financeItem.paid_amount,
    financeItem.no_of_people,
    financeItem.who_owes,
    <>{new Date(financeItem.created).toLocaleString()}</>,
    <div className="grid grid-flow-col justify-center">
      <span
        className="inline-block cursor-pointer"
        onClick={() => handleCheckBox(financeItem.id, financeItem.already_paid)}
      >
        {financeItem.already_paid ? (
          <MdOutlineCheckBox />
        ) : (
          <MdOutlineCheckBoxOutlineBlank />
        )}
      </span>
    </div>,
    <div className="grid grid-flow-col justify-center">
      <span className="mr-3 inline-block cursor-pointer">
        <MdEditNote
          onClick={() => {
            setShowModal(true);
            setEditText({
              id: financeItem.id,
              title: financeItem.title,
              who_pays: financeItem.who_pays,
              paid_amount: financeItem.paid_amount,
              no_of_people: financeItem.no_of_people,
              who_owes: financeItem.who_owes,
            });
          }}
        />
      </span>{" "}
      <span
        className="inline-block cursor-pointer"
        onClick={() => handleDelete(financeItem.id)}
      >
        <MdOutlineDeleteOutline />
      </span>
    </div>,
  ]);

  const headings = [
    "Title",
    "Who pays",
    "Paid amount",
    "Number of people",
    "Who owes",
    "Date",
    "Already paid",
    "Actions",
  ];

  const headings2 = ["To be paid", "To Pay", "Paid amount each"];

  const countWords = (str) => {
    if (str.includes(",")) {
      const substrings = str.split(",");

      let totalCount = 0;

      substrings.forEach((substring) => {
        const words = substring.trim().split(/\s+/).filter(Boolean).length;
        totalCount += words;
      });

      return totalCount;
    } else {
      return str.trim().split(/\s+/).filter(Boolean).length;
    }
  };

  const dataAnalytics = finance.map((finItem) => [
    finItem.who_pays,
    finItem.who_owes,
    (
      finItem.paid_amount /
      (countWords(finItem.who_owes.toLocaleString()) + 1)
    ).toFixed(2),
  ]);

  return (
    <>
      <div className="bg-indigo-100 px-8">
        <h1 className="mb-4 text-6xl font-extrabold text-gray-900 dark:text-orange-400 md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            SplitWise
          </span>{" "}
          Clone
        </h1>

        <div>
          <MyFormComponent setFinance={setFinance} fetchData={fetchData} />
        </div>

        <div className="my-5">
          <h1 className="text-center text-4xl font-bold text-blue-600 text-opacity-80 tracking-wide mb-2">
            Finance History
          </h1>
          <DynamicTable
            tableHeadings={headings}
            tableData={financeDataArrays}
            numRows={financeDataArrays.length}
            numColumns={headings.length}
          />
        </div>

        <div className="my-5">
          <h1 className="text-center text-4xl font-bold text-blue-600 text-opacity-80 tracking-wide mb-2">
            Paying Tables
          </h1>
          <DynamicTable
            tableHeadings={headings2}
            tableData={dataAnalytics}
            numRows={dataAnalytics.length}
            numColumns={headings2.length}
          />
          <button
            className="text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4
           focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Caculate
          </button>
        </div>

        <EditPopup
          editText={editText}
          textEditing={handleTextChange}
          editClicking={handleEdit}
          onClose={handleOnClose}
          visible={showModal}
        />
      </div>
    </>
  );
}

export default App;
