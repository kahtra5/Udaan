import { Lead } from "../models/index.js";

// Create a new lead
export const createLead = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      name: restaurantName,
      phoneNumber,
      address,
      callFrequency,
      email,
    } = req.body;
    const newLead = new Lead({
      restaurantName,
      phoneNumber,
      address,
      callFrequency,
      email,
    });

    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    next(error);
  }
};

// Get all leads
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leads", error });
  }
};
