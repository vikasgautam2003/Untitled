import mongoose from "mongoose"

const submissionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true,
            index: true
        },
        
        language: {
            type: String, 
            enum: ["cpp", "java", "python"],
            required: true
        },

        code: {
            type: String,
            required: true
        },

        verdict: {
            type: String,
            enum: ["Pending"],
            default: "Pending"
        }
    }, {
    timestamps: { createdAt: true, updatedAt: false }
  }
)



export default mongoose.model("Submission", submissionSchema);