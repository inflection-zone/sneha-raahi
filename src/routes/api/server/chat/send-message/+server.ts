import { getConversationsBetweenTwoUsers } from "../../../services/chat";

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Inside quiz answer server endpoints');

		const userId = data.userId;
		const sessionId = data.sessionId;
		const conversationId = data.conversationId;

		// const questionSequence = data.questionSequence;
		// const totalNumberOfQuestions = data.totalNumberOfQuestions;
		// const contentId = await getCourseContentIdForQuiz(sessionId, assessmentId, learningJourneyId);

		// const response = await answerQuestion(
		// 	sessionId,
        //     assessmentId,
		// 	data.assessmentQuestionId,
        //     data.responseType,
        //     data.answer
		// );

		// console.log('Answer question response', JSON.stringify(response, null, 2));
		// const nextQuestion = response.AnswerResponse?.Next;
		// if (nextQuestion) {
		// 	const nextQuestionId = nextQuestion.id;
		// 	const redirectPath = `/users/${userId}/learning-journeys/${learningJourneyId}/quiz/${assessmentId}/question/${nextQuestionId}`;
		// 	console.log(redirectPath);
		// 	const percentageProgress = (questionSequence / totalNumberOfQuestions) * 100;
		// 	if (contentId) {
		// 		const response = await updateUserLearning(
		// 			sessionId,
		// 			userId,
		// 			contentId,
		// 			ProgressStatus.InProgress,
		// 			percentageProgress,
		// 		);
		// 		console.log(`quiz progress: ${JSON.stringify(response, null, 2)}`);
		// 	}
		// 	return new Response(redirectPath);
		// }
		// else {
		// 	const redirectPath = `/users/${userId}/learning-journeys/${learningJourneyId}`;
		// 	console.log(redirectPath);
		// 	if (contentId) {
		// 		await updateUserLearning(
		// 			sessionId,
		// 			userId,
		// 			contentId,
		// 		);
		// 	}

		// }
        return new Response('redirectPath');
	} catch (err) {
		console.error(`Error answering question: ${err.message}`);
		return new Response(err.message);
	}
};

export const GET = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Getting conversation between two users...');
		const response = await getConversationsBetweenTwoUsers(
			data.sessionId,
            data.userId,
            data.otherUserId,
		);
        const c = response.Conversation;
        let conversation = {};
        if (c) {
            const otherUserId = data.userId === c.InitiatingUserId ? c.OtherUserId : c.InitiatingUserId;
            const otherUser = data.userId === c.InitiatingUserId ? {
                id: c.OtherUser.id,
                FirstName: c.OtherUser.FirstName,
                LastName: c.OtherUser.LastName,
                Prefix: c.OtherUser.Prefix,
                DisplayName: c.OtherUser.DisplayName,
            }: {
                id: c.InitiatingUser.id,
                FirstName: c.InitiatingUser.FirstName,
                LastName: c.InitiatingUser.LastName,
                Prefix: c.InitiatingUser.Prefix,
                DisplayName: c.InitiatingUser.DisplayName,
            };
            conversation = {
                id: c.id,
                Marked: c.Marked,
                UserId: data.userId === c.InitiatingUserId ? c.InitiatingUserId : c.OtherUserId,
                OtherUserId: otherUserId,
                OtherUser: otherUser,
            }
        }
		return new Response(JSON.stringify(conversation));
	} catch (err) {
		console.error(`Error updating user learning: ${err.message}`);
		return new Response(err.message);
	}
};
