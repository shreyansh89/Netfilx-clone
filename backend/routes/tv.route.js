import express from 'express';
import { getSimilartvs, getTrendingtv, gettvDetails, gettvsByCategory, gettvTrailers } from '../controller/tv.controller.js';

const router  = express.Router();

router.get("/trending", getTrendingtv);
router.get("/:id/trailers", gettvTrailers);
router.get("/:id/details", gettvDetails);
router.get("/:id/similar", getSimilartvs);
router.get("/:category", gettvsByCategory);

export default router;
