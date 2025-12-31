import { streamComponent } from "../lib/ai/streamComponent.js";

export async function generateComponentStream(req, res) {


    const { prompt } = req.body;

    if (!prompt || prompt.length < 5) {
        return res.status(400).json({ message: "Prompt too short" });
    }


    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");


     try {
    await streamComponent({
      prompt,
      onChunk: chunk => {
        res.write(chunk);
      }
    });

    res.end();
    } catch (err) {
        console.error("WebDev stream error:", err);
        res.end();
    }
}