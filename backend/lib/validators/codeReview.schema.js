export function validateCodeReviewSchema(o) {
  if (
    !o.summary ||
    !Array.isArray(o.controlFlow) ||
    !Array.isArray(o.lineByLine) ||
    !Array.isArray(o.dryRun) ||
    !o.complexity ||
    !Array.isArray(o.edgeCases) ||
    !Array.isArray(o.reviewNotes)
  ) {
    throw new Error("Invalid code review schema");
  }
}
