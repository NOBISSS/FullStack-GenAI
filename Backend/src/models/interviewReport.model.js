const mongoose=require('mongoose');

/**
 * Job Description : String
 * Resume Text : String
 * Self Description : String
 * matchScore : Number
 * Technical Questions : 
 * [{
 *  question:"",
 *  intention:""
 *  answer:"",
 * }] 
 * Behavioral questions :
 * [{
 *  question:"",
 *  intention:""
 *  answer:"",
 * }] 
 * Skill Gaps : [{
 *  Skill:"",
 * severity:{
 * type:String
 * enum:["low","medium","high"]
 * }
 * }]
 * Preparation Plan : [{
 *  Day:Number,
 *  focus:String,
 *  tasks:[String]
 * 
 * }]
 */

const technicalQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical Question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    },
},{
    _id:false
});

const behavioralQuestionSchema=new mongoose.Schema({
       question:{
        type:String,
        required:[true,"Technical Question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    },
},{
    _id:false
})

const skillGapSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is Required"]
    }
},{
    _id:false
})

const preparationPlanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is Required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is Required"]
    },
    tasks:[{
        type:String,
        required:[true,"Task is Required"]
    }],
})

const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job Description required"]
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
},{
    timeStamps:true
})

const InterviewReport=mongoose.model("InterviewReport",interviewReportSchema)