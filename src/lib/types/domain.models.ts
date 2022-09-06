export interface PersonRole {
    id          : number,
    RoleName    : string;
};

export interface ResponseData {
    Success: boolean;
    Message: string;
    Data  ?: unknown;
};

