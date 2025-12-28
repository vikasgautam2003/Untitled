import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },


    topic: {
      type: String,
      enum: [
        "ARRAYS",
        "STRINGS",
        "LINKED_LIST",
        "STACK",
        "QUEUE",
        "TREE",
        "GRAPH",
        "DP",
        "GREEDY",
        "BACKTRACKING"
      ],
      required: true,
      uppercase: true,
      trim: true
    },

    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      required: true
    },

    tags: {
      type: [String],
      default: []
    },

  
    description: {
      type: String,
      required: true
    },

    examples: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String }
      }
    ],

    constraints: {
      type: [String],
      default: []
    },

    starterCode: {
      cpp: { type: String, default: "" },
      java: { type: String, default: "" },
      python: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Problem", ProblemSchema);
