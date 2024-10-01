import express from  'express';

const router = express.Router();

import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovies, getTrendingMovie } from '../controller/movie.controller.js';

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

export default router;