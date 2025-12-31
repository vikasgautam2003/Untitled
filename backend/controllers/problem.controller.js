import Problem from "../models/problem.model.js";

export const createProblem = async (req, res) => {
  try {
    const data = req.body;

    if (
      !data.title ||
      !data.slug ||
      !data.topic ||
      !data.difficulty ||
      !data.description ||
      !data.testCases
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await Problem.findOne({ slug: data.slug });
    if (exists) {
      return res.status(409).json({ message: "Problem slug already exists" });
    }

    const problem = await Problem.create(data);
    res.status(201).json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create problem failed" });
  }
};








export const listProblems = async (_, res) => {
  const problems = await Problem.find().select(
    "title slug difficulty tags topic"
  );
  res.json(problems);
};

export const getProblemBySlug = async (req, res) => {
  const problem = await Problem.findOne({ slug: req.params.slug });
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  res.json(problem);
};

export const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteProblem = async (req, res) => {
  const problem = await Problem.findByIdAndDelete(req.params.id);

  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }

  res.json({ message: "Problem deleted successfully" });
};

export const getProblemsByTopic = async (req, res) => {
  const problems = await Problem.find({ topic: req.params.topic }).select(
    "title slug difficulty tags"
  );
  res.json(problems);
};

export const getTopicSummary = async (_, res) => {
  const summary = await Problem.aggregate([
    {
      $group: {
        _id: "$topic",
        totalProblems: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        topic: "$_id",
        totalProblems: 1,
        completedProblems: { $literal: 0 }
      }
    }
  ]);

  res.json(summary);
};
