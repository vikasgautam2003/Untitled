export function normalizeOutput(output) {
  if (output == null) return "";

  let out = output.replace(/\r\n/g, "\n").trim();

  try {
    const parsed = JSON.parse(out);
    out = JSON.stringify(parsed);
  } catch {
    out = out.replace(/\s+/g, " ").trim();
  }

  return out;
}
