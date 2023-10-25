import express from "express"
import { createListing, deleteListing, updateListing, getListing, getLisitngs } from "../controllers/listing.controller.js";
import { authorization, verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get('/get', getLisitngs);
router.post("/create", verifyToken, authorization(), createListing);
router.delete("/delete/:id", verifyToken, authorization(), deleteListing);
router.put('/update/:id', verifyToken, authorization(), updateListing);
router.get('/:id', getListing);

export default router;