import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
})

/**
 * @description Generate new interview report on the basis of user selfdescription,resume pdf and job description
 */

export const generateInterviewReport=async({resumeFile,selfDescription,jobDescription})=>{
    const formData=new FormData();
    formData.append("resume",resumeFile);
    formData.append("selfDescription",selfDescription);
    formData.append("jobDescription",jobDescription);

    const response=await api.post("/api/interview/generate",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    });
    return response.data;
}

/**
 * @description Get interview report by interviewId
 */

export const getInterviewReportById=async(interviewId)=>{
    const response=await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
}

/**
 * @description Get all interview reports for the logged-in user
 */

export const getAllInterviewReports=async()=>{
    const response=await api.get("/api/interview/");
    return response.data;
}