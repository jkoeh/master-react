import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
class MovieTable extends Component {
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
    const { movies, onLike, onDelete } = this.props;
    const columns = [
      { path: "title", value: "Title" },
      { path: "genre.name", value: "Genre" },
      { path: "numberInStock", value: "Stock" },
      { path: "dailyRentalRate", value: "Rate" },
      { key: "like" },
      { key: "delete" }
    ];
    return (
      <table className="col-md offset-sm-1 table">
        <TableHeader tableHeaders={columns} onSort={this.raiseSort} />
        <TableBody
          items={movies}
          columns={columns}
          onLike={onLike}
          onDelete={onDelete}
        />
      </table>
    );
  }
}

export default MovieTable;
