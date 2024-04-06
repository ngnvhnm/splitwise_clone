import React from "react";

const DynamicTable = ({ tableHeadings, tableData, numRows, numColumns }) => {
  // Function to generate table headings
  const renderTableHeadings = () => {
    return (
      <tr>
        {tableHeadings.map((heading, index) => (
          <th key={index} className="border-2 border-black">
            {heading}
          </th>
        ))}
      </tr>
    );
  };

  // Function to generate table rows and data
  const renderTableData = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const rowData = tableData[i] || [];
      const cells = [];
      for (let j = 0; j < numColumns; j++) {
        cells.push(
          <td key={j} className="border-2 border-black">
            {rowData[j]}
          </td>
        );
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    return rows;
  };

  return (
    <table className="w-full mb-5">
      <thead className="text-center">{renderTableHeadings()}</thead>
      <tbody className="text-center">{renderTableData()}</tbody>
    </table>
  );
};

export default DynamicTable;
