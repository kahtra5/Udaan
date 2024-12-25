import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    contactedPOC: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "POC",
      required: true,
    },
    type: {
      type: String,
      enum: ["call", "email", "visit"],
      required: true,
    },
    details: {
      type: String,
      default: "",
    },
    interactionDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Interaction", interactionSchema);
