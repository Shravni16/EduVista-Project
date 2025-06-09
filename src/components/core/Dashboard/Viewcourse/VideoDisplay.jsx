// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";

// import { Player } from "video-react";
// import "video-react/dist/video-react.css";
// import { updateCourseProgress } from "../../../../services/operations/CourseAPI";
// import {
//   setCompletedLecture,
//   setCourseProgress,
// } from "../../../../slices/viewCourseSlice";
// import {
//   getVideoSummary,
//   getVideoTranscript,
// } from "../../../../services/operations/SummarizeAPI";
// import Chatbot from "./Chatbot";
// import "./summary.css";
// import Loader from "../../../common/Loader";

// function VideoDisplay() {
//   const location = useLocation();
//   const [endVideo, setEndVideo] = useState(false);
//   const { courseId, sectionId, subsectionId } = useParams();
//   const {
//     courseDetails,
//     courseProgress,
//     totalLectures,
//     completedLecture,
//     courseSections,
//   } = useSelector((state) => state.viewCourse);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const [src, setSrc] = useState("");
//   const playerRef = useRef();
//   let currSubsecIdx = 0,
//     currSecIdx = 0;
//   const [currsc, setCurrsc] = useState(0);
//   const navigate = useNavigate();
//   const [summary, setSummary] = useState(null);
//   const [trans, setTrans] = useState(null);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     let tp = courseDetails?.courseContent?.filter(
//       (sec) => sec._id == sectionId
//     )[0];
//     let tp2 = tp?.subSection?.filter((subsec) => subsec._id == subsectionId)[0];
//     // console.log("tp2",tp2);
//     currSubsecIdx = tp?.subSection?.findIndex((element) => {
//       return element._id === tp2._id;
//     });
//     currSecIdx = courseDetails?.courseContent?.findIndex((element) => {
//       return element._id === tp._id;
//     });
//     setCurrsc(currSecIdx);
//     // console.log("currsubsec currsec",currSecIdx ,currSubsecIdx)
//     setSrc(tp2?.videoURL);
//   });
//   useEffect(() => {
//     const fetchTranscript = async () => {
//       if (src) {
//         const res = await getVideoTranscript(src, token);
//         if (res?.data?.success) {
//           setTrans(res.data.transcription);
//         }
//       }
//     };
//     fetchTranscript();
//   }, [src, token]);
//   useEffect(() => {
//     setSummary(null);
//     setTrans(null);
//   }, [src]);

//   useEffect(() => {
//     setEndVideo(false);
//   }, [location.pathname]);

//   function markAsReadHandler() {
//     dispatch(
//       updateCourseProgress(
//         courseId,
//         subsectionId,
//         completedLecture,
//         totalLectures,
//         token
//       )
//     );
//   }
//   function nextHandler() {
//     if (
//       courseDetails?.courseContent[currSecIdx].subSection.length - 1 ==
//       currSubsecIdx
//     ) {
//       currSecIdx = currSecIdx + 1;
//       currSubsecIdx = 0;
//     } else {
//       currSubsecIdx = currSubsecIdx + 1;
//     }

//     navigate(
//       `/view-course/${courseDetails._id}/section/${courseDetails?.courseContent[currSecIdx]._id}/subsection/${courseDetails?.courseContent[currSecIdx].subSection[currSubsecIdx]._id}`
//     );
//   }
//   return (
//     <div className={`vd-wrap `}>
//       {endVideo && <div className="vd-blur-div"></div>}
//       <Player
//         ref={playerRef}
//         playsInline
//         poster="/assets/poster.png"
//         aspectRatio="16:9"
//         src={src}
//         onEnded={() => setEndVideo(true)}
//       />

//       {endVideo && (
//         <div>
//           {courseProgress?.completedVideos?.includes(subsectionId) ? (
//             courseDetails?.courseContent.length - 1 !== currsc && (
//               <button onClick={nextHandler} className="vc-btn next-mark-btn">
//                 {" "}
//                 Next{" "}
//               </button>
//             )
//           ) : (
//             <button
//               className="vc-btn next-mark-btn"
//               onClick={markAsReadHandler}
//             >
//               Mark as Read
//             </button>
//           )}

