
import { Router } from "express";
import { createRequest, getRequests, updateRequestStatus, deleteRequest } from "../controllers/allowanceController.js";

const router = Router();
// Create
router.post('/', createRequest);
// Read
router.get('/', getRequests);
// Update status
router.patch('/:id', updateRequestStatus);
// Delete
router.delete('/:id', deleteRequest);

export default router;

