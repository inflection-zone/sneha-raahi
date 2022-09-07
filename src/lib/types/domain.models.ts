export interface UserModel{
    id?           : number,
    FirstName?    : string;
    LastName?     : string;
    Age?          : string;
    Phone?        : string;
    Location?     : string;
    
};
export interface PersonRole {
    id          : number,
    RoleName    : string;
};

export interface ResponseData {
    Success: boolean;
    Message: string;
    Data  ?: unknown;
};

