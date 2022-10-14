import { goto } from "$app/navigation";
import { getNextQuestion, scheduleQuiz, startQuiz } from "../../services/quiz";

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	console.log('data......',data)
	try {
		console.log('Inside quiz template server endpoints');
		const response = await scheduleQuiz(
			data.sessionId,
            data.userId,
			data.title,
            data.assessmentTemplateId,
            data.scheduledDate
		);
		console.log('Assessment response',response);
		const sessionId = data.sessionId;
		const assessmentId = response.Assessment.id;

		const startQuizResponse = await startQuiz(
			sessionId,
			assessmentId
		);  
		console.log('startQuizResponse', startQuizResponse);

		return new Response(response.message, startQuizResponse.message);
		
	} catch (err) {
		console.error(`Error starting quiz: ${err.message}`);
		return new Response(err.message);
	}
};

// export const GET = async ({ request }) => {
// 	const data = await request.json();
// 	console.log('data......',data)
// 	try {
// 		console.log('Inside quiz template server endpoints');
// 		const response = await getNextQuestion(
// 			data.sessionId,
// 			data.assessmentId      
// 		);
// 		return new Response(response.message);
		
// 	} catch (err) {
// 		console.error(`Error starting quiz: ${err.message}`);
// 		return new Response(err.message);
// 	}
// };
