import config from "../config.json";
import http from "./httpService";

const movieUrl = id => {
  const url = config.apiEndPoint + "/movies";
  if (id) {
    return url + "/" + id;
  }
  return url;
};

export function getMovies() {
  return http.get(movieUrl());
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

function movieTitleInDb(title) {
  return getMovies().then(
    ({ data }) => data.filter(m => m.title === title).length > 0
  );
}
export async function saveMovie(movie) {
  if (await movieTitleInDb(movie.title)) {
    return movie.title + " is already in the database";
  }
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  } else {
    return http.post(movieUrl(), movie);
  }
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
