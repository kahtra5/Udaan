import {Interaction, Poc, Lead} from "../models/index.js";

// create new interaction
export const createInteraction = async (req, res, next) => {
    try {
        console.log(req.body);
        const {
            restaurantId,
            contactedPOCId,
            interactionDate,
            interactionType,
            details,
            newStatus,  // Expecting a new status to be sent in the request body
        } = req.body;

        const newInteraction = new Interaction({
            restaurantId,
            contactedPOCId,
            interactionDate,
            interactionType,
            details,
        });

        // Save the new interaction to the database
        const savedInteraction = await newInteraction.save();

        // Update the Point of Contact with the new interaction ID
        const poc = await Poc.updateOne(
            { _id: contactedPOCId },
            { $push: { interactions: savedInteraction._id } }
        );

        // Update the Lead with the new interaction ID, new lastContactedDate, and possibly new leadStatus
        const leadUpdateData = {
            $push: { interactions: savedInteraction._id },
            $set: { lastContactedDate: interactionDate }
        };

        // Conditionally add the leadStatus to the update if newStatus is provided
        if (newStatus) {
            leadUpdateData.$set.leadStatus = newStatus;
        }

        const lead = await Lead.updateOne(
            { _id: restaurantId },
            leadUpdateData
        );

        res.status(201).json(savedInteraction);
    } catch (error) {
        console.error('Error creating interaction:', error);
        next(error);
    }
}

