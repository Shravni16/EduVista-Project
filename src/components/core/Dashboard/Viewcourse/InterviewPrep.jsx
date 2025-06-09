// import { useEffect, useState } from "react";
// import {
//  getInterviewQuestions
// } from "../../../../services/operations/SummarizeAPI";

// function InterviewPrep(trans,token){
//     const [qna,setQna]=useState("");
//     useEffect(async ()=>{
//          try {
//               const res = await getInterviewQuestions( token, trans);
//               if (res?.data?.success) {
//                 setQna(res.data.summary);
                
//               }
//             } catch (err) {
//               console.error("Error summarizing:", err);
//             } 

//     })
//     return(<div>
//         {qna}

//     </div> );
// }
// export default InterviewPrep;




// import { useEffect, useState } from "react";
// import { getInterviewQuestions } from "../../../../services/operations/SummarizeAPI";

// function InterviewPrep({ trans, token }) {
//   const [qna, setQna] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchQuestions() {
//         console.log("in useeffect")
//       try {
//         const res = await getInterviewQuestions(token, trans);
//         if (res?.data?.success) {
//           setQna(res.data.resu);
//         }
//       } catch (err) {
//         console.error("Error summarizing:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchQuestions();
//   }, [token, trans]);  // dependency array to avoid infinite loop

//   if (loading) {
//     return <div>Content will be loaded soon...</div>;
//   }

//   return <div>{qna}</div>;
// }

// export default InterviewPrep;







// import { useEffect, useState } from "react";
// import { getInterviewQuestions } from "../../../../services/operations/SummarizeAPI";

// function InterviewPrep({ trans, token }) {
//   const [qnaList, setQnaList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchQuestions() {
//       try {
//         const res = await getInterviewQuestions(token, trans);
//         if (res?.data?.success) {
//           const rawText = res.data.resu;
//           const parsedQnA = parseQnA(rawText);
//           setQnaList(parsedQnA);
//         }
//       } catch (err) {
//         console.error("Error summarizing:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchQuestions();
//   }, [token, trans]);

//   function parseQnA(text) {
//     const regex = /\*\*Q:\s*(.*?)\*\*\s*\*\*A:\*\s*(.*?)(?=(\*\*Q:|\s*$))/gs;
//     const results = [];
//     let match;
//     while ((match = regex.exec(text)) !== null) {
//       results.push({
//         question: match[1].trim(),
//         answer: match[2].trim(),
//       });
//     }
//     return results;
//   }

//   if (loading) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center", fontSize: "1.2rem" }}>
//         Content will be loaded soon...
//       </div>
//     );
//   }

//   if (!qnaList.length) {
//     return (
//       <div style={{ padding: "2rem", textAlign: "center", fontSize: "1.2rem" }}>
//         No interview questions found.
//       </div>
//     );
//   }

//   return (
//     <section
//       style={{
//         padding: "2rem",
//         maxWidth: "900px",
//         margin: "auto",
//         fontFamily: "Arial, sans-serif",
//         backgroundColor: "transparent", // transparent container background
//         color: "#f0f0f0",
//       }}
//     >
//       <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
//         Interview Questions & Answers
//       </h2>
//       {qnaList.map((item, idx) => (
//         <div
//           key={idx}
//             style={{
//             backgroundColor: "rgba(255, 255, 255, 0.05)", // transparent block
//             padding: "1.5rem",
//             borderRadius: "10px",
//             border: "1px solid rgba(255, 255, 255, 0.2)", // subtle white border
//             marginBottom: "1.5rem",
//             backdropFilter: "blur(4px)", // nice blur effect behind block
//             boxShadow: "0 4px 10px rgba(255, 255, 255, 0.05)",
//             color: "#f0f0f0",
//           }}
//         >
//           <p style={{ fontWeight: "bold", marginBottom: "0.75rem" }}>
//             Q{idx + 1}: {item.question}
//           </p>
//           <p style={{ color: "#333", lineHeight: "1.6" }}>
//             <strong>Ans:</strong> {item.answer}
//           </p>
//         </div>
//       ))}
//     </section>
//   );
// }

// export default InterviewPrep;


import { useEffect, useState } from "react";
import { getInterviewQuestions } from "../../../../services/operations/SummarizeAPI";

function InterviewPrep({ trans, token }) {
  const [qnaList, setQnaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await getInterviewQuestions(token, trans);
        if (res?.data?.success) {
          const rawText = res.data.resu;
          console.log("dattta",rawText)
          const parsedQnA = parseQnA(rawText);
          setQnaList(parsedQnA);

        }
      } catch (err) {
        console.error("Error summarizing:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [token, trans]);

  function parseQnA(text) {
    const regex = /\*\*Q:\s*(.*?)\*\*\s*\*\*A:\*\s*(.*?)(?=(\*\*Q:|\s*$))/gs;
    const results = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      results.push({
        question: match[1].trim(),
        answer: match[2].trim(),
      });
    }
    return results;
  }

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", fontSize: "1.2rem" }}>
        Content will be loaded soon...
      </div>
    );
  }

  if (!qnaList.length) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", fontSize: "1.2rem" }}>
        No interview questions found.
      </div>
    );
  }

  return (
    <section
     style={{
        padding: "2rem",
        maxWidth: "900px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "transparent", // transparent container background
        color: "#f0f0f0",
      }}
    >
   
      {qnaList.map((item, idx) => (
        <div
          key={idx}
           style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)", // transparent block
            padding: "1.5rem",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.2)", // subtle white border
            marginBottom: "1.5rem",
            backdropFilter: "blur(4px)", // nice blur effect behind block
            boxShadow: "0 4px 10px rgba(255, 255, 255, 0.05)",
            color: "#f0f0f0",
          }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0.75rem" }}>
            Q{idx + 1}: {item.question}
          </p>
          <p style={{  lineHeight: "1.6" }}>
            <strong>Ans:</strong> {item.answer}
          </p>
        </div>
      ))}
    </section>
  );
}

export default InterviewPrep;
