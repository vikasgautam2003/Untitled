import Submission from "../models/submission.model.js";
import Problem from "../models/problem.model.js";


export const getProgressSummary = async (req, res) => {
  try{

    const userId = req.user.id;

    const solvedProblemIds = await Submission.distinct("problemId", { userId });

    const solvedProblems = await Problem.find({
      _id: { $in: solvedProblemIds }

    }).select("topic");

    const byTopicMap = {};

    solvedProblems.forEach(problem => {
      if (!byTopicMap[problem.topic]) {
        byTopicMap[problem.topic] = 0;
      }
      byTopicMap[problem.topic]++;
    });


    const byTopic = Object.entries(byTopicMap).map(
      ([topic, solved]) => ({
        topic,
        solved
      })
    );


    res.json({
      totalSolved: solvedProblemIds.length,
      totalProblems: await Problem.countDocuments(),
      byTopic
    });

  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch progress summary" });
    }
}