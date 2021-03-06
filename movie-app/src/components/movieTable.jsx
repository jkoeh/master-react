import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
class MovieTable extends Component {
  columns = [
    {
      path: "title",
      value: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", value: "Genre" },
    { path: "numberInStock", value: "Stock" },
    { path: "dailyRentalRate", value: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onLike={e => this.props.onLike(movie)} />
      )
    }
  ];
  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={e => this.props.onDelete(movie._id)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MovieTable;
