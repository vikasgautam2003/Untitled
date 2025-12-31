export function validateOptimalSolutionSchema(o) {
  if (
    !o ||
    !o.approach ||
    !o.approach.title ||
    !Array.isArray(o.approach.strategy) ||
    !Array.isArray(o.algorithm) ||
    !o.complexity ||
    !o.referenceImplementation
  ) {
    throw new Error("Invalid optimal solution schema");
  }
}
