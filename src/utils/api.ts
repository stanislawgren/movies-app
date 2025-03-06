import axios from 'axios';

export const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});