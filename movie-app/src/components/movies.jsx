import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import MovieTable from "./movieTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pagination: {
      currentPage: 1,
      pageSize: 4
    },
    genres: [],
    sortColumn: { path: "title", order: "asc" }
  };
  componentDidMount = () => {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    const movies = getMovies();
    this.setState({ movies, genres });
  };
  handleDeleteMovie = id => {
    // could be simplify if we don't need to delete the movie from db, just filter by id directly
    const movieToDelete = deleteMovie(id);
    this.setState({
      movies: this.state.movies.filter(x => x._id !== movieToDelete._id)
    });
  };
  handlePagination = page => {
    this.setState({
      pagination: { ...this.state.pagination, currentPage: page }
    });
  };
  handleLike = movie => {
    this.setState({
      movies: this.state.movies.map(x =>
        x._id === movie._id ? { ...x, liked: !movie.liked } : x
      )
    });
  };
  handleOnGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      pagination: { ...this.state.pagination, currentPage: 1 }
    });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPageDate() {
    const {
      movies: allMovies,
      pagination,
      selectedGenre,
      sortColumn
    } = this.state;
    const movieByGenre = allMovies.filter(
      x =>
        selectedGenre == null ||
        selectedGenre._id === "" ||
        x.genre._id === selectedGenre._id
    );
    const sortedMovies = _.orderBy(
      movieByGenre,
      [sortColumn.path],
      [sortColumn.order]
    );
    const moviesCount = movieByGenre.length;
    const movies = paginate(
      sortedMovies,
      pagination.currentPage,
      pagination.pageSize
    );
    return { totalCount: moviesCount, data: movies };
  }
  render() {
    const { pagination, genres, selectedGenre, sortColumn } = this.state;
    const { totalCount, data } = this.getPageDate();
    return (
      <main className="container">
        {totalCount === 0 ? (
          <p>There are no movies in the database.</p>
        ) : (
          <React.Fragment>
            <p>Showing {totalCount} movies in the database</p>
            <div className="row">
              <ListGroup
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreSelect={this.handleOnGenreSelect}
              />
              <MovieTable
                movies={data}
                onLike={this.handleLike}
                onDelete={this.handleDeleteMovie}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
            </div>
            <Pagination
              itemsCount={totalCount}
              pageSize={pagination.pageSize}
              currentPage={pagination.currentPage}
              handlePagination={this.handlePagination}
            />
          </React.Fragment>
        )}
      </main>
    );
  }
}

export default Movies;
