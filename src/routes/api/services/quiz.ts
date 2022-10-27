import { BACKEND_API_URL } from "$env/static/private";
import { get_, post_} from "./common";

////////////////////////////////////////////////////////////////

export const getAllQuizTemplates = async (sessionId: string) => {
    const url = BACKEND_API_URL + '/clinical/assessment-templates/search';
    return await get_(sessionId, url);
};

export const scheduleQuiz = async (sessionId: string, userId: string, assessmentTemplateId:string, scheduledDate:string) => {
    const create = {
        PatientUserId : userId,
        AssessmentTemplateId : assessmentTemplateId,
        ScheduledDate : scheduledDate
    };
    const url = BACKEND_API_URL + `/clinical/assessments`;
    return await post_(sessionId, url, create);
};

export const getQuizByTemplateIdForUser = async (sessionId: string, assessmentTemplateId: string, userId: string) => {
    const searchParams = `?templateId=${assessmentTemplateId}&patientUserId=${userId}`
    const url = BACKEND_API_URL + `/clinical/assessments/search` + searchParams;
    return await get_(sessionId, url);
};

export const startQuiz = async (sessionId: string, assessmentId: string) => {
    const url = BACKEND_API_URL + `/clinical/assessments/${assessmentId}/start`;
    return await post_(sessionId, url,{});
};

export const getQuizById = async (sessionId: string,  assessmentId: string) => {
    const url = BACKEND_API_URL + `/clinical/assessments/${assessmentId}`;
    return await get_(sessionId, url);
};

export const getNextQuestion = async (sessionId: string,  assessmentId: string ) => {
    const url = BACKEND_API_URL + `/clinical/assessments/${assessmentId}/questions/next`;
    return await get_(sessionId, url);
};

export const getQuestionById = async (sessionId: string,  assessmentId: string, assessmentQuestionId:string ) => {
    const url = BACKEND_API_URL + `/clinical/assessments/${assessmentId}/questions/${assessmentQuestionId}`;
    return await get_(sessionId, url);
};

export const answerQuestion = async (sessionId: string, assessmentId: string, assessmentQuestionId:string, responseType: string, answer: number|number[]|string ) => {
    const url = BACKEND_API_URL + `/clinical/assessments/${assessmentId}/questions/${assessmentQuestionId}/answer`;
    const create = {
        ResponseType: responseType,
        Answer: answer
    }
    return await post_(sessionId, url,create);
};
