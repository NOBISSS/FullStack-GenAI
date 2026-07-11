
const authMiddleware = require("../middlewares/auth.middleware");
const interviewRouter = require("express").Router();
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

/**
 * @route POST /api/interiview/
 * @description Generate new interview report on the basis of user selfdescription,resume pdf and job description
 * @access Private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"),
    interviewController.generateInterviewReportController);


/**
 * @route GET /api/interiview/report/:interviewId
 * @description get interview report by interviewId.
 * @access Private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController);

/**
 * @route GET /api/interiview/
 * @description get all interview reports of the logged in user.
 * @access Private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController);
module.exports = interviewRouter;