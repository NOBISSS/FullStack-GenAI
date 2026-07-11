const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema")
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfdescribe, jobdescribe }) {

    const prompt = `
You are a senior technical interviewer preparing a candidate for a real interview.

Base every part of your output strictly on the three inputs below — do not invent
skills, experience, or company details that aren't implied by them.

<resume>
${resume || "Not provided."}
</resume>

<self_description>
${selfdescribe || "Not provided."}
</self_description>

<job_description>
${jobdescribe}
</job_description>

Instructions:
- Compare the candidate's actual background (resume/self-description) against the
  job description to find real, specific gaps — not generic ones.
- Generate exactly 4-5 technical questions and 3-4 behavioral questions, each
  tailored to the technologies and responsibilities named in the job description.
- List 3-5 skill gaps, ranked by how much each one would hurt the candidate's
  chances for THIS specific role.
- Build a realistic day-by-day preparation plan (as many days as make sense,
  suggest 5-7) that directly addresses the skill gaps you identified.
- Keep matchScore honest: a strong resume match for this JD should score 75+,
  a weak one should score well below 50.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(interviewReportSchema),
            temperature: 0.4,
        }
    })
    if (!response.text) {
        console.error("No text in response:", JSON.stringify(response, null, 2));
        throw new Error("Gemini returned no content — check finishReason/blockReason above.");
    }

    const parsed = interviewReportSchema.parse(JSON.parse(response.text));
    return parsed;
}

module.exports = generateInterviewReport;
