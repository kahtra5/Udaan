import express from "express";
import { lead } from "../controllers/index.js";

const router = express.Router();

// Lead routes
router.post("/leads", lead.createLead);
router.get("/leads", lead.getAllLeads);
// router.get("/leads/:id", leadController.getLeadById);
// router.patch("/leads/:id", leadController.updateLead);
// router.delete("/leads/:id", leadController.deleteLead);
// router.get("/leads/todays-calls", leadController.getLeadsForToday);

export default router;
