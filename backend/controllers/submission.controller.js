import Submission from "../models/submission.model.js";
import Problem from "../models/problem.model.js";




export const createSubmission = async (req, res) => {

    try{

        const { problemSlug, language, code } = req.body;

        if(!problemSlug || !language || !code)
        {
            return res.status(400).json({ message: "All fields required" });
        }


        const problem = await Problem.findOne({ slug: problemSlug });

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }


        const submission = await Submission.create({
            userId: req.user.id,
            problemId: problem._id,
            language,
            code
        });


        res.status(201).json(submission);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create submission" });
    }
}



export const getMySubmissions = async (req, res) => {

    try{
        const submissions = await Submission.find({
            userId: req.user.id
        })
        .populate("problemId", "title slug")
        .sort({ createdAt: -1 })
        
         res.json(submissions);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch submissions" });
    }
}



export const getMySubmissionsByProblem = async (req, res) => {

    try{

        const { problemId } = req.params;

        const submissions = await Submission.find({
            userId: req.user.id,
            problemId
        }).sort({ createdAt: -1 });

        res.json(submissions);
    }  catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch problem submissions" });
    }
}