//           <button
//             onClick={() => {
//               playerRef?.current?.seek(0);
//               setEndVideo(false);
//             }}
//             className="vc-btn replay-btn"
//           >
//             Replay
//           </button>
//         </div>
//       )}

//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           alignItems: "flex-start",
//           marginTop: "50px",
//         }}
//       >
//         <div className="summary-container">
//           <button
//             onClick={async () => {
//               setLoading(true);
//               console.log("src :", src);
//               const videoUrl = src;
//               const response = await getVideoSummary(videoUrl, token);
//               if (response.data.success) {
//                 setSummary(response.data.summary);
//                 setTrans(response.data.transcription);
//                 setLoading(false);
//                 console.log("setted transc", response.data.transcription);
//               }
//             }}
//             className="summarize-button"
//           >
//             Summarize Lecture
//           </button>

//           {loading ? (
//             <div>Loading......</div>
//           ) : (
//             summary && <p className="summary-text">{summary}</p>
//           )}
//         </div>

//         {/* Chatbot Block */}
//         <div style={{ flex: "1" }}>
//           <Chatbot src={src} transcript={trans} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoDisplay;












// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";

// import { Player } from "video-react";
// import "video-react/dist/video-react.css";
// import { updateCourseProgress } from "../../../../services/operations/CourseAPI";
// import {
//   setCompletedLecture,
//   setCourseProgress,
// } from "../../../../slices/viewCourseSlice";
// import {
//   getVideoSummary,
//   getVideoTranscript,
// } from "../../../../services/operations/SummarizeAPI";
// import Chatbot from "./Chatbot";
// import "./summary.css";
// import Loader from "../../../common/Loader";

// function VideoDisplay() {
//   const location = useLocation();
//   const [endVideo, setEndVideo] = useState(false);
//   const { courseId, sectionId, subsectionId } = useParams();
//   const {
//     courseDetails,
//     courseProgress,
//     totalLectures,
//     completedLecture,
//     courseSections,
//   } = useSelector((state) => state.viewCourse);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const [src, setSrc] = useState("");
//   const playerRef = useRef();
//   let currSubsecIdx = 0,
//     currSecIdx = 0;
//   const [currsc, setCurrsc] = useState(0);
//   const navigate = useNavigate();
//   const [summary, setSummary] = useState(null);
//   const [trans, setTrans] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showLanguages, setShowLanguages] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("");

//   useEffect(() => {
//     let tp = courseDetails?.courseContent?.filter(
//       (sec) => sec._id == sectionId
//     )[0];
//     let tp2 = tp?.subSection?.filter((subsec) => subsec._id == subsectionId)[0];

//     currSubsecIdx = tp?.subSection?.findIndex((element) => {
//       return element._id === tp2._id;
//     });
//     currSecIdx = courseDetails?.courseContent?.findIndex((element) => {
//       return element._id === tp._id;
//     });
//     setCurrsc(currSecIdx);
//     setSrc(tp2?.videoURL);
//   });

//   useEffect(() => {
//     const fetchTranscript = async () => {
//       if (src) {
//         const res = await getVideoTranscript(src, token);
//         if (res?.data?.success) {
//           setTrans(res.data.transcription);
//         }
//       }
//     };
//     fetchTranscript();
//   }, [src, token]);

//   useEffect(() => {
//     setSummary(null);
//     setTrans(null);
//   }, [src]);

//   useEffect(() => {
//     setEndVideo(false);
//   }, [location.pathname]);

//   function markAsReadHandler() {
//     dispatch(
//       updateCourseProgress(
//         courseId,
//         subsectionId,
//         completedLecture,
//         totalLectures,
//         token
//       )
//     );
//   }

//   function nextHandler() {
//     if (
//       courseDetails?.courseContent[currSecIdx].subSection.length - 1 ==
//       currSubsecIdx
//     ) {
//       currSecIdx = currSecIdx + 1;
//       currSubsecIdx = 0;
//     } else {
//       currSubsecIdx = currSubsecIdx + 1;
//     }

