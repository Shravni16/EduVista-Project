import { summarizerEndpoints } from "../apis";
import {apiConnector} from "../apiconnector"
import { setLoading } from "../../slices/courseSlice";
import toast from "react-hot-toast";
const {GET_SUMMARY,GET_TRANSCRIPT} = summarizerEndpoints;

export async function getVideoSummary(videoUrl, token){
    // return async (dispatch) => {
    //     dispatch(setLoading(true));
        try{
            console.log("Inside frrontend summay");
            const response = await apiConnector("POST",GET_SUMMARY,{videoUrl},{
                Authorization: `Bearer ${token}`,
            } );
            if (!response.data.success) {
                throw new Error(response.data.message);
              }
                // dispatch(setLoading(false));
              toast.success("Summarized sucessfully !");
            //   localStorage.setItem("videoSummary",response.data.summary);
            //   localStorage.setItem("videoTranscript",response.data.transcription);

              console.log("responseeeeeeeeeeeee");
              return response;
        }
        catch(error){
            // dispatch(setLoading(false));
            console.log(error);
            toast.error("error while calling backend api");
        }
    // }
}


export async function getVideoTranscript(videoUrl, token){
    // return async (dispatch) => {
    //     dispatch(setLoading(true));
        try{
            console.log("Inside frrontend trans");
            const response = await apiConnector("POST",GET_TRANSCRIPT,{videoUrl},{
                Authorization: `Bearer ${token}`,
            } );
            if (!response.data.success) {
                throw new Error(response.data.message);
              }
              
              console.log("responseeeeeeeeeeeee", response);
              return response;
        }
        catch(error){
            // dispatch(setLoading(false));
            console.log(error);
            // toast.error("error while calling backend api");
        }
    // }
}
