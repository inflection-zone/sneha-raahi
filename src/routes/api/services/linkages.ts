import { BACKEND_API_URL } from "$env/static/private";
import { get_, post_, put_} from "./common";
////////////////////////////////////////////////////////////////

export const getAllLinkages = async (sessionId: string) => {
    const url = BACKEND_API_URL + '/notices/search';
    return await get_(sessionId, url);
};

export const getLinkageById = async (sessionId: string, noticeId: string) => {
    const url = BACKEND_API_URL + `/notices/${noticeId}`;
    return await get_(sessionId, url);
};

export const createNoticeAction = async (sessionId: string, noticeId: string, userId: string, action:string, title: string, resourseId: string ) => {
    const url = BACKEND_API_URL + `/notices/${noticeId}/users/${userId}/take-action`;
      const createModel = 
        {
        NoticeId : noticeId,
        Action      : action,
        Contents    : [
            {
                Title : title,
                ResourceId: resourseId
            }
        ],
        };
    return await post_(sessionId, url, createModel) ;
};

export const updateNotice = async (sessionId: string, noticeId: string,) => {
    const url = BACKEND_API_URL + `/notices/${noticeId}`;
    const updateModel = 
    {
    NoticeId : noticeId,
    Action   :'Applied'
    };
    return await put_(sessionId, url, updateModel);
};

// const getcreateNoticeAction = (): NoticeActionDomainModel => {
//     const createNoticeAction : NoticeActionDomainModel = {
//         Action : "Apply for Job",
//         Contents:[
//         ]
//     };
//     return createNoticeAction;
// }
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