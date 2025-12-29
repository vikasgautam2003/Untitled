import mongoose from "mongoose";

const hintUsageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      index: true,
      required: true,
    },

    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


hintUsageSchema.index(
  { userId: 1, problemId: 1 },
  { unique: true }
);

export default mongoose.model("HintUsage", hintUsageSchema);
