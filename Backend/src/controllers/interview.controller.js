const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description Generate new interview report on the basis of user selfdescription,resume pdf and job description
 * @access Private
 */
async function generateInterviewReportController(req, res) {
    const resumeContent = await new pdfParse.PDFParse({ data: req.file.buffer })
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({ resume: resumeContent.text, selfdescribe: selfDescription, jobdescribe: jobDescription });

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    });

    res.status(201).json({
        success: true,
        message: "Interview Report Generated Successfully",
        ...interviewReportByAi
    })
}

async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id }).lean();


    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview Report Not Found"
        })
    }

    res.status(200).json({
        success: true,
        data: interviewReport
    });

}

async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan").lean();


    res.status(200).json({
        success: true,
        data: interviewReports
    });
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController }   