import { Lead, Kam, Poc} from "../models/index.js";
import mongoose from "mongoose";

// Create a new lead
export const createLead = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      name: restaurantName,
      phoneNumber,
      address,
      callFrequency,
      email
    } = req.body;
    let KamId=res.locals.userId;
    const newLead = new Lead({
      restaurantName,
      phoneNumber,
      address,
      callFrequency,
      email,
      KamId
    });

    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    next(error);
  }
};



// Get all leads with details of associated POCs
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate('pointOfContacts');  // Assuming 'pointOfContacts' is the field in Lead schema that references POCs
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leads", error });
  }
};






// Get leads to be called today for a specific KAM
export const getLeadsToBeCalledToday = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to the start of the day
  console.log(today);
  const kamId = res.locals.userId;

  try {
    const leads = await Lead.aggregate([
      {
        $match: {
          KamId: new mongoose.Types.ObjectId(kamId), // Ensure this matches leads associated with the specific KAM
        }
      },
      {
        $addFields: {
          nextCallDate: {
            $add: ["$lastContactedDate", { $multiply: ["$callFrequency", 1000 * 60 * 60 * 24] }]  // Adds the callFrequency in milliseconds
          }
        }
      },
      {
        $match: {
          $or: [
            {
              nextCallDate: today, // Compare nextCallDate to today's date
              leadStatus: "CONTACTED" // Assuming you only want leads that have been previously contacted
            },
            {
              leadStatus: "NEW" // Leads with a status of "NEW"
            }
          ]
        }}
    ]);

    res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads to be called today:', error);
    res.status(500).json({ message: "Failed to fetch leads to be called today", error: error.message });
  }
};
