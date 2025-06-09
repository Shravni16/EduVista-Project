// const axios = require("axios");
// const fs = require("fs");
// const ffmpeg = require("fluent-ffmpeg");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const WHISPER_API_KEY = "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";
// const GEMINI_API_KEY = "AIzaSyB999sNdzeNU_nBAlyUjxkgFzTY8-jygSc";
// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// // Main controller
// exports.summarizeFromVideo = async (req, res) => {
//   const videoUrl = req.body.videoUrl;
//   const videoPath = "temp_video.mp4";
//   const audioPath = "temp_audio.mp3";

//   try {
//     // 1️⃣ Download Video
//     const videoStream = await axios({
//       url: videoUrl,
//       method: "GET",
//       responseType: "stream",
//     });
//     const writer = fs.createWriteStream(videoPath);
//     videoStream.data.pipe(writer);
//     await new Promise((resolve) => writer.on("finish", resolve));

//     // 2️⃣ Extract Audio
//     await new Promise((resolve, reject) => {
//       ffmpeg(videoPath)
//         .noVideo()
//         .audioCodec("libmp3lame")
//         .save(audioPath)
//         .on("end", resolve)
//         .on("error", reject);
//     });

//     // 3️⃣ Transcribe using Whisper
//     const audioData = fs.readFileSync(audioPath);
//     const whisperResp = await axios.post(
//       "https://api.openai.com/v1/audio/transcriptions",
//       audioData,
//       {
//         headers: {
//           Authorization: `Bearer ${WHISPER_API_KEY}`,
//           "Content-Type": "audio/mp3",
//         },
//       }
//     );
//     const transcription = whisperResp.data.text;

//     // 4️⃣ Summarize using Gemini
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const prompt = `Summarize this educational lecture:\n\n${transcription}`;
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const summary = response.text();

//     // Cleanup
//     fs.unlinkSync(videoPath);
//     fs.unlinkSync(audioPath);

//     // ✅ Return Result
//     res.json({
//       success: true,
//       summary,
//       transcription,
//     });

//   } catch (error) {
//     console.error("Summarization failed:", error);
//     res.status(500).json({ success: false, message: "Summarization failed" });
//   }
// };
// const axios = require("axios");
// const fs = require("fs");
// const path = require("path");
// const ffmpeg = require("fluent-ffmpeg");
// const FormData = require("form-data");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const WHISPER_API_KEY = "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";
// const GEMINI_API_KEY = "AIzaSyB999sNdzeNU_nBAlyUjxkgFzTY8-jygSc";
// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// async function transcribeWithRetry(form, maxRetries = 3) {
//   let attempt = 0;
//   while (attempt < maxRetries) {
//     try {
//       const whisperResp = await axios.post(
//         "https://api.openai.com/v1/audio/transcriptions",
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${WHISPER_API_KEY}`,
//             ...form.getHeaders(),
//           },
//         }
//       );
//       return whisperResp.data.text;
//     } catch (err) {
//       if (err.response && err.response.status === 429) {
//         // If there's a Retry-After header, wait that long, else wait 2 seconds
//         const retryAfter = err.response.headers['retry-after'];
//         const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000;
//         console.log(`Rate limit hit, retrying after ${delay} ms`);
//         await new Promise(res => setTimeout(res, delay));
//         attempt++;
//       } else {
//         throw err; // Some other error, throw it
//       }
//     }
//   }
//   throw new Error('Max retries reached for transcription');
// }

// exports.summarizeFromVideo = async (req, res) => {
//   const videoUrl = req.body.videoUrl;
//   console.log("backend url",videoUrl);

//   const videoPath = path.join(__dirname, "temp_video.mp4");
//   const audioPath = path.join(__dirname, "temp_audio.mp3");

//   try {
//     // 1️⃣ Download Video
//     const videoResponse = await axios({
//       url: videoUrl,
//       method: "GET",
//       responseType: "stream",
//     });

//     // console.log("video 1 download : ",videoResponse)

//     await new Promise((resolve, reject) => {
//       const writer = fs.createWriteStream(videoPath);
//       videoResponse.data.pipe(writer);
//       writer.on("finish", resolve);
//       writer.on("error", reject);
//     });

//     // 2️⃣ Extract Audio from Video
//     await new Promise((resolve, reject) => {
//       ffmpeg(videoPath)
//         .noVideo()
//         .audioCodec("libmp3lame")
//         .save(audioPath)
//         .on("end", resolve)
//         .on("error", reject);
//     });
//     // console.log("audio path : 2 ", audioPath);

//     // 3️⃣ Transcribe Audio using OpenAI Whisper
//     const form = new FormData();
//     form.append("file", fs.createReadStream(audioPath));
//     form.append("model", "whisper-1");

//     // const whisperResp = await axios.post(
//     //   "https://api.openai.com/v1/audio/transcriptions",
//     //   form,
//     //   {
//     //     headers: {
//     //       Authorization: `Bearer ${WHISPER_API_KEY}`,
//     //       ...form.getHeaders(),
//     //     },
//     //   }
//     // );

// const transcription = await transcribeWithRetry(form);
//     // const transcription = whisperResp.data.text;
//     console.log("trans : ", transcription)

//     // 4️⃣ Summarize using Gemini API
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const prompt = `Summarize this educational lecture:\n\n${transcription}`;
//     const result = await model.generateContent(prompt);
//     const response = await result.response();
//     const summary = await response.text();

//     console.log("summary : ",summary);

//     // 🧹 Cleanup
//     fs.unlinkSync(videoPath);
//     fs.unlinkSync(audioPath);

//     // ✅ Return Result
//     res.json({
//       success: true,
//       summary,
//       transcription,
//     });

//   } catch (error) {
//     console.error("Summarization failed:", error.message || error);
//     res.status(500).json({ success: false, message: "Summarization failed" });
//   }
// };

const axios = require("axios");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const DEEPGRAM_API_KEY = "c5a5cd52618a93618aa90b567248c8273ce9f25d";
const GEMINI_API_KEY = "AIzaSyB999sNdzeNU_nBAlyUjxkgFzTY8-jygSc";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

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

exports.summarizeFromVideo = async (req, res) => {
  const videoUrl = req.body.videoUrl;
  console.log("backend url", videoUrl);

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

    // 4️⃣ Summarize using Gemini API
    // const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });
    // const prompt = `Summarize this educational lecture:\n\n${transcription}`;
    // const result = await model.generateContent(prompt);
    // const response = await result.response();
    // const summary = await response.text();

    // console.log("summary:", summary);
    // 4️⃣ Summarize using Gemini Flash API
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash-latest",
    });

    const prompt = `Summarize this educational lecture:\n\n${transcription}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    // console.log("summary:", summary);

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
      summary,
      transcription,
    });
  } catch (error) {
    console.error("Summarization failed:", error.message || error);
    res.status(500).json({ success: false, message: "Summarization failed" });
  }
};
