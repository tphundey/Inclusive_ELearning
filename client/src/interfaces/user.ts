export interface Iuser{
    id?:string;
    name: string;
    email: string;
    password: string;
    avatarIMG: string;
    address: string;
    phone: number;
    roleID: number;
    registeredCourseID:number;
    courseSaved : number;
}

export interface ILogin {
    email: string,
    password: string
}