const express = require("express");
const router = express.Router();
const { summarizeFromVideo } = require("../controllers/SummarizerController");
const {transcriptFromVideo}=require("../controllers/Transcript")

router.post("/summarize", summarizeFromVideo);
router.post("/transcribe", transcriptFromVideo) 

module.exports = router;