//     navigate(
//       `/view-course/${courseDetails._id}/section/${courseDetails?.courseContent[currSecIdx]._id}/subsection/${courseDetails?.courseContent[currSecIdx].subSection[currSubsecIdx]._id}`
//     );
//   }

//   const handleSummarize = async (lang) => {
//     setSelectedLanguage(lang);
//     setLoading(true);
//     try {
//       const response = await getVideoSummary(src, token, lang); // assumes API accepts lang
//       if (response.data.success) {
//         setSummary(response.data.summary);
//         setTrans(response.data.transcription);
//       }
//     } catch (error) {
//       console.error("Summarization error:", error);
//     } finally {
//       setLoading(false);
//       setShowLanguages(false);
//     }
//   };

//   return (
//     <div className={`vd-wrap `}>
//       {endVideo && <div className="vd-blur-div"></div>}
//       <Player
//         ref={playerRef}
//         playsInline
//         poster="/assets/poster.png"
//         aspectRatio="16:9"
//         src={src}
//         onEnded={() => setEndVideo(true)}
//       />

//       {endVideo && (
//         <div>
//           {courseProgress?.completedVideos?.includes(subsectionId) ? (
//             courseDetails?.courseContent.length - 1 !== currsc && (
//               <button onClick={nextHandler} className="vc-btn next-mark-btn">
//                 Next
//               </button>
//             )
//           ) : (
//             <button
//               className="vc-btn next-mark-btn"
//               onClick={markAsReadHandler}
//             >
//               Mark as Read
//             </button>
//           )}

//           <button
//             onClick={() => {
//               playerRef?.current?.seek(0);
//               setEndVideo(false);
//             }}
//             className="vc-btn replay-btn"
//           >
//             Replay
//           </button>
//         </div>
//       )}

//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           alignItems: "flex-start",
//           marginTop: "50px",
//         }}
//       >
//         <div className="summary-container">
//           <button
//             onClick={() => setShowLanguages(!showLanguages)}
//             className="summarize-button"
//           >
//             Summarize Lecture
//           </button>

//           {showLanguages && (
//             <div className="language-select-box">
//               <p>Select Language:</p>
//               {["English", "Hindi", "Marathi", "Sanskrit"].map((lang) => (
//                 <button
//                   key={lang}
//                   onClick={() => handleSummarize(lang)}
//                   className="language-option"
//                 >
//                   {lang}
//                 </button>
//               ))}
//             </div>
//           )}

//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             summary && (
//               <div>
//                 <p className="summary-text">
//                   <strong>{selectedLanguage} Summary:</strong>
//                 </p>
//                 <p className="summary-text">{summary}</p>
//               </div>
//             )
//           )}
//         </div>

//         {/* Chatbot Block */}
//         <div style={{ flex: "1" }}>
//           <Chatbot src={src} transcript={trans} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoDisplay;







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
import InterviewPrep from "./InterviewPrep";
import "./summary.css";

