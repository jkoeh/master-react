import React from "react";
const TableHeader = props => {
  const { tableHeaders, onSort } = props;
  return (
    <thead>
      <tr>
        {tableHeaders.map(header => (
          <th
            key={header.value || header.key}
            scope="col"
            onClick={() => onSort(header.path)}
          >
            {header.value}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
