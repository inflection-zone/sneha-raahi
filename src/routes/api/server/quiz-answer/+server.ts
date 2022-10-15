import { answerQuestion } from "../../services/quiz";

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Inside quiz answer server endpoints');
		const response = await answerQuestion(
			data.sessionId,
            data.assessmentId,
			data.assessmentQuestionId,
            data.responseType,
            data.answer
		);
        console.log('Answer response',response)
		return new Response(response.message);
	} catch (err) {
		console.error(`Error answering question: ${err.message}`);
		return new Response(err.message);
	}
};