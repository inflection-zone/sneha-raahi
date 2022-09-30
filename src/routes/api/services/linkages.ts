import { BACKEND_API_URL } from "$env/static/private";
import { get_, post_} from "./common";
////////////////////////////////////////////////////////////////

export const getAllLinkages = async (sessionId: string) => {
    const url = BACKEND_API_URL + '/notices/search';
    return await get_(sessionId, url);
};

export const getLinkageById = async (sessionId: string, noticeId: string) => {
    const url = BACKEND_API_URL + `/notices/${noticeId}`;
    return await get_(sessionId, url);
};

export const createNoticeAction = async (sessionId: string, noticeId: string, userId: string ) => {
    const url = BACKEND_API_URL + `/notices/${noticeId}/users/${userId}/take-action`;
      const createModel =
      {
    Action      : 'Apply for job',
    Contents    : [
        {
            Title : "",
            ResourceId: ""
        }
    ],
      };
    return await post_(sessionId, url, createModel) ;
};

// export interface NoticeActionDomainModel {
//     UserId?        : string;
//     NoticeId?      : string;
//     Action?        : string;
//     Contents?      : Contents[];
// }
// export interface Contents{
//     Title?        : string;
//     ResourseId?   : string;
// }