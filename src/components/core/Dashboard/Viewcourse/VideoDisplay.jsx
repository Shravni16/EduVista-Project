import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { updateCourseProgress } from "../../../../services/operations/CourseAPI";
import {
  setCompletedLecture,
  setCourseProgress,
} from "../../../../slices/viewCourseSlice";
import {
  getVideoSummary,
  getVideoTranscript,
} from "../../../../services/operations/SummarizeAPI";
import Chatbot from "./Chatbot";
import "./summary.css";
import Loader from "../../../common/Loader";

function VideoDisplay() {
  const location = useLocation();
  const [endVideo, setEndVideo] = useState(false);
  const { courseId, sectionId, subsectionId } = useParams();
  const {
    courseDetails,
    courseProgress,
    totalLectures,
    completedLecture,
    courseSections,
  } = useSelector((state) => state.viewCourse);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [src, setSrc] = useState("");
  const playerRef = useRef();
  let currSubsecIdx = 0,
    currSecIdx = 0;
  const [currsc, setCurrsc] = useState(0);
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [trans, setTrans] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let tp = courseDetails?.courseContent?.filter(
      (sec) => sec._id == sectionId
    )[0];
    let tp2 = tp?.subSection?.filter((subsec) => subsec._id == subsectionId)[0];
    // console.log("tp2",tp2);
    currSubsecIdx = tp?.subSection?.findIndex((element) => {
      return element._id === tp2._id;
    });
    currSecIdx = courseDetails?.courseContent?.findIndex((element) => {
      return element._id === tp._id;
    });
    setCurrsc(currSecIdx);
    // console.log("currsubsec currsec",currSecIdx ,currSubsecIdx)
    setSrc(tp2?.videoURL);
  });
  useEffect(() => {
    const fetchTranscript = async () => {
      if (src) {
        const res = await getVideoTranscript(src, token);
        if (res?.data?.success) {
          setTrans(res.data.transcription);
        }
      }
    };
    fetchTranscript();
  }, [src, token]);
  useEffect(() => {
    setSummary(null);
    setTrans(null);
  }, [src]);

  useEffect(() => {
    setEndVideo(false);
  }, [location.pathname]);

  function markAsReadHandler() {
    dispatch(
      updateCourseProgress(
        courseId,
        subsectionId,
        completedLecture,
        totalLectures,
        token
      )
    );
  }
  function nextHandler() {
    if (
      courseDetails?.courseContent[currSecIdx].subSection.length - 1 ==
      currSubsecIdx
    ) {
      currSecIdx = currSecIdx + 1;
      currSubsecIdx = 0;
    } else {
      currSubsecIdx = currSubsecIdx + 1;
    }

    navigate(
      `/view-course/${courseDetails._id}/section/${courseDetails?.courseContent[currSecIdx]._id}/subsection/${courseDetails?.courseContent[currSecIdx].subSection[currSubsecIdx]._id}`
    );
  }
  return (
    <div className={`vd-wrap `}>
      {endVideo && <div className="vd-blur-div"></div>}
      <Player
        ref={playerRef}
        playsInline
        poster="/assets/poster.png"
        aspectRatio="16:9"
        src={src}
        onEnded={() => setEndVideo(true)}
      />

      {endVideo && (
        <div>
          {courseProgress?.completedVideos?.includes(subsectionId) ? (
            courseDetails?.courseContent.length - 1 !== currsc && (
              <button onClick={nextHandler} className="vc-btn next-mark-btn">
                {" "}
                Next{" "}
              </button>
            )
          ) : (
            <button
              className="vc-btn next-mark-btn"
              onClick={markAsReadHandler}
            >
              Mark as Read
            </button>
          )}

          <button
            onClick={() => {
              playerRef?.current?.seek(0);
              setEndVideo(false);
            }}
            className="vc-btn replay-btn"
          >
            Replay
          </button>
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
          marginTop: "50px",
        }}
      >
        <div className="summary-container">
          <button
            onClick={async () => {
              setLoading(true);
              console.log("src :", src);
              const videoUrl = src;
              const response = await getVideoSummary(videoUrl, token);
              if (response.data.success) {
                setSummary(response.data.summary);
                setTrans(response.data.transcription);
                setLoading(false);
                console.log("setted transc", response.data.transcription);
              }
            }}
            className="summarize-button"
          >
            Summarize Lecture
          </button>

          {loading ? (
            <div>Loading......</div>
          ) : (
            summary && <p className="summary-text">{summary}</p>
          )}
        </div>

        {/* Chatbot Block */}
        <div style={{ flex: "1" }}>
          <Chatbot src={src} transcript={trans} />
        </div>
      </div>
    </div>
  );
}

export default VideoDisplay;
