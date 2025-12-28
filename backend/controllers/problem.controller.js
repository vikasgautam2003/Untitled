export const getTopicSummary = async (req, res) => {
  const topics = await Problem.aggregate([
    {
      $group: {
        _id: "$topic",
        totalProblems: { $sum: 1 }
      }
    },
    {
      $project: {
        topic: "$_id",
        totalProblems: 1,
        completedProblems: { $literal: 0 } 
      }
    }
  ]);

  res.json(topics);
};






export const getProblemsByTopic = async (req, res) => {
  const { topic } = req.params;

  const problems = await Problem.find({ topic }).select(
    "title slug difficulty tags"
  );

  res.json(problems);
};







