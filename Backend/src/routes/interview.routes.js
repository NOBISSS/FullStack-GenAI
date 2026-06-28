
const authMiddleware=require("../middlewares/auth.middleware");
const interviewRouter = require("express").Router();
const interviewController=require("../controllers/interview.controller");
const upload=require("../middlewares/file.middleware");

/**
 * @route POST /api/interiview/
 * @description Generate new interview report on the basis of user selfdescription,resume pdf and job description
 * @access Private
 */
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController);
module.exports = interviewRouter;