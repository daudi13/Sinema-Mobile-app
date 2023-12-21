const apiKey: string = 'ff98e1d8f6ef5572e1bff44d87129242';
export const baseImagePath = (size: string, path: string) =>
  `https://image.tmdb.org/t/p/${size}${path}`;
export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
export const topRatedMovies: string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
export const upComingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
export const searchMovies = (keyword: string) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`;
export const movieDetails = (id: number) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
export const movieCastDetails = (id: number) =>
  `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
