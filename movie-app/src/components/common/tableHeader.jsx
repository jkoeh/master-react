import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
class TableHeader extends Component {
  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.key || column.path !== sortColumn.path) return null;
    var icon;
    if (sortColumn.order === "asc") {
      icon = faSortUp;
    } else {
      icon = faSortDown;
    }
    return <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={icon} />;
  };

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { tableHeaders } = this.props;
    return (
      <thead>
        <tr>
          {tableHeaders.map(header => (
            <th
              key={header.value || header.key}
              scope="col"
              onClick={() => this.raiseSort(header.path)}
              className="clickable"
            >
              {header.value} {this.renderSortIcon(header)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
