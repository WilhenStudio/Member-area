export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: { message: "Method not allowed" } });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: { message: "GEMINI_API_KEY belum dipasang di Vercel." } });

  try {
    const { prompt, aspectRatio = "9:16" } = req.body || {};
    if (!prompt) return res.status(400).json({ error: { message: "Prompt kosong." } });

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-image:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ["IMAGE"],
            responseFormat: {
              image: { aspectRatio }
            }
          }
        })
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: { message: error.message || "Server error" } });
  }
}
