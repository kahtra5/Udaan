import express from "express";
import { lead, poc, interaction,kam} from "../controllers/index.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

// Lead routes
router.post("/leads",authenticateToken,lead.createLead);
router.get("/leads" , authenticateToken, lead.getAllLeads);
router.post('/poc',authenticateToken, poc.createPoc);
router.post('/interaction',authenticateToken, interaction.createInteraction);
router.get('/leads/today', authenticateToken, lead.getLeadsToBeCalledToday);
router.post('/kam', kam.signup);
router.post('/login', kam.login);

// router.get("/leads/:id", leadController.getLeadById);
// router.patch("/leads/:id", leadController.updateLead);
// router.delete("/leads/:id", leadController.deleteLead);
// router.get("/leads/todays-calls", leadController.getLeadsForToday);

export default router;
