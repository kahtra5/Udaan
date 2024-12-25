import mongoose from "mongoose";

function isContacted() {
  return this.leadStatus !== "NEW";
}

const leadSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    leadStatus: {
      type: String,
      enum: ["NEW", "CONTACTED", "INTERESTED", "NOT INTERESTED", "CONVERTED"],
      default: "NEW",
    },
    callFrequency: {
      // number of days between calls
      type: Number,
      required: true,
    },
    // This is the relationship between the Lead and the POC
    pointOfContacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "POC",
        required: true,
      },
    ],
    interactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interaction",
      },
    ],
    lastCallDate: {
      type: Date,
      required: isContacted,
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
