import { moviesApi } from "@/utils/api";

export const getMovies = async (page: number) => {
    const response = await moviesApi.get(`/discover/movie?page=${page}&api_key=${import.meta.env.VITE_MOVIES_API_KEY}`);
    return response.data;
};