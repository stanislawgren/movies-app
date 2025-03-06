import { IMovieDetails, IMovieGenre, IMoviesList } from "@/interfaces/movies.interfaces";
import { moviesApi } from "@/utils/api";

export const getMovies = async (page: number) => {
    const response = await moviesApi.get<IMoviesList>(`/discover/movie?page=${page}&api_key=${import.meta.env.VITE_MOVIES_API_KEY}`);
    return response.data;
};

export const getMovieDetails = async (id: number) => {
    const response = await moviesApi.get<IMovieDetails>(`/movie/${id}?api_key=${import.meta.env.VITE_MOVIES_API_KEY}`);
    return response.data;
};

export const getMoviesGenres = async () => {
    const response = await moviesApi.get<{ genres: IMovieGenre[] }>(`/3/genre/movie/list?api_key=${import.meta.env.VITE_MOVIES_API_KEY}`);
    return response.data;
};