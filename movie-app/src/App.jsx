import React, { Component } from "react";
import "./App.css";
import { getMovies, deleteMovie } from "./services/fakeMovieService";
import LikeIcon from "./likeicon";
class App extends Component {
  state = {
    movies: getMovies().map(x => ({ ...x, liked: false })),
    headers: ["Title", "Genre", "Stock", "Rate", "Like", "Delete"]
  };
  handleDeleteMovie = id => {
    // could be simplify if we don't need to delete the movie from db, just filter by id directly
    const movieToDelete = deleteMovie(id);
    this.setState({
      movies: this.state.movies.filter(x => x._id !== movieToDelete._id)
    });
  };
  handleLike = movie => {
    this.setState({
      movies: this.state.movies.map(x =>
        x._id === movie._id ? { ...x, liked: !movie.liked } : x
      )
    });
  };
  render() {
    return (
      <main className="container">
        {this.state.movies.length === 0 ? (
          <p>There are no movies in the database.</p>
        ) : (
          <React.Fragment>
            <p>Showing {this.state.movies.length} movies in the database</p>
            <table className="table">
              <thead>
                <tr>
                  {this.state.headers.map(header => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map(movie => (
                  <tr key={movie._id}>
                    <th scope="row">{movie.title}</th>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <LikeIcon
                        liked={movie.liked}
                        onLike={e => this.handleLike(movie)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={e => this.handleDeleteMovie(movie._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </main>
    );
  }
}

export default App;
