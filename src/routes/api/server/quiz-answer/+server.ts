import { answerQuestion } from "../../services/quiz";

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Inside quiz answer server endpoints');

		const learningJourneyId = data.learningJourneyId;
		const userId = data.userId;
		const sessionId = data.sessionId;
		const assessmentId = data.assessmentId;

		const response = await answerQuestion(
			sessionId,
            assessmentId,
			data.assessmentQuestionId,
            data.responseType,
            data.answer
		);
        console.log('Answer response',response)
		console.log('Answer question response', JSON.stringify(response, null, 2));
		const nextQuestion = response.AnswerResponse?.Next;
		if (nextQuestion) {
			const nextQuestionId = nextQuestion.id;
			const redirectPath = `/users/${userId}/learning-journeys/${learningJourneyId}/quiz/${assessmentId}/question/${nextQuestionId}`;
			console.log(redirectPath);
			return new Response(redirectPath);
		}
		else {
			const redirectPath = `/users/${userId}/learning-journeys/${learningJourneyId}`;
			console.log(redirectPath);
			return new Response(redirectPath);
		}
	} catch (err) {
		console.error(`Error answering question: ${err.message}`);
		return new Response(err.message);
	}
};