function VideoDisplay() {
  const location = useLocation();
  const { courseId, sectionId, subsectionId } = useParams();
  const {
    courseDetails,
    courseProgress,
    totalLectures,
    completedLecture,
  } = useSelector((state) => state.viewCourse);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [src, setSrc] = useState("");
  const [endVideo, setEndVideo] = useState(false);
  const [summary, setSummary] = useState(null);
  const [trans, setTrans] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const playerRef = useRef();

  // Update video URL based on section/subsection
  useEffect(() => {
    const section = courseDetails?.courseContent?.find(sec => sec._id === sectionId);
    const subsec = section?.subSection?.find(sub => sub._id === subsectionId);
    setSrc(subsec?.videoURL);
  }, [sectionId, subsectionId, courseDetails]);

  // Reset summary & transcript when video changes
  useEffect(() => {
    setSummary(null);
    setTrans(null);
    setEndVideo(false);
  }, [src, location.pathname]);

  // Fetch transcript
  useEffect(() => {
    const fetchTranscript = async () => {
      if (!src || !token) return;
      const res = await getVideoTranscript(src, token);
      if (res?.data?.success) {
        setTrans(res.data.transcription);
      }
    };
    fetchTranscript();
  }, [src, token]);

  const handleSummarize = async (lang) => {
    setSelectedLanguage(lang);
    setLoading(true);
    try {
      const res = await getVideoSummary(src, token, lang.toLowerCase());
      if (res?.data?.success) {
        setSummary(res.data.summary);
        setTrans(res.data.transcription);
        console.log("Transcript",res.data.transcription)
      }
    } catch (err) {
      console.error("Error summarizing:", err);
    } finally {
      setLoading(false);
      setShowLanguages(false);
    }
  };

  const markAsReadHandler = () => {
    dispatch(
      updateCourseProgress(
        courseId,
        subsectionId,
        completedLecture,
        totalLectures,
        token
      )
    );
  };

  const nextHandler = () => {
    const sectionIdx = courseDetails?.courseContent?.findIndex(
      (sec) => sec._id === sectionId
    );
    const subsecIdx = courseDetails?.courseContent[sectionIdx]?.subSection?.findIndex(
      (sub) => sub._id === subsectionId
    );

    let nextSectionIdx = sectionIdx;
    let nextSubsecIdx = subsecIdx + 1;

    if (
      nextSubsecIdx >=
      courseDetails?.courseContent[sectionIdx]?.subSection.length
    ) {
      nextSectionIdx++;
      nextSubsecIdx = 0;
    }

    if (
      nextSectionIdx < courseDetails?.courseContent.length &&
      nextSubsecIdx <
        courseDetails?.courseContent[nextSectionIdx]?.subSection.length
    ) {
      const nextSectionId = courseDetails?.courseContent[nextSectionIdx]._id;
      const nextSubsectionId =
        courseDetails?.courseContent[nextSectionIdx].subSection[nextSubsecIdx]
          ._id;

      navigate(
        `/view-course/${courseDetails._id}/section/${nextSectionId}/subsection/${nextSubsectionId}`
      );
    }
  };

  return (
    <div className="vd-wrap">
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
            <button onClick={nextHandler} className="vc-btn next-mark-btn">
              Next
            </button>
          ) : (
            <button
              onClick={markAsReadHandler}
              className="vc-btn next-mark-btn"
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
        {/* Summary Panel */}
        <div className="summary-container">
          <button
            onClick={() => setShowLanguages(!showLanguages)}
            className="summarize-button"
          >
            Summarize Lecture
          </button>

          {showLanguages && (
  <div className="language-select-box">
    <p>Select Language:</p>
    {["English", "Hindi", "Marathi", "Sanskrit"].map((lang) => (
      <button
        key={lang}
        onClick={() => handleSummarize(lang)}
        className={`language-option ${
          selectedLanguage === lang && loading ? "active-language" : ""
        }`}
        disabled={loading && selectedLanguage !== lang}
      >
        {lang}
      </button>
    ))}
  </div>
)}


          {loading ? (
            <p>Loading summary...</p>
          ) : summary ? (
            <div>
              <p className="summary-text">
                <strong>{selectedLanguage} Summary:</strong>
              </p>
              <p className="summary-text">{summary}</p>
            </div>
          ) : null}
        </div>

        {/* Chatbot Panel */}
        <div style={{ flex: 1 }}>
          <Chatbot src={src} transcript={trans} />
        </div>
      </div>
      <div>
        <h2 style={{ textAlign: "center", marginTop: "5rem", marginBottom: "2rem" }}>
  Interview Questions & Answers
</h2>
        {
          trans ?<InterviewPrep trans={trans} token={token}/>: <div
      style={{
        maxWidth: "600px",
        margin: "5rem auto",
        padding: "1.5rem",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(2px)",
        color: "#f0f0f0",
        textAlign: "center",
        fontSize: "1.2rem",
      }}
    >
      Content will be loaded soon...
    </div>
        }
      </div>
    </div>
  );
}

export default VideoDisplay;
