const axios = require("axios");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

const DEEPGRAM_API_KEY = "c5a5cd52618a93618aa90b567248c8273ce9f25d";
// const GEMINI_API_KEY = "AIzaSyB999sNdzeNU_nBAlyUjxkgFzTY8-jygSc";
// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 🔁 Deepgram Transcription Function
async function transcribeWithDeepgram(filePath) {
  const audioData = fs.readFileSync(filePath);
  const res = await axios.post(
    "https://api.deepgram.com/v1/listen",
    audioData,
    {
      headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
        "Content-Type": "audio/mp3",
      },
    }
  );

  return res.data.results.channels[0].alternatives[0].transcript;
}

exports.transcriptFromVideo = async (req, res) => {
  const videoUrl = req.body.videoUrl;
  console.log("backend url : ", videoUrl);

  const videoPath = path.join(__dirname, "temp_video.mp4");
  const audioPath = path.join(__dirname, "temp_audio.mp3");

  try {
    // 1️⃣ Download Video
    const videoResponse = await axios({
      url: videoUrl,
      method: "GET",
      responseType: "stream",
    });

    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(videoPath);
      videoResponse.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // 2️⃣ Extract Audio from Video
    await new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .noVideo()
        .audioCodec("libmp3lame")
        .save(audioPath)
        .on("end", resolve)
        .on("error", reject);
    });

    // 3️⃣ Transcribe using Deepgram
    const transcription = await transcribeWithDeepgram(audioPath);
    // console.log("trans:", transcription);

    // 🧹 Cleanup
    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }

    if (fs.existsSync(audioPath)) {
      fs.unlinkSync(audioPath);
    }

    // ✅ Return Result
    res.json({
      success: true,

      transcription,
    });
  } catch (error) {
    console.error("Transcription failed   :", error.message || error);
    res.status(500).json({ success: false, message: "Transcription failed" });
  }
};
