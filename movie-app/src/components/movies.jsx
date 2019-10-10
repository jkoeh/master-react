import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import MovieTable from "./movieTable";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import SearchBar from "./common/searchBar";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    pagination: {
      currentPage: 1,
      pageSize: 4
    },
    searchText: "",
    genres: [],
    sortColumn: { path: "title", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  handleDeleteMovie = async id => {
    const originalMovies = this.state.movies;
    this.setState({
      movies: this.state.movies.filter(x => x._id !== id)
    });
    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
      this.setState({ movies: originalMovies });
    }
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
      searchText: "",
      selectedGenre: genre,
      pagination: { ...this.state.pagination, currentPage: 1 }
    });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleSearch = query => {
    this.setState({
      searchText: query,
      selectedGenre: null,
      pagination: { ...this.state.pagination, currentPage: 1 }
    });
  };
  getPageDate() {
    const {
      movies: allMovies,
      pagination,
      selectedGenre,
      sortColumn,
      searchText
    } = this.state;
    const movieBySearch = allMovies.filter(x =>
      x.title.toLocaleLowerCase().includes(searchText)
    );
    const movieByGenre = movieBySearch.filter(
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
    const {
      pagination,
      genres,
      selectedGenre,
      sortColumn,
      searchText
    } = this.state;

    const { totalCount, data } = this.getPageDate();
    const { user } = this.props;
    return (
      <main className="container">
        <React.Fragment>
          <div className="row">
            <div className="col-sm-2">
              <ListGroup
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreSelect={this.handleOnGenreSelect}
              />
            </div>
            <div className="container col-sm-10 ">
              {user && (
                <NavLink className="btn btn-primary" to="/movies/new">
                  New Movie
                </NavLink>
              )}
              <div style={{ margin: "20px 0" }}>
                {totalCount === 0 ? (
                  <p>There are no movies in the database.</p>
                ) : (
                  <p>Showing {totalCount} movies in the database</p>
                )}
              </div>
              <SearchBar searchText={searchText} onChange={this.handleSearch} />
              <MovieTable
                movies={data}
                onLike={this.handleLike}
                onDelete={this.handleDeleteMovie}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
            </div>
          </div>
          <Pagination
            itemsCount={totalCount}
            pageSize={pagination.pageSize}
            currentPage={pagination.currentPage}
            handlePagination={this.handlePagination}
          />
        </React.Fragment>
      </main>
    );
  }
}

export default Movies;
