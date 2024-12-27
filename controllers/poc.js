import {Poc, Lead} from "../models/index.js";


//create new poc

export const createPoc = async (req, res, next) => {
    try {
      console.log(req.body);
      const {
        restaurantId,
        name,
        role,
        phone,
        email,
      } = req.body;

      const newPoc = new Poc({
        restaurantId,
        name,
        role,
        phone,
        email,
      });
  
      const savedPoc = await newPoc.save();
      const lead = await Lead.updateOne({_id: restaurantId}, {$push: {pointOfContacts: savedPoc._id}});
      res.status(201).json(savedPoc);
    } catch (error) {
      next(error);
    }
  };