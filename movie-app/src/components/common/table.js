import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = ({ columns, data, onSort, sortColumn }) => {
  return (
    <table className="col table">
      <TableHeader
        tableHeaders={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
      <TableBody items={data} columns={columns} />
    </table>
  );
};

export default Table